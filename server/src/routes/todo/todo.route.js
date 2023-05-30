const express = require("express");

const { controllerPostTodo, controllerGetUserTodos, controllerEditTodo, controllerDeleteTodo } = require("./todo.controller");
const user = require("../../middlewares/user.middleware");

const todoRouter = express.Router();

todoRouter.post("/", user, controllerPostTodo);
todoRouter.get("/", user, controllerGetUserTodos);
todoRouter.put("/:todoId", user, controllerEditTodo);
todoRouter.delete("/:todoId", user, controllerDeleteTodo);

module.exports = todoRouter;
