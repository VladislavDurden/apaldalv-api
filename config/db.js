const {MongoClient} = require('mongodb');
const DB_NAME = 'apaldalv';
const DB_PASSWORD = 'wbMuYre6';

const uri = `mongodb+srv://${DB_NAME}:${DB_PASSWORD}@cluster0-1qm9j.mongodb.net/test?retryWrites=true&w=majority&useUnifiedTopology=true`;
const client = new MongoClient(uri);
