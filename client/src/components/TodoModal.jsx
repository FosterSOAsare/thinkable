/* eslint-disable react/prop-types */
import { toast } from "react-toastify";
import PrimaryInput from "../components/PrimaryInput";
import PrimaryButton from "../components/PrimaryButton";

import axiosInstance from "../lib/axios";
import { useTodoContext } from "../context/todos.context";
import createErrorMessage from "../utils/error.axios";

const TodoModal = ({ setOpenModal, todo, setTodo }) => {
	const { todoDispatchFunc } = useTodoContext();

	function handleChange(name, value) {
		setTodo((prev) => ({ ...prev, [name]: value }));
	}

	function cancelCreation() {
		setTodo({ title: "", description: "" });
		setOpenModal(false);
	}

	async function postTodoItem() {
		let { title, description } = todo;
		if (!title || !description) {
			console.log("An error occurred");
			return;
		}
		// Post Todo
		try {
			let { data } = await axiosInstance.post("/todos", { title, description });
			toast.success("New todo item successfully added", {
				autoClose: 2500,
			});
			setTimeout(() => {
				todoDispatchFunc({ type: "addTodo", payload: data });
				setTodo({ title: "", description: "" });
				setOpenModal(false);
			}, 2500);

			// Add data to todos
		} catch (e) {
			toast.error(createErrorMessage(e), {
				autoClose: 2500,
			});
		}
	}
	async function updateTodoItem() {
		let { title, description, status } = todo;
		if (!title || !description) {
			console.log("An error occurred");
			return;
		}
		// Update Todo
		try {
			let { data } = await axiosInstance.put(`/todos/${todo._id}`, { title, description, status });
			toast.success("Todo item successfully updated", {
				autoClose: 2500,
			});
			// Add data to todos
			setTimeout(() => {
				todoDispatchFunc({ type: "updateTodo", payload: data });
				setTodo({ title: "", description: "" });
				setOpenModal(false);
			}, 2500);
		} catch (e) {
			console.log(createErrorMessage(e));
			toast.error(createErrorMessage(e), {
				autoClose: 2500,
			});
		}
	}
	return (
		<aside className="absolute z-[6] left-0 right-0 pb-8 min-h-screen md:min-h-0 top-0 md:top-[5vh] m-auto h-auto block w-full max-w-2xl bg-slate-100 shadow-lg p-4 px-4 md:px-10">
			<form action="" className="w-full">
				<h3 className="text-center text-3xl font-bold mb-4">{!todo.type ? "Create A New" : "Update"} Todo</h3>
				<PrimaryInput name="title" label="Enter Todo Name:" placeholder="Enter Todo Here" value={todo.title} handleChange={handleChange} />
				<div className={`w-full  h-auto mb-4`}>
					<label htmlFor={name} className="block text-sm text-primary font-medium mb-2">
						Enter Todo Description
					</label>
					<textarea
						name="description"
						className="w-full resize-none bg-transparent focus:outline-none border-[1px] p-4 text-sm"
						value={todo.description}
						id=""
						cols="30"
						rows="8"
						onChange={(e) => handleChange("description", e.target.value)}></textarea>
				</div>
				{!todo.type && <PrimaryButton text="Post New Todo" handleClick={postTodoItem} />}
				{todo.type && <PrimaryButton text="Update Todo" handleClick={updateTodoItem} />}
				<PrimaryButton text="Cancel" sx="mt-2 !bg-transparent border-[1px] !text-black" handleClick={cancelCreation} />
			</form>
		</aside>
	);
};

export default TodoModal;
