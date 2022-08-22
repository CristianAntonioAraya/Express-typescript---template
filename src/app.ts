import express, { Request, Response } from 'express';
import cors from 'cors';
import morgan from 'morgan';
import { userRoute } from './routes';

const app = express();

// * setting

app.set('port', process.env.PORT);

//* middleware

app.use(cors());
app.use(morgan('dev'));
app.use(express.json());

//* routes

app.get('/api', (_req: Request, res: Response) => {
    res.status(200).json({ ok: true, msg: 'Api online' });
});
app.use('/api/user', userRoute);

export default app;
