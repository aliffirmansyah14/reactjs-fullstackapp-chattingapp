import Layout from "../components/auth/Layout";
import FormSignup from "../components/auth/FormSignup";

export default function Signup() {
	return (
		<Layout>
			<h1 className="text-center text-3xl font-bold mt-6">SignUp</h1>
			<FormSignup />
		</Layout>
	);
}
