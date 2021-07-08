import { AuthInput } from './../types/auth.input';
import { Arg, Field, Mutation, ObjectType, Resolver } from 'type-graphql';
import bcrypt from 'bcrypt';
import { sign } from 'jsonwebtoken';
import { Client, ClientModel } from '../models/client.model';
// import { ClientSingInInput } from 'client-singup-input';


@ObjectType({ description: 'Respuesta de login de cliente' })
class LoginResponse {
    @Field({ description: 'Token de autenticación' })
    token: string;

    @Field({ description: 'Token refresh de cliente' })
    tokenRefresh: string;

    @Field({ description: 'Cliente autenticado' })
    client: Client
}

@Resolver(() => LoginResponse)
export class AuthClientResolver {

    constructor() { }

    @Mutation(() => LoginResponse)
    async loginUser(@Arg('auth') authInput: AuthInput): Promise<LoginResponse> {
        const client = await ClientModel.findOne({ email: authInput.email });
        if (!client) throw new Error('Usuario no encontrado');
        const verifyPass = await bcrypt.compare(authInput.password, client.password)
        if (!verifyPass) throw new Error('Invalid password');
        client.password = '';
        let payload = { uid: client._id, rut: client.rut, email: client.email };
        const secret: string = process.env.SECRETKEY ?? '';
        const secretRefresh: string = process.env.REFRESH_TOKEN_SECRET ?? '';
        return {
            client: client,
            tokenRefresh: sign(payload, secretRefresh, { expiresIn: process.env.TOKEN_REFRESH_EXPIRES }),
            token: sign(payload, secret, { expiresIn: process.env.TOKEN_EXPIRES })
        };
    }

    // @Mutation(() => LoginResponse)
    // async singupUser(@Arg('client') clientSingInInput: ClientSingInInput): Promise<LoginResponse> {
    //     clientSingInInput.active = false;
    //     const client = await ClientModel.create(clientSingInInput);
    //     client.active = false;
    //     client.save();
    //     client.password = '';
    //     let payload = { uid: client._id, rut: client.rut, email: client.email };
    //     const secret: string = process.env.SECRETKEY ?? '';
    //     const secretRefresh: string = process.env.REFRESH_TOKEN_SECRET ?? '';
    //     return {
    //         client: client,
    //         tokenRefresh: sign(payload, secretRefresh, { expiresIn: process.env.TOKEN_REFRESH_EXPIRES }),
    //         token: sign(payload, secret, { expiresIn: process.env.TOKEN_EXPIRES })
    //     };
    // }
}