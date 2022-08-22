import { Router } from 'express';
import {
    getAllUsers,
    signInUser,
    signUpUser,
    deleteUser,
    getDetailUser,
} from '../controller/user.ctrl';
import { isValidToken } from '../middleware/jwt';

const route = Router();

route.get('/', isValidToken, getAllUsers);

// * Sign In
route.post('/signUp', signUpUser);

// * Login user
route.post('/signIn', signInUser);

// * Detail user

route.get('/:id', getDetailUser);

// * Delete user
route.delete('/delete/:id', isValidToken, deleteUser);

export default route;
