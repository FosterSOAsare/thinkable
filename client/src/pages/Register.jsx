import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";

import axiosInstance from "../lib/axios";

import PrimaryInput from "../components/PrimaryInput";
import PrimaryButton from "../components/PrimaryButton";
import SocialSignOn from "../components/SocialSignOn";

import { FcGoogle } from "react-icons/fc";
const Register = () => {
	const [data, setData] = useState({
		email: "",
		password: "",
	});
	const navigate = useNavigate();
	const [loading, setIsLoading] = useState(false);

	function handleChange(name, value) {
		setData((prev) => ({ ...prev, [name]: value }));
	}
	async function useLocalAuth() {
		try {
			setIsLoading(true);
			await axiosInstance.post("/auth/local/register", { ...data, email: data.email.toLowerCase() });
			setIsLoading(false);
			toast.success("Registration was successful , redirecting to login...", {
				autoClose: 2500,
			});
			setTimeout(() => {
				navigate(`/login`);
			}, 3000);
		} catch (e) {
			setIsLoading(false);
			toast.error(e.response.data.error, {
				className: "customError",
				autoClose: 2500,
			});
		}
	}
	return (
		<main className="w-full h-screen bg-[#e2e2e2] flex items-center justify-center">
			<section className="w-full max-w-2xl h-4/5 rounded-[5px] bg-white shadow-lg mx-auto p-8 flex flex-col items-center justify-start">
				<h1 className="text-3xl font-bold mb-2">Welcome to Todo-App</h1>
				<p className="opacity-70">Please enter your details to create an account</p>
				<div className="w-4/5 mt-12 mb-8">
					<PrimaryInput name="email" placeholder="example@gmail.com" label="Enter Email:" value={data.email} handleChange={handleChange} />
					<PrimaryInput name="password" type="password" placeholder="**********" label="Enter Password:" value={data.password} handleChange={handleChange} />
				</div>
				<div className="w-4/5 ">
					<PrimaryButton text="Sign up" sx="mb-4 bg-blue-900" handleClick={useLocalAuth} disabled={loading} />
					<SocialSignOn text="Continue with google" icon={FcGoogle} link="/api/v1/auth/google" />
				</div>

				<p className="mt-2">
					Already have an account?{" "}
					<Link to="/login" className="text-blue-500 hover:underline">
						Log in
					</Link>
				</p>
			</section>
			<ToastContainer />
		</main>
	);
};

export default Register;
