const Todos = require("../../schemas/todos.schema");
const asyncHandler = require("express-async-handler");

const controllerPostTodo = asyncHandler(async (req, res) => {
	let { title, description } = req.body;

	if (!title || !description) {
		res.status(401);
		throw new Error("Please provide all necessary details");
	}

	// Store new Todo
	let todo = await Todos.create({ title, description, status: "pending", author: req.session.user._id });
	let { status, createdAt, _id } = todo;

	res.status(200).json({ title, description, status, createdAt, _id });
});
const controllerGetUserTodos = asyncHandler(async (req, res) => {
	let user = req.session.user;
	// Set session to user's data
	// Fetch todos
	let todos = await Todos.find({ author: user._id }, { description: 1, status: 1, title: 1, createdAt: 1, _id: 1 }).sort({ _id: -1 });
	res.status(200).json(todos);
});
const controllerEditTodo = asyncHandler(async (req, res) => {
	let { description, title, status } = req.body;
	let { todoId } = req.params;
	let response = await Todos.updateOne({ _id: todoId }, { $set: { description, title, status } });

	res.status(200).json({ _id: todoId, title, description, status });
});

const controllerEditTodoStatus = asyncHandler(async (req, res) => {
	let { _id, status } = req.body;
	await Todos.updateOne({ _id }, { $set: { status } });
	res.status(200).json({ success: true });
});
const controllerDeleteTodo = asyncHandler(async (req, res) => {
	let { todoId } = req.params;
	await Todos.deleteOne({ _id: todoId });
	res.status(200).json({ success: true });
});

module.exports = { controllerPostTodo, controllerGetUserTodos, controllerEditTodo, controllerDeleteTodo, controllerEditTodoStatus };
