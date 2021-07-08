import { ObjectId } from 'mongodb';
import { ObjectType, Field, ID } from 'type-graphql';
import { prop as Property, getModelForClass } from '@typegoose/typegoose';

@ObjectType({ description: 'Modelo de permisos de rol' })
export class Permission {

    @Field(() => ID, { description: 'Id del permiso' })
    readonly _id?: ObjectId;

    @Field(() => String, { description: 'Nombre del permiso' })
    @Property()
    name!: string;

    @Field(() => Boolean, { description: '¿Permiso activo?' })
    @Property()
    active?: boolean;
}

export const PermissionModel = getModelForClass(Permission, { schemaOptions: { timestamps: true } });