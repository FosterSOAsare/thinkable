const express = require("express");
const app = express();
const authRouter = require("./routes/auth/auth.route");
const errorMiddleware = require("./middlewares/error.middleware");
app.use(express.json());

app.use("/api/v1/auth", authRouter);

app.use(errorMiddleware);

module.exports = app;
