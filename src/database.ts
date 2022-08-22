import mongoose from 'mongoose';

// !Change the node_env in production to use the correct db

const { NODE_ENV, MONGO_URI, MONGO_URI_TEST } = process.env;

const connectionString = NODE_ENV === 'test' ? MONGO_URI_TEST : MONGO_URI;

mongoose.connect(connectionString!);

mongoose.connection.once('open', () => {
    console.log('Data base connected');
});

export { mongoose };
