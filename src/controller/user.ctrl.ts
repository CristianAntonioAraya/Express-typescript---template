import { Request, Response } from 'express';
import { IUser, IUserRequest } from '../interfaces';
import { generateToken } from '../middleware/jwt';
import { userModel } from '../model';
import bcrypt from 'bcryptjs';

const getAllUsers = async (_req: Request, res: Response) => {
    try {
        const users: Array<IUser> = await userModel.find();

        res.status(200).json({
            ok: true,
            users,
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({ ok: false, msg: 'Server Error' });
    }
};

const signUpUser = async (req: Request, res: Response) => {
    const { email, password, userName, role }: IUser = req.body;

    const checkUser = await userModel.findOne({ email: email });

    // * If an email already exist return 409 conflict with the actual server state

    if (checkUser) {
        return res.status(409).json({
            ok: false,
            msg: 'Email already registered',
        });
    }
    try {
        const userToAdd: IUser = { userName, email, password, role };

        const user = new userModel(userToAdd);

        // * Encrypt  password
        const salt = bcrypt.genSaltSync();
        user.password = bcrypt.hashSync(password, salt);

        await user.save();

        const token = await generateToken(user._id, user.userName);

        res.status(200).json({
            ok: true,
            userName: user.userName,
            id: user._id,
            token,
        });
    } catch (error) {
        console.log(error);
        res.json(500).json({
            ok: false,
        });
    }
};

const signInUser = async (req: Request, res: Response) => {
    const { email, password }: IUser = req.body;

    try {
        const checkUser = await userModel.findOne({ email: email });

        // * If the email is not registered return 404
        if (!checkUser) {
            return res.status(404).json({
                ok: false,
                msg: 'User not found',
            });
        }

        // * Check password

        const isValidPassword = bcrypt.compareSync(
            password,
            checkUser.password
        );
        if (!isValidPassword) {
            return res.status(400).json({
                ok: false,
                msg: 'Email or password don`t match',
            });
        } else {
            // * Create token only if the user was correctly sign in
            const token = await generateToken(
                checkUser._id,
                checkUser.userName
            );

            res.status(200).json({
                ok: true,
                userName: checkUser.userName,
                id: checkUser._id,
                token,
            });
        }
    } catch (error) {
        console.log(error);
        res.json(500).json({
            ok: false,
        });
    }
};

const deleteUser = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;

        const checkUser = await userModel.findOne({ _id: id });

        if (!checkUser) {
            return res.status(400).json({
                ok: false,
                msg: 'Id not registered or invalid',
            });
        }

        await userModel.findByIdAndDelete(id);

        res.json({
            ok: true,
            msg: 'User delete Correctly',
        });

        res.status(200).json({
            ok: true,
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({ ok: false, msg: 'Internal server error' });
    }
};

const getDetailUser = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;

        const checkUser = await userModel.findOne({ _id: id });

        if (!checkUser) {
            return res.status(400).json({
                ok: false,
                msg: 'Id not registered or invalid',
            });
        }
        res.status(200).json({
            ok: true,
            checkUser,
        });
    } catch (error) {
        console.log('Error getting user detail', error);
        return res
            .status(500)
            .json({ ok: false, msg: 'Internal server error' });
    }
};

export { getAllUsers, signInUser, signUpUser, deleteUser, getDetailUser };
