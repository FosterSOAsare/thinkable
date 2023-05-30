import { useEffect } from "react";
import axiosInstance from "../lib/axios";
import { useUserContext } from "../context/user.context";
const AuthVerify = () => {
	const { user, userDispatchFunc } = useUserContext();
	console.log(user);
	useEffect(() => {
		// Verify if user is logged in
		try {
			(async function () {
				const { data } = await axiosInstance.get("/auth/verify");
				userDispatchFunc({ type: "setData", payload: data });
			})();
		} catch (e) {
			console.log(e);
		}
	}, [userDispatchFunc]);
	return <div>Verifying</div>;
};

export default AuthVerify;
