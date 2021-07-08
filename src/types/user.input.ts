import { IsEmail, IsPhoneNumber, MaxLength } from 'class-validator';
import { ObjectId } from 'mongoose';
import { InputType, Field, ID } from 'type-graphql';
import { User } from '../models/user.model';

@InputType('UserInput', { description: 'Crear usuario' })
export class UserInput implements Partial<User> {

    image: File;

    @Field(() => String, { description: 'Rut del usuario' })
    rut!: string;

    @Field(() => String, { nullable: false, description: 'Nombres del usuario' })
    @MaxLength(40)
    first_name!: string;

    @Field(() => String, { nullable: false, description: 'Apellidos del usuario' })
    @MaxLength(60)
    last_name!: string;

    @Field(() => String, { nullable: false, description: 'Contraseña del usuario' })
    password!: string;

    @Field(() => String, { nullable: false, description: 'Correo del usuario' })
    @IsEmail()
    email!: string;

    @Field(() => String, { nullable: false, description: 'Teléfono del usuario' })
    @IsPhoneNumber()
    phone!: string;

    @Field(() => String, { description: 'Foto de perfil del usuario' })
    photo_profile?: string;

    @Field(() => [ID], { description: 'Id de roles que tiene asignado el usuario' })
    rolesIds?: ObjectId[];

    @Field(() => Boolean, { nullable: false, description: '¿Usuario activo?' })
    active!: boolean;
}