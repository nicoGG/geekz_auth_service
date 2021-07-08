import { Arg, Mutation, Query, Resolver } from 'type-graphql';
import { Resource, ResourceModel } from './../models/resource.model';
import { ResourceInput } from '../types/resource-input';
import { ResourceListInput } from '../types/resource-list-input';

@Resolver(() => Resource)
export class ResourceResolver {

    @Query(() => [Resource])
    async getAllResources() {
        return await ResourceModel.find();
    }

    @Mutation(() => Resource)
    async createResource(@Arg('resource') resorceInput: ResourceInput): Promise<Resource> {
        console.log('NEW RESOURCE', resorceInput);
        return (await ResourceModel.create(resorceInput)).save();
    }

    @Mutation(() => [Resource])
    async createManyResources(@Arg('resources') resorcesListInput: ResourceListInput): Promise<Resource[]> {
        try {
            return await ResourceModel.insertMany(resorcesListInput.resources.map(res => { return new ResourceModel(res) }));
        } catch (e) {
            throw new Error(e);
        }
    }

    @Mutation(() => Resource)
    async updateResorurce(
        @Arg('id', { nullable: false }) _id: String,
        @Arg('resource') resorceInput: ResourceInput): Promise<any> {
        await ResourceModel.findOneAndUpdate({ _id: _id }, resorceInput);
        return await ResourceModel.findById(_id);
    }
}