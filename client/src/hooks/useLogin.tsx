import { use, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { axiosInstance } from "../lib/axios";
import { FormLogin } from "../components/auth/FormLogin";
import toast from "react-hot-toast";

export default function useLogin() {
	const [isLoading, setIsloading] = useState<boolean>(false);
	const { setAuthUser } = use(AuthContext);

	const login = async (payload: FormLogin) => {
		try {
			setIsloading(true);
			const response = await axiosInstance.post("/api/auth/login", payload);
			if (response.status !== 200) throw new Error(response.data.error);
			toast.success("Login berhasil");
			setAuthUser(response.data);
		} catch (error: any) {
			toast.error(error.response.data.error);
		} finally {
			setIsloading(false);
		}
	};
	return { isLoading, login };
}
