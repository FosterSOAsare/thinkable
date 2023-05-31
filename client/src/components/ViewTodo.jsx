/* eslint-disable react/prop-types */
import axiosInstance from "../lib/axios";
import { toast } from "react-toastify";

import createErrorMessage from "../utils/error.axios";
import { useTodoContext } from "../context/todos.context";

import PrimaryButton from "./PrimaryButton";
import { AiOutlineCloseCircle } from "react-icons/ai";

const ViewTodo = ({ viewTodo, setViewTodo }) => {
	const { title, description, _id, status } = viewTodo;
	const { todoDispatchFunc } = useTodoContext();

	async function updateTodo(status) {
		try {
			let data = { title, description, status };
			axiosInstance.put(`/todos/${_id}`, data);
			todoDispatchFunc({ type: "updateTodo", payload: { ...data, _id } });
			setViewTodo(false);
			toast.success("Todo status successfully updated", {
				autoClose: 2500,
			});
		} catch (e) {
			toast.error(createErrorMessage(e), {
				autoClose: 2500,
			});
		}
	}
	return (
		<aside className="absolute z-[6] min-h-screen  md:min-h-[35vh] left-0 right-0 top-0  md:top-[10vh]  pb-8 m-auto h-auto block w-full max-w-2xl bg-slate-100 shadow-lg p-4 md:p-4 px-4 md:px-10">
			<button onClick={() => setViewTodo({})} className="block ml-auto">
				<AiOutlineCloseCircle className="text-3xl hover:text-red-700 hover:cursor-pointer rounded-full " />
			</button>

			<h3 className="text-3xl text-center mb-4">{title}</h3>

			<p name="description" className="  w-full p-2 md:p-4 text-sm mb-4">
				{description}
			</p>

			<div className="w-full flex items-center gap-4">
				<PrimaryButton
					text={status === "pending" ? "Mark Complete" : "Mark Pending"}
					handleClick={async () => {
						await updateTodo(status === "pending" ? "complete" : "pending");
						setViewTodo(false);
					}}
				/>
				{status === "pending" && (
					<PrimaryButton
						text="Cancel Todo"
						sx="bg-[red]"
						handleClick={async () => {
							await updateTodo("cancelled");
						}}
					/>
				)}
			</div>
			{/* <PrimaryButton text="Cancel" sx="mt-2 !bg-transparent border-[1px] !text-black" handleClick={cancelCreation} /> */}
		</aside>
	);
};

export default ViewTodo;
