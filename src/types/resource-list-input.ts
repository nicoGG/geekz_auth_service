import { ResourceInput } from './resource-input';
import { InputType, Field } from 'type-graphql';

@InputType('ResorceListInput', { description: 'Input de recursos' })
export class ResourceListInput {

    @Field(() => [ResourceInput], { nullable: false, description: 'Listado de recursos' })
    resources!: ResourceInput[];
}