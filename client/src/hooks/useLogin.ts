import { use, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { FormLoginType } from "../lib/validation";
import { toastError, toastSuccess } from "../lib/toast";
import { userLogin } from "../lib/api/userApi";

export function useLogin() {
	const [isLoading, setIsloading] = useState<boolean>(false);
	const { setAuthUser } = use(AuthContext);

	const login = async (payload: FormLoginType) => {
		try {
			setIsloading(true);
			const response = await userLogin(payload);
			if (response.status !== 200) throw new Error(response.data.error);
			setAuthUser(response.data);
			toastSuccess("Login Berhasil");
		} catch (error: any) {
			toastError(error.response.data.error || "Terjadi kesalahan di server");
		} finally {
			setIsloading(false);
		}
	};
	return { isLoading, login };
}
