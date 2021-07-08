import { ObjectId } from 'mongodb';
import { ObjectType, Field, ID } from 'type-graphql';
import { prop as Property, getModelForClass } from '@typegoose/typegoose';
import { Role } from './role.model';

@ObjectType({ description: 'Modelo de usuario' })
export class User {

    @Field(() => ID)
    readonly _id?: ObjectId;

    @Field(() => String, { description: 'Rut usuario de carrito' })
    @Property()
    rut!: string;

    @Field(() => String, { description: 'Nombre de usuario' })
    @Property()
    first_name!: string;

    @Field(() => String, { description: 'Apellido del usuario' })
    @Property()
    last_name!: string;

    @Field(() => String, { description: 'Correo del usuario' })
    @Property()
    email!: string;

    @Field(() => String, { description: 'Teléfono del usuario' })
    @Property()
    phone!: string;

    @Field(() => String, { description: 'Contraseña del usuario' })
    @Property()
    password!: string;

    @Field(() => String, { description: 'Foto de perfil del usuario' })
    @Property()
    photo_profile?: string;

    @Field(() => Boolean, { description: '¿Usuario activo?' })
    @Property()
    active?: boolean;

    @Field(() => [Role], { description: 'Roles que pertenecen al usuario' })
    @Property({ ref: Role, default: [] })
    roles?: Role[];
    _doc?: any;
}

export const UserModel = getModelForClass(User, { schemaOptions: { timestamps: true } });