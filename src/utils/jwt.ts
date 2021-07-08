var jwt = require('jsonwebtoken');

export const generateJWT = (uid: string = '', rut: string = '', email: string = ''): Promise<string> => {
    return new Promise((resolve, reject) => {
        const payload = { uid, rut, email };
        jwt.sign(payload, process.env.SECRETKEY, {
            expiresIn: process.env.TOKEN_EXPIRES
        }, (err: any, token: string) => {
            // console.log('GENERADO', token);
            if (!err) reject(err);
            resolve(token);
        });
    });
}

export const generateRefreshToken = (uid: string = '', rut: string = '', email: string = '') => {
    return new Promise((resolve, reject) => {
        const payload = { uid, rut, email };
        jwt.sign(payload, process.env.SECRETKEY, {
            expiresIn: process.env.TOKEN_EXPIRES
        }, (err: any, token: string) => {
            if (!err) reject(err);
            jwt.sign(payload, process.env.REFRESH_TOKEN_SECRET, {
                expiresIn: process.env.TOKEN_REFRESH_EXPIRES
            }, (error: any, refreshToken: string) => {
                if (error) {
                    reject('No se pudo generar el token');
                } else {
                    resolve([token, refreshToken]);
                }
            });
        });
    });
}
