import { use, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { FormSignUp } from "../components/auth/FormSignup";
import { axiosInstance } from "../lib/axios";
import toast from "react-hot-toast";

export default function useSignup() {
	const [isLoading, setIsloading] = useState<boolean>(false);
	const { setAuthUser } = use(AuthContext);

	const signup = async (payload: FormSignUp) => {
		try {
			setIsloading(true);
			const response = await axiosInstance.post("/api/auth/signup", payload);
			if (response.status !== 201) throw new Error(response.data);
			setAuthUser(response.data);
			// console.log(response.data);
		} catch (error: any) {
			toast.error(error.response.data.error);
		} finally {
			setIsloading(false);
		}
	};
	return { isLoading, signup };
}
