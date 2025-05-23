import { Navigate, Route, Routes } from "react-router-dom";
import { Home, Login, Signup } from "./pages";
import Layout from "./components/layout";
import { useAuth } from "./context/AuthContext";
import { Toaster } from "react-hot-toast";
import Loading from "./components/loading";
import AuthLayout from "./components/auth/layout-auth";

export default function App() {
	const { authUser, isLoading } = useAuth();

	if (isLoading) return <Loading />;

	return (
		<>
			<Routes>
				<Route path="/" element={<Layout />}>
					<Route
						path="/"
						element={authUser ? <Home /> : <Navigate to={"/signup"} />}
					/>
					<Route
						path="/login"
						element={
							!authUser ? (
								<AuthLayout classname="animate-slide-out">
									<Login />
								</AuthLayout>
							) : (
								<Navigate to={"/"} />
							)
						}
					/>
					<Route
						path="/signup"
						element={
							!authUser ? (
								<AuthLayout classname="animate-slide-out">
									<Signup />
								</AuthLayout>
							) : (
								<Navigate to={"/"} />
							)
						}
					/>
				</Route>
			</Routes>
			<Toaster />
		</>
	);
}
