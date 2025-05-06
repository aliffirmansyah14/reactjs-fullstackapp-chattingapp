import Layout from "../components/auth/Layout";
import FormLogin from "../components/auth/FormLogin";

export default function Login() {
	return (
		<Layout>
			<h1 className="text-center text-3xl font-bold mt-6">Login</h1>
			<FormLogin />
		</Layout>
	);
}
