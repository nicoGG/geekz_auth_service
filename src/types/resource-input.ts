import { InputType, Field } from 'type-graphql';

@InputType('ResorceInput', { description: 'Input de recursos' })
export class ResourceInput {

    @Field()
    name!: string;

    @Field(() => Boolean, { nullable: false, description: '¿Recurso activo?' })
    active!: boolean;
}