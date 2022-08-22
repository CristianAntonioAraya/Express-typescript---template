import { model, Schema } from 'mongoose';
import { IUser } from '../interfaces';

const userModel = new Schema<IUser>(
    {
        userName: {
            type: String,
            require: true,
        },
        email: {
            type: String,
            require: true,
            unique: true,
        },
        password: {
            type: String,
            require: true,
        },
        role: {
            type: String,
            default: 'user'
        }
    },
    {
        versionKey: false,
        timestamps: true,
    }
);

export default model('user', userModel);
