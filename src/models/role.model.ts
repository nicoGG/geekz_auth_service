import { ObjectId } from 'mongodb';
import { ObjectType, Field, ID } from 'type-graphql';
import { prop as Property, getModelForClass } from '@typegoose/typegoose';
import { Resource } from './resource.model';

@ObjectType({ description: 'Modelo de roles' })
export class Role {

    @Field(() => ID, { description: 'Id de rol' })
    _id?: ObjectId;

    @Field(() => String, { description: 'Nombre de rol' })
    @Property({ unique: true })
    name?: string;

    @Field(() => Boolean, { description: '¿Rol activo?' })
    @Property()
    active?: boolean;

    @Field(() => [Resource], { description: 'Recursos accesibles por rol' })
    @Property({ ref: Resource, default: [] })
    resources?: Resource[];
    _doc?: any;
}

export const RoleModel = getModelForClass(Role, { schemaOptions: { timestamps: true } });