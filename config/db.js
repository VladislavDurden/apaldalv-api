const {MongoClient} = require('mongodb');
const uri = `mongodb+srv://admin:apaldalv!_@cluster0-1qm9j.mongodb.net/test?retryWrites=true&w=majority&useUnifiedTopology=true`;
const client = new MongoClient(uri);
const DB_NAME = 'apaldalv';

