import { Resource, ResourceModel } from '../models/resource.model';
import { Arg, FieldResolver, Mutation, Query, Resolver, Root } from 'type-graphql';
import { Role, RoleModel } from '../models/role.model';
import { RoleInput } from '../types/role.input';

@Resolver(() => Role)
export class RoleResolver {

    @Query(() => [Role])
    async getAllRoles() {
        return await RoleModel.find();
    }

    @Query(() => Role)
    async getRoleById(@Arg('_id') id: string) {
        return await RoleModel.findById(id);
    }

    @Mutation(() => Role)
    async createRole(@Arg('role') roleInput: RoleInput): Promise<Role> {
        let role = new RoleModel;
        try {
            const listResources = roleInput.resourcesIds?.map(resource => { return resource });
            role = await RoleModel.create({
                name: roleInput.name,
                active: roleInput.active,
                resources: listResources
            });
            role.save();
        } catch (error) {
            throw new Error(error);
        }
        return role;
    }

    @Mutation(() => Role)
    async updateRole(
        @Arg('id', { nullable: false }) _id: String,
        @Arg('role') rolerInput: RoleInput): Promise<any> {
        await RoleModel.findOneAndUpdate({ _id: _id }, rolerInput);
        return await RoleModel.findById(_id);
    }

    @FieldResolver(() => [Resource])
    async resources(@Root() role: Role): Promise<Resource[]> {
        const { _doc } = role;
        return _doc.resources.map(async (id: string) => await ResourceModel.findById(id));
    }
}