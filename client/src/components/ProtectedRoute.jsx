/* eslint-disable react/prop-types */
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useUserContext } from "../context/user.context";

const ProtectedRoute = ({ el, registerRequired = false }) => {
	const navigate = useNavigate();
	const data = useUserContext();
	const { loading, user, error } = data.user;
	console.log(user, loading, error, registerRequired);

	useEffect(() => {
		if (!loading && !registerRequired && !error && user._id) {
			navigate("/");
		}
		if (!loading && registerRequired && (!user._id || error)) {
			navigate("/login");
		}
	}, [navigate, registerRequired, loading, error, user._id]);
	return (
		<>
			{loading && <p className="w-full h-screen bg-desc flex justify-center items-center text-3xl font-bold">Loading...</p>}
			{!loading && registerRequired && !error && user._id && <>{el}</>}

			{!loading && !registerRequired && !user._id && <>{el}</>}
		</>
	);
};

export default ProtectedRoute;
