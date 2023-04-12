const { connectToDatabase, getDB } = require('../configs/mongodb.config')

connectToDatabase();

async function insertComment(data) {
  const db = getDB();
  const comments = db.collection("comments");
  await comments.insertOne(data);
}

async function findComments() {
  const db = getDB();
  const comments = db.collection("comments");
  const result = await comments.find();
  return await result.toArray();
}

module.exports = {
  insertComment,
  findComments
}