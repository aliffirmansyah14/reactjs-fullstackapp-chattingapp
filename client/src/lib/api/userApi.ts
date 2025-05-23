import { axiosInstance } from "../axios";

type UserLoginProps = {
	username: string;
	password: string;
};

type UserRegisterProps = {
	password: string;
	username: string;
	fullname: string;
	confirmPassword: string;
	gender: "male" | "female";
};

export const userLogin = async (payload: UserLoginProps) => {
	return await axiosInstance.post("/api/auth/login", { ...payload });
};
export const userRegister = async (payload: UserRegisterProps) => {
	return await axiosInstance.post("/api/auth/signup", {
		...payload,
	});
};
