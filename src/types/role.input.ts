import { Field, ID, InputType } from 'type-graphql';
import { Role } from '../models/role.model';
import { ObjectId } from 'mongoose';

@InputType({ description: 'Crear Rol' })
export class RoleInput implements Partial<Role> {

    @Field(() => String, { description: 'Nombre de rol' })
    name!: string;

    @Field(() => Boolean, { description: '¿Rol activo?' })
    active?: boolean;

    @Field(() => [ID], { description: 'Recursos accesibles por rol' })
    resourcesIds?: ObjectId[];
}