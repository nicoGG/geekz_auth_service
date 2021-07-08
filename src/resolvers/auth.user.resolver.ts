import { AuthInput } from './../types/auth.input';
import { Arg, Field, Mutation, ObjectType, Resolver } from 'type-graphql';
import bcrypt from 'bcrypt';
import { User, UserModel } from '../models/user.model';
import { sign } from 'jsonwebtoken';

@ObjectType({ description: 'Respuesta de login de usuario' })
class LoginResponse {
    @Field({ description: 'Token de autenticación' })
    token: string;

    @Field({ description: 'Token refresh de usuario' })
    tokenRefresh: string;

    @Field({ description: 'Usuario autenticado' })
    user: User
}

@Resolver(() => LoginResponse)
export class AuthUserResolver {

    constructor() { }

    @Mutation(() => LoginResponse)
    async loginUser(@Arg('auth') authInput: AuthInput): Promise<LoginResponse> {
        const user = await UserModel.findOne({ email: authInput.email });
        if (!user) throw new Error('Usuario no encontrado');
        const verifyPass = await bcrypt.compare(authInput.password, user.password)
        if (!verifyPass) throw new Error('Invalid password');
        user.password = '';
        let payload = { uid: user._id, rut: user.rut, email: user.email };
        const secret: string = process.env.SECRETKEY ?? '';
        const secretRefresh: string = process.env.REFRESH_TOKEN_SECRET ?? '';
        return {
            user: user,
            tokenRefresh: sign(payload, secretRefresh, { expiresIn: process.env.TOKEN_REFRESH_EXPIRES }),
            token: sign(payload, secret, { expiresIn: process.env.TOKEN_EXPIRES })
        };
    }

    // @Mutation(() => LoginResponse)
    // async singupUser(@Arg('user') userInput: UserInput): Promise<LoginResponse> {
    //     userInput.active = false;
    //     const user = await UserModel.create(userInput);
    //     user.active = false;
    //     user.save();
    //     user.password = '';
    //     let payload = { uid: user._id, rut: user.rut, email: user.email };
    //     const secret: string = process.env.SECRETKEY ?? '';
    //     const secretRefresh: string = process.env.REFRESH_TOKEN_SECRET ?? '';
    //     return {
    //         user: user,
    //         tokenRefresh: sign(payload, secretRefresh, { expiresIn: process.env.TOKEN_REFRESH_EXPIRES }),
    //         token: sign(payload, secret, { expiresIn: process.env.TOKEN_EXPIRES })
    //     };
    // }
}