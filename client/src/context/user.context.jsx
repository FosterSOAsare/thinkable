/* eslint-disable react/prop-types */
import { createContext, useContext, useEffect, useReducer } from "react";
import axiosInstance from "../lib/axios";
import createErrorMessage from "../utils/error.axios";

const UserContext = createContext();

const UserProvider = ({ children }) => {
	const [user, userDispatchFunc] = useReducer(userFunc, { loading: true, error: null, user: {} });

	useEffect(() => {
		// Fetch user
		(async function () {
			try {
				const { data } = await axiosInstance.get("/auth/verify");
				userDispatchFunc({ type: "setData", payload: data });
			} catch (e) {
				createErrorMessage(e);
				userDispatchFunc({ type: "setError", payload: e.message });
			}
		})();
	}, []);

	function userFunc(state, action) {
		switch (action.type) {
			case "setData":
				return { loading: false, error: null, user: action.payload };
			case "setError":
				return { ...state, loading: false, error: action.payload };
			case "logOut":
				return { ...state, user: {} };
			default:
				state;
		}
	}
	return <UserContext.Provider value={{ user, userDispatchFunc }}>{children}</UserContext.Provider>;
};

// eslint-disable-next-line react-refresh/only-export-components
export const useUserContext = () => {
	return useContext(UserContext);
};

export default UserProvider;
