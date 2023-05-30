import "react-toastify/dist/ReactToastify.css";
import "./App.css";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import AuthVerify from "./pages/AuthVerify";
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
	return (
		<div className="w-[100vw] min-h-screen">
			<Routes>
				<Route path="/" element={<ProtectedRoute el={<Home />} registerRequired={true} />}></Route>
				<Route path="/login" element={<ProtectedRoute el={<Login />} />}></Route>
				<Route path="/login/verify" element={<ProtectedRoute el={<AuthVerify />} />}></Route>
				<Route path="/register" element={<ProtectedRoute el={<Register />} />}></Route>
			</Routes>
		</div>
	);
}

export default App;
