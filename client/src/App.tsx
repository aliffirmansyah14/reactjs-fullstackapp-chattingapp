import { Navigate, Route, Routes } from "react-router-dom";
import { Home, Login, Signup } from "./pages";
import Layout from "./components/Layout";
import { use } from "react";
import { AuthContext } from "./context/AuthContext";
import { Toaster } from "react-hot-toast";

export default function App() {
	const { authUser, isLoading } = use(AuthContext);
	if (isLoading) return null;
	return (
		<Layout>
			<Routes>
				<Route
					path="/"
					element={authUser ? <Home /> : <Navigate to={"/login"} />}
				/>
				<Route
					path="/login"
					element={!authUser ? <Login /> : <Navigate to={"/"} />}
				/>
				<Route
					path="/signUp"
					element={!authUser ? <Signup /> : <Navigate to={"/"} />}
				/>
			</Routes>
			<Toaster />
		</Layout>
	);
}
