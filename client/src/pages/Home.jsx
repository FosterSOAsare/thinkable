import { useState } from "react";
import { useUserContext } from "../context/user.context";
import { useTodoContext } from "../context/todos.context";
import axiosInstance from "../lib/axios";
import TodoModal from "../components/TodoModal";
import Todo from "../components/Todo";
import ViewTodo from "../components/ViewTodo";

const Home = () => {
	const { user, userDispatchFunc } = useUserContext();
	const { todos, todoDispatchFunc } = useTodoContext();
	const [todo, setTodo] = useState({ title: "", description: "" });
	const [openModal, setOpenModal] = useState(false);
	const [viewTodo, setViewTodo] = useState({});

	const [showProfile, setShowProfile] = useState(false);

	async function logoutUser() {
		try {
			await axiosInstance.get("/auth/logout");
			userDispatchFunc({ type: "logOut" });
		} catch (e) {
			window.location.reload();
		}
	}

	async function deleteTodo(_id) {
		// Post Todo
		try {
			let { data } = await axiosInstance.delete(`/todos/${_id}`);
			console.log(data);
			todoDispatchFunc({ type: "deleteTodo", payload: { _id } });
			// Add data to todos
		} catch (e) {
			console.log(e);
		}
	}

	return (
		<div className="w-[100vw]  bg-[#f2f2f2] min-h-screen">
			<header className="w-full flex items-center justify-center sticky top-0 left-0 z-[4] bg-white shadow-lg">
				<div className="w-full flex items-center justify-between py-6 px-4 max-w-5xl h-full">
					<h3 className="text-3xl font-bold">Logo</h3>
					<div className="w-12 h-12  relative rounded-full bg-slate-200">
						<p className="text-3xl font-bold w-full h-full rounded-full  flex items-center justify-center" onClick={() => setShowProfile((prev) => !prev)}>
							{user?.user?.email?.substring(0, 1).toUpperCase()}
						</p>
						{showProfile && (
							<div className="w-[200px] h-auto bg-slate-200 rounded-[5px] absolute  flex items-start p-5 flex-col justify-start -left-[150px] md:-left-[70px] top-[110%] text-sm">
								<p>{user?.user?.email}</p>
								<p className="opacity-50">Logged in with: {user?.user?.provider === "local" ? "email and password" : user?.user?.provider}</p>
								<button onClick={logoutUser} className="w-full bg-green-400 h-8 mt-4 rounded-[5px]">
									Logout
								</button>
							</div>
						)}
					</div>
				</div>
			</header>

			<main className="w-full h-auto mt-4 pb-12">
				<div className="w-full  max-w-5xl mx-auto px-4">
					<div className="w-full h-12  flex items-center justify-between mt-8 shadow-md">
						<input
							type="text"
							className="px-4 text-black appearance-none outline-0 w-4/5 h-full"
							aria-label="todo"
							value={todo.title}
							onChange={(e) => setTodo((prev) => ({ ...prev, title: e.target.value }))}
						/>
						<button className="w-2/5 md:!w-1/5 text-white bg-[#165d86c4] h-full" onClick={() => setOpenModal(true)} disabled={todo?.title.length === 0}>
							Add Todo
						</button>
					</div>

					<div className="mt-8">
						{todos?.todos.map((todo, index) => (
							<Todo key={index} todo={todo} todos={todos.todos} setOpenModal={setOpenModal} setTodo={setTodo} setViewTodo={setViewTodo} deleteTodo={deleteTodo} />
						))}
					</div>
				</div>
			</main>
			{viewTodo._id && <ViewTodo viewTodo={viewTodo} setTodo={setTodo} setOpenModal={setOpenModal} setViewTodo={setViewTodo} deleteTodo={deleteTodo} />}
			{openModal && <TodoModal setOpenModal={setOpenModal} todo={todo} setTodo={setTodo} />}
		</div>
	);
};

export default Home;
