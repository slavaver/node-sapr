const commentServices = require('../services/comments.services')

async function getComments(req, res) {
  let allComments = await commentServices.findComments()
  res.json(allComments)
}

function postComments(req, res) {
  const {name, text} = req.body;
  commentServices.insertComment({name, text});
  res.json()
}

module.exports = {
  getComments,
  postComments
}