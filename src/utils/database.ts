import { config } from './config';

import { MongoClient, Db } from 'mongodb';
let databaseConnection: Db;

export async function connectMongo () {

    if (databaseConnection) {
        return databaseConnection;
    }

    const mongoUrl = process.env.MONGO_URL || config.MONGO_URL;
    const mongoDb = process.env.MONGO_DB || config.MONGO_DB;

    console.log('mongoUrl :>>', mongoUrl);
    console.log('mongoDB :>>', mongoDb);

    try {
        const mongoClient = new MongoClient(mongoUrl, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        const client = await mongoClient.connect();
        databaseConnection = client.db(mongoDb);
    } catch (error) {

        console.log('Error: Could not connect to mongoDB', error);
        throw  new Error('Could not connect to mongoDB');

    }

    return databaseConnection;

}




