import { IsEmail, IsPhoneNumber, MaxLength } from 'class-validator';
import { InputType, Field } from 'type-graphql';
import { User } from '../models/user.model';

@InputType('ClientSingInInput', { description: 'Registrar cliente' })
export class ClientSingInInput implements Partial<User> {

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

    @Field(() => Boolean, { nullable: false, description: '¿Usuario activo?' })
    active!: boolean;
}