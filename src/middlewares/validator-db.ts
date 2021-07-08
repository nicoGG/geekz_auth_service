import { MiddlewareFn } from 'type-graphql';
import { UserModel } from '../models/user.model';

export const ValidatorEmail: MiddlewareFn = async ({ info, args, context }, next) => {
    console.log('Email Middleware', info, args, context);
    await next();
};

export const UserValidator: MiddlewareFn = async ({ args }, next) => {
    let { rut, email, phone } = args.user;
    let findRut = await UserModel.findOne({ rut: rut });
    let findEmail = await UserModel.findOne({ email: email });
    let findPhone = await UserModel.findOne({ phone: phone });
    if (findRut) throw Error('Rut ya existe');
    if (findEmail) throw Error('Email ya existe');
    if (findPhone) throw Error('Teléfono ya existe');
    await next();
}