import { MiddlewareFn, ResolverData } from 'type-graphql';
var jwt = require('jsonwebtoken');

export const validateJWT: MiddlewareFn = async ({ context }: ResolverData<any>, next) => {
    const token: string = context.token || '';
    if (!token) throw Error('No existe token');
    const { uid, email, rut } = await jwt.verify(token, process.env.SECRETKEY);
    if (!email && !uid && !rut) throw Error('Token inválido');
    context.rut = rut;
    context.email = email;
    return await next();
}