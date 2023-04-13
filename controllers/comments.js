const commentServices = require('../services/comments.services');
const { ObjectId } = require('mongodb');

async function getComments(req, res) {
  let allComments = await commentServices.findComments()
  res.json(allComments)
}

async function getComment(req, res) {
  if (ObjectId.isValid(req.params.id)) {
    let comment = await commentServices.findComment(req.params.id)
    res.json(comment)
  } else {
    res.status(404).send("Not Found")
  }
}

function postComments(req, res) {
  const { name, text } = req.body;
  commentServices.insertComment({ name, text });
  res.json()
}

module.exports = {
  getComments,
  postComments,
  getComment
}