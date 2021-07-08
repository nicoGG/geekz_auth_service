import { ObjectId } from 'mongodb';
import { ObjectType, Field, ID } from 'type-graphql';
import { prop as Property, getModelForClass } from '@typegoose/typegoose';

@ObjectType({ description: 'Modelo de administrador' })
export class Admin {
    @Field(() => ID)
    _id?: ObjectId;

    @Field(() => String, { description: 'Nombre del administrador' })
    @Property({ required: true })
    first_name: string;

    @Field(() => String, { description: 'Apellido del administrador' })
    @Property({ required: true })
    last_name: string;

    @Field(() => String, { description: 'Correo del administrador' })
    @Property({ required: true, unique: true })
    email: string;

    @Field(() => String, { description: 'Contraseña del administrador' })
    @Property({ required: true })
    password: string;

    @Field(() => String, { description: 'Foto de perfil del administrador' })
    @Property()
    photo_profile: string;

    @Field(() => Boolean, { description: '¿Administrador activo?' })
    @Property()
    active: boolean;
}

export const AdminModel = getModelForClass(Admin, { schemaOptions: { timestamps: true } });