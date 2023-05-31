import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import axiosInstance from "../lib/axios";
import { useLocation } from "react-router-dom";

import PrimaryInput from "../components/PrimaryInput";
import PrimaryButton from "../components/PrimaryButton";
import SocialSignOn from "../components/SocialSignOn";

import { FcGoogle } from "react-icons/fc";
import { useUserContext } from "../context/user.context";
const Login = () => {
	const [disabled, setDisabled] = useState(false);
	const [data, setData] = useState({
		email: "",
		password: "",
	});
	const navigate = useNavigate();
	const { search } = useLocation();
	let query = new URLSearchParams(search);

	let error = query.get("error"),
		type = query.get("type");

	useEffect(() => {
		if (error && type) {
			toast.error("An error occurred during oauth authentication with " + type, { autoClose: 2500 });
			navigate("/login");
		}
	}, [error, type, navigate]);

	const { userDispatchFunc } = useUserContext();

	function handleChange(name, value) {
		setData((prev) => ({ ...prev, [name]: value }));
	}
	async function useLocalAuth() {
		try {
			setDisabled(true);
			let error = "";
			if (data.email.length === 0 || data.password.length === 0) {
				error = "Please fill in all credentials";
			}
			console.log(error);
			if (!error) {
				const res = await axiosInstance.post("/auth/local/login", data);
				toast.success("Login was successful", {
					autoClose: 2500,
				});

				setDisabled(false);
				userDispatchFunc({ type: "setData", payload: res.data });
			}
		} catch (e) {
			setDisabled(false);

			toast.error(e.response.data.error, {
				autoClose: 2500,
			});
		}
	}

	return (
		<main className="w-full h-screen bg-[#e2e2e2] flex items-center justify-center">
			<section className="w-full max-w-2xl h-4/5 rounded-[5px] bg-white shadow-lg mx-auto p-4 md:p-8 py-8 flex flex-col items-center justify-start">
				<h1 className="text-3xl font-bold mb-2">Welcome back</h1>
				<p className="opacity-70">Enter your details to login</p>
				<div className="w-full md:w-4/5 mt-12 mb-8">
					<PrimaryInput name="email" placeholder="example@gmail.com" label="Enter Email:" value={data.email} handleChange={handleChange} />
					<PrimaryInput name="password" type="password" placeholder="**********" label="Enter Password:" value={data.password} handleChange={handleChange} />
				</div>
				<div className="w-full md:w-4/5 ">
					<PrimaryButton text="Login" sx="mb-4" handleClick={useLocalAuth} disabled={disabled} />
					<SocialSignOn text="Continue with google" icon={FcGoogle} link="/api/v1/auth/google" />
				</div>

				<p className="mt-2">
					Don&apos;t have an account?{" "}
					<Link to="/register" className="text-blue-500 hover:underline">
						Sign up
					</Link>
				</p>
			</section>
			<ToastContainer />
		</main>
	);
};

export default Login;
