import { Arg, Mutation, Query, Resolver } from 'type-graphql';
import { AdminInput } from '../types/admin-input';
import { Admin, AdminModel } from '../models/admin.model';

@Resolver((_of) => Admin)
export class AdminResolver {

    constructor() { }

    @Query(() => [Admin])
    async getAllAdmins() {
        return await AdminModel.find();
    }

    @Mutation(() => Admin)
    async createAdmin(@Arg('admin') adminInput: AdminInput): Promise<Admin> {
        return (await AdminModel.create(adminInput)).save();
    }

    @Mutation(() => Admin)
    async updateAdmin(
        @Arg('id', { nullable: false }) _id: String,
        @Arg('admin') adminInput: AdminInput) {
        await AdminModel.findOneAndUpdate({ _id: _id }, adminInput);
        return await AdminModel.findById(_id);
    }
}