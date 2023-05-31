/* eslint-disable react/prop-types */
import { AiFillDelete, AiOutlineClockCircle, AiOutlineCheck } from "react-icons/ai";

import { FiEdit2 } from "react-icons/fi";
import { FcCancel } from "react-icons/fc";

const Todo = ({ todo, setOpenModal, setTodo, setViewTodo, deleteTodo }) => {
	const { status, title, description } = todo;

	return (
		<div className="w-full h-auto border-b-[2px] pb-4 mb-4 flex items-start gap-4 justify-start">
			<div className="w-full flex flex-start items-center gap-4" onClick={() => setViewTodo(todo)}>
				<div className={`${status} w-8 h-8  flex justify-center items-center`}>
					{status === "pending" ? (
						<AiOutlineClockCircle className="opacity-70" />
					) : status === "complete" ? (
						<AiOutlineCheck className="text-green-700" />
					) : (
						<FcCancel className="text-red-700" />
					)}
				</div>
				<div className="w-full">
					<p className="text-lg font-medium mb-2">{title}</p>
					<p className="opacity-70 text-sm md:text-[16px]">{description.length > 75 ? description.substring(0, 75) + "..." : description}</p>
				</div>
			</div>
			<div className="flex gap-4 md:gap-4 h-auto self-center">
				<button
					className="flex items-center justify-center rounded-full p-0 md:p-3  hover:bg-slate-200"
					onClick={() => {
						setTodo({ ...todo, type: "update" });
						setTimeout(() => {
							setOpenModal(true);
						}, 200);
					}}>
					<FiEdit2 className="text-lg" />
				</button>
				<button className="flex items-center justify-center rounded-full p-0 md:p-3 hover:bg-red-400" onClick={() => deleteTodo(todo._id)}>
					<AiFillDelete className="text-lg text-red-700" />
				</button>
			</div>
		</div>
	);
};

export default Todo;
