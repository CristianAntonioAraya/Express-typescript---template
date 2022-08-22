import { NextFunction, Response } from 'express';
import jwt, { JwtPayload } from 'jsonwebtoken';
import { IUserRequest } from '../interfaces';

const generateToken = async (id: string, userName: string) => {
    return new Promise((resolve, rejects) => {
        const payload: JwtPayload = { id, userName };

        jwt.sign(
            payload,
            process.env.SECRET_JWT!,
            { expiresIn: '24h' },
            (err, token) => {
                if (err) {
                    console.log(err);
                    rejects('token can not be created');
                }
                resolve(token);
            }
        );
    });
};

const isValidToken = async (
    req: IUserRequest,
    res: Response,
    next: NextFunction
) => {
    const token = req.header('x-token');

    if (!token) {
        return res.status(404).json({ ok: false, msg: 'Missing token' });
    }
    try {
        const verifiedToken = jwt.verify(
            token,
            process.env.SECRET_JWT!
        ) as JwtPayload;

        req.id = verifiedToken.id;
        req.userName = verifiedToken.userName;

    } catch (error) {
        console.log('Jwt expired or invalid');
        return res.status(400).json({ ok: false, msg: 'Invalid Token' });
    }

    next();
};

export { generateToken, isValidToken };
