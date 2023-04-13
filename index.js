const express = require("express");
const morgan = require("morgan");

const commentsController = require("./controllers/comments");
const app = express();
const PORT = 3000;

app.use(morgan('dev'));

app
  .route("/comments")
  .get(commentsController.getComments)
  .post(express.json(), commentsController.postComments);

app.get("/comments/:id", commentsController.getComment);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
