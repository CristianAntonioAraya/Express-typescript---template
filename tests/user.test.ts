import { server } from '..';
import mongoose from 'mongoose';
import {
    createUserTest,
    getAllUsersTest,
    initialUserTest,
    uploadUserTest,
    api,
    singleUser,
} from './helpers/user.helper';

beforeEach(async () => {
    await uploadUserTest();
});

describe(`Api online`, () => {
    test('should respond with status 200', async () => {
        const response = await api.get('/api').send();
        expect(response.status).toBe(200);
    });
});

describe(`Users /api/user`, () => {
    test('Should response the body with all users and the correctly params', async () => {
        const response = await api.get('/api/user').send();
        expect(response.body.users).toStrictEqual(
            expect.arrayContaining([expect.objectContaining(singleUser)])
        );
    });

    test(`should response with an object with specific props each users`, async () => {
        const response = await api.get('/api/user').send();
        expect(response.status).toBe(200);
        expect(response.body.users[0]).toMatchObject(singleUser);
    });

    test.skip(`Should create new user and response with ok and token`, async () => {
        await createUserTest();
        
    });
});

afterAll(() => {
    server.close();
    mongoose.connection.close();
});
