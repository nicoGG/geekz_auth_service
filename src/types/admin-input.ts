import { IsEmail, IsPhoneNumber, MaxLength } from 'class-validator';
import { InputType, Field } from 'type-graphql';
import { Admin } from '../models/admin.model';

@InputType('AdminInput', { description: 'Crear administrador' })
export class AdminInput implements Partial<Admin>{
    @Field()
    rut: string;

    @Field()
    @MaxLength(40)
    first_name: string;

    @Field()
    @MaxLength(60)
    last_name: string;

    @Field()
    password: string;

    @Field()
    @IsEmail()
    email: string;

    @Field()
    @IsPhoneNumber()
    phone: string;

    @Field()
    photo_profile: string;

    @Field()
    active: boolean;
}