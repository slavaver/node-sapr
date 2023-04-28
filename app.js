const swaggerJSDoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");

const express = require("express");

const app = express();

/**
 * @swagger
 * /:
 *   get:
 *     description: Возвращает простое сообщение с приветствием.
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: A successful response with status "ok" and a "Hello world" message.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: object
 *                   properties:
 *                     status:
 *                       type: string
 *                       description: Status of the response.
 *                     message:
 *                       type: string
 *                       description: Hello world message.
 */

app.get("/", (req, res) => {
  res.json({
    status: "ok",
    message: "Hello world",
  });
});

function authenticateByApiKey(req, res, next) {
  if (req.headers["X-API-Key"] === "123") {
    next();
  } else {
    res.status(401).json({
      status: "error",
      message: "Unauthorized",
    });
  }
}

function commentsPostController(req, res) {
  if (req.body.name && req.body.text) {
    res.json({
      status: "ok",
      message: "Comment added",
    });
  } else {
    res.status(400).json({
      status: "error",
      message: "Bad request",
    });
  }
}

/**
 * @swagger
 * comments:
 *   post:
 *     description: Добавляет один комментарий.
 *     security:
 *       - apikey: []
 *     requestBody:
 *       description: Комментарий с именем и текстом. Аутентификация по API ключу.
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: Имя пользователя.
 *               text:
 *                 type: string
 *                 description: Текст комментария.
 *       required: true
 *     responses:
 *       200:
 *         description: Комментарий был успешно добавлен.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: object
 *                   properties:
 *                     status:
 *                       type: string
 *                       description: Status of the response.
 *                     message:
 *                       type: string
 *                       description: Bad request.
 *       400:
 *         description: Неверное тело запроса.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: object
 *                   properties:
 *                     status:
 *                       type: string
 *                       description: Status of the response.
 *                     message:
 *                       type: string
 *                       description: Comment added.
 *       401:
 *         description: Отсутствует API ключ.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: object
 *                   properties:
 *                     status:
 *                       type: string
 *                       description: Status of the response.
 *                     message:
 *                       type: string
 *                       description: Unauthorized.
 */

app.post("/comments", authenticateByApiKey, commentsPostController);

const swaggerDefinition = {
  openapi: "3.0.0",
  info: {
    title: "Express API Hello world",
    version: "1.0.0",
    description: "Демо вариант для Swagger",
  },
  components: {
    securitySchemes: {
      apikey: {
        description:
          "API ключ для авторизации, если нет, то можно воспользоваться `123`.",
        type: "apiKey",
        name: "X-API-Key",
        in: "header",
      },
    },
  },
  servers: [
    {
      url: "http://localhost:3000",
      description: "Локальный для разработки",
    },
  ],
};

const options = {
  swaggerDefinition,
  apis: ["./*.js"], // из каких файлов забираем JSDoc @swagger
};

const swaggerSpec = swaggerJSDoc(options);

app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.listen(3000, () => {
  console.log("running");
});
