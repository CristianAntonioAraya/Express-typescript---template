import 'dotenv/config';
import app from './src/app';
import './src/database';

const server = app.listen(app.get('port'), () => {
    console.log(`server run on port ${app.get('port')}`);
    console.log(`Running in ${process.env.NODE_ENV} mode `);
});

export { server };
