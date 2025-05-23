import { use, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { FormSignUpType } from "../lib/validation";
import { toastError } from "../lib/toast";
import { userRegister } from "../lib/api/userApi";

export default function useSignup() {
	const [isLoading, setIsloading] = useState<boolean>(false);
	const { setAuthUser } = use(AuthContext);

	const signup = async (payload: FormSignUpType) => {
		try {
			setIsloading(true);
			const response = await userRegister(payload);
			if (response.status !== 201) throw new Error(response.data);
			setAuthUser(response.data);
		} catch (error: any) {
			toastError(error.response.data.error || "Terjadi kesalahan di server");
		} finally {
			setIsloading(false);
		}
	};
	return { isLoading, signup };
}
