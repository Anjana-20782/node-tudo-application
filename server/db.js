const { MongoClient } = require("mongodb");

const url = "mongodb://127.0.0.1:27017";  // your local mongodb server
const client = new MongoClient(url);

let db;

async function connectDB() {
    try {
        await client.connect();
        console.log("MongoDB Connected");

        db = client.db("todoDB");  // database name
    } catch (err) {
        console.error("DB Connection Error:", err);
    }
}

function getDB() {
    return db;
}

module.exports = { connectDB, getDB };
