const express = require("express");
const app = express();
const session = require("express-session");

const authRouter = require("./routes/auth/auth.route");
const todoRouter = require("./routes/todo/todo.route");
const errorMiddleware = require("./middlewares/error.middleware");

app.use(express.json());

app.use(
	session({
		secret: "thisisascretkeythatwillbechangedsoon",
		resave: false,
		saveUninitialized: false,
		cookie: {
			httpOnly: true,
			sameSite: "strict",
		},
	})
);

app.use("/api/v1/auth", authRouter);
app.use("/api/v1/todos", todoRouter);

app.use(errorMiddleware);

module.exports = app;
