import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
import UserProvider from "./context/user.context";
import TodoProvider from "./context/todos.context.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
	<BrowserRouter>
		<UserProvider>
			<TodoProvider>
				<App />
			</TodoProvider>
		</UserProvider>
	</BrowserRouter>
);
