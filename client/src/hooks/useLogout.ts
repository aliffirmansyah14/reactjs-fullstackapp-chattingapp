import { use, useState } from "react";
import { AuthContext } from "../context/AuthContext";

import { axiosInstance } from "../lib/axios";
import toast from "react-hot-toast";

export default function useLogout() {
	const [isLoading, setIsloading] = useState<boolean>(false);
	const { setAuthUser } = use(AuthContext);

	const logout = async () => {
		try {
			setIsloading(true);
			const response = await axiosInstance.post("/api/auth/logout");
			if (response.status !== 200) throw new Error(response.data.message);
			toast.success("Berhasil logout");
			setAuthUser(null);
		} catch (error: any) {
			toast.error(error.message);
		} finally {
			setIsloading(false);
		}
	};
	return { isLoading, logout };
}
