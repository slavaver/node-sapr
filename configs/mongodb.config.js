const { MongoClient } = require("mongodb");

uri = "mongodb://127.0.0.1:27017";

let dbConnection;

async function connectToDatabase() {
  const client = await new MongoClient(uri).connect();
  dbConnection = await client.db("sapr");
}

function getDB() {
  return dbConnection;
}

module.exports = {
  connectToDatabase,
  getDB,
};
