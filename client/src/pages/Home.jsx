import { useUserContext } from "../context/user.context";
import axiosInstance from "../lib/axios";
const Home = () => {
	const { user, userDispatchFunc } = useUserContext();
	console.log(user);
	async function logoutUser() {
		try {
			await axiosInstance.get("/auth/logout");
			userDispatchFunc({ type: "logOut" });
		} catch (e) {
			window.location.reload();
		}
	}
	return (
		<div className="w-[100vw]  bg-[#f2f2f2] min-h-screen">
			<header className="w-full flex items-center justify-center sticky top-0 left-0 z-[4] bg-white shadow-lg">
				<div className="w-full flex items-center justify-between py-6 px-4 max-w-5xl h-full">
					<h3 className="text-3xl font-bold">Logo</h3>
					<div className="w-12 h-12 rounded-full bg-[red] flex items-center justify-center"></div>
				</div>
			</header>
			<button onClick={logoutUser}>Logout</button>
			<main className="w-full h-[300px] mt-4">
				<div className="w-full  max-w-5xl mx-auto px-4">
					<div className="w-full h-12  flex items-center justify-between mt-8 shadow-md">
						<input type="text" className="px-4 text-black appearance-none outline-0 w-4/5 h-full" aria-label="todo" />
						<button className="!w-1/5 text-white bg-[#165d86c4] h-full">Add Todo</button>
					</div>

					<div></div>
				</div>
			</main>
		</div>
	);
};

export default Home;
