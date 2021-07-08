import { ObjectId } from 'mongodb';
import { ObjectType, Field, ID } from 'type-graphql';
import { prop as Property, getModelForClass } from '@typegoose/typegoose';

@ObjectType({ description: 'Modelo de recurso' })
export class Resource {

    @Field(() => ID, { description: 'Id de recurso' })
    _id?: ObjectId;

    @Field(() => String, { description: 'Nombre de recurso' })
    @Property({ unique: true })
    name?: string;

    @Field(() => Boolean, { description: '¿Recurso activo?' })
    @Property()
    active?: boolean;
}

export const ResourceModel = getModelForClass(Resource, { schemaOptions: { timestamps: true } });