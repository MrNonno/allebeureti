const { MongoClient } = require('mongodb');

const mongoUrl = 'mongodb+srv://sirnonno:xhJldjvzP5K0hELj@nonnodb.d6ylvjh.mongodb.net/?retryWrites=true&w=majority&appName=NonnoDB';
const dbName = 'basketballstats';

let db;

async function connectToDatabase() {
    try {
        const client = new MongoClient(mongoUrl);
        await client.connect();
        console.log('Connected to MongoDB');
        db = client.db(dbName);
    } catch (err) {
        console.error('Error connecting to MongoDB:', err);
        process.exit(1);
    }
}

function getDatabase() {
    if (!db) {
        throw new Error('Database not initialized. Call connectToDatabase first.');
    }
    return db;
}

module.exports = { connectToDatabase, getDatabase };