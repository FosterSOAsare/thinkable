/* eslint-disable react/prop-types */
import { createContext, useContext, useEffect, useReducer } from "react";
import axiosInstance from "../lib/axios";

const TodoContext = createContext();

const TodoProvider = ({ children }) => {
	const [todos, todoDispatchFunc] = useReducer(TodoFunc, { loading: true, error: null, todos: [] });

	useEffect(() => {
		// Fetch Todo
		(async function () {
			try {
				const { data } = await axiosInstance.get("/todos");
				todoDispatchFunc({ type: "setData", payload: data });
			} catch (e) {
				console.log(e);
				todoDispatchFunc({ type: "setError", payload: e.response.data.error });
			}
		})();
	}, []);

	function TodoFunc(state, action) {
		switch (action.type) {
			case "setData":
				return { loading: false, error: null, todos: action.payload };
			case "setError":
				return { ...state, loading: false, error: action.payload };
			case "addTodo":
				return { loading: false, error: null, todos: [action.payload, ...state.todos] };
			case "updateTodo":
				return { loading: false, error: null, todos: state.todos.map((todo) => (todo._id === action.payload._id ? { ...todo, ...action.payload } : todo)) };
			case "deleteTodo":
				return { loading: false, error: null, todos: state.todos.filter((todo) => todo._id !== action.payload._id) };
			default:
				state;
		}
	}
	return <TodoContext.Provider value={{ todos, todoDispatchFunc }}>{children}</TodoContext.Provider>;
};

// eslint-disable-next-line react-refresh/only-export-components
export const useTodoContext = () => {
	return useContext(TodoContext);
};

export default TodoProvider;
