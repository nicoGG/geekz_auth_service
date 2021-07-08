import { AuthInput } from './../types/auth.input';
import { Arg, Mutation, Resolver } from 'type-graphql';
import { generateJWT } from '../utils/jwt';
import { AdminModel, Admin } from '../models/admin.model';
import bcrypt from 'bcrypt';

@Resolver(() => Admin)
export class AuthAdminResolver {

    constructor() { }

    @Mutation(() => Admin)
    async loginAdmin(@Arg('auth') authInput: AuthInput): Promise<any> {
        const admin = await AdminModel.findOne({ where: { email: authInput.email } });
        if (!admin) throw new Error('Administrador no encontrado');
        const valid = await bcrypt.compare(authInput.password, admin.password)
        if (!valid) throw new Error('Contraseña incorrecta');
        const [token, refreshToken]: any = await generateJWT(admin.id, '', admin.email);
        return { admin, token, refreshToken };
    }
}