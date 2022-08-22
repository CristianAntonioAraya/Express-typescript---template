import { IUser } from '../../src/interfaces';
import { userModel } from '../../src/model';
import supertest from 'supertest';
import app from '../../src/app';

const api = supertest(app);

const initialUserTest: IUser[] = [
    {
        userName: 'testName',
        email: 'testEmail@gmail.com',
        password: '1234',
        role: 'user',
    },
    {
        userName: 'testName 2',
        email: 'testEmail2@gmail.com',
        password: '12345',
        role: 'user',
    },
    {
        userName: 'testName 3',
        email: 'testEmail3@gmail.com',
        password: '123456',
        role: 'admin',
    },
];

const uploadUserTest = async () => {
    await userModel.deleteMany({});

    const user1 = new userModel(initialUserTest[0]);
    await user1.save();

    const user2 = new userModel(initialUserTest[1]);
    await user2.save();

    const user3 = new userModel(initialUserTest[2]);
    await user3.save();
};

const createUserTest = async () => {
    const newUser: IUser = {
        userName: 'testName 3',
        email: 'testEmail3@gmail.com',
        password: '123456',
        role: 'user',
    };
};

const getAllUsersTest = async () => {
    const response = await api.get('/api/user').send();
    const users = response.body.users;
    return users;
};

const singleUser = {
    _id: expect.any(String),
    userName: expect.any(String),
    email: expect.any(String),
    password: expect.any(String),
    role: expect.any(String),
    createdAt: expect.any(String),
    updatedAt: expect.any(String),
};

export {
    api,
    uploadUserTest,
    singleUser,
    createUserTest,
    getAllUsersTest,
    initialUserTest,
};
