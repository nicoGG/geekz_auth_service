import { Arg, FieldResolver, Mutation, Query, Resolver, Root, UseMiddleware } from 'type-graphql';
import { UserInput } from '../types/user.input';
import { User, UserModel } from '../models/user.model';
import { UserValidator } from '../middlewares/validator-db';
import { Role, RoleModel } from '../models/role.model';
import bcrypt from 'bcrypt';

@Resolver(() => User)
export class UserResolver {

    @Query(() => [User])
    async getAllUsers() {
        return await UserModel.find();
    }

    @Query(() => User)
    async getUserById(@Arg('_id') id: string) {
        return await UserModel.findById(id);
    }

    @Mutation(() => User)
    @UseMiddleware(UserValidator)
    async createUser(@Arg('user') userInput: UserInput): Promise<User> {
        let user = new UserModel;
        try {
            const salt = bcrypt.genSaltSync(10);
            userInput.password = bcrypt.hashSync(userInput.password, salt);
            const listRoles = userInput.rolesIds?.map(role => { return role });
            user = await UserModel.create({
                rut: userInput.rut,
                first_name: userInput.first_name,
                last_name: userInput.last_name,
                email: userInput.email,
                phone: userInput.phone,
                password: userInput.password,
                photo_profile: userInput.photo_profile,
                active: false,
                roles: listRoles
            });
            user.save();
        } catch (error) {
            throw new Error(error);
        }
        return user;
    }

    @Mutation(() => User)
    async updateUser(
        @Arg('id', { nullable: false }) _id: string,
        @Arg('user') userInput: UserInput): Promise<any> {
        await UserModel.findOneAndUpdate({ _id: _id }, userInput);
        return await UserModel.findById(_id);
    }

    @Mutation(() => User)
    async updatePassword(
        @Arg('_id', { nullable: false }) id: string,
        @Arg('password', { nullable: false }) password: string
    ) {
        const salt = bcrypt.genSaltSync(10);
        password = bcrypt.hashSync(password, salt);
        await UserModel.findOneAndUpdate({ _id: id }, { password: password });
        return await UserModel.findById(id);
    }

    @FieldResolver(() => [Role])
    async roles(@Root() user: User): Promise<Role[]> {
        const { _doc } = user;
        return _doc.roles.map(async (id: string) => await RoleModel.findById(id));
    }
}