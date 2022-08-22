import { Request } from 'express';

type Role = 'user' | 'admin';

interface IUser {
    _id?: string;
    userName: string;
    email: string;
    password: string;
    role: Role;
    createdAt?: string;
    updatedAt?: string;
}

interface IUserRequest extends Request {
    id?: string;
    userName?: string;
}

export { IUser, IUserRequest };
