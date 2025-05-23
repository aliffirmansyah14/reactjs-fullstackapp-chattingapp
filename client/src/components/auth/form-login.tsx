import { useForm } from "react-hook-form";
import Input from "../input";
import { zodResolver } from "@hookform/resolvers/zod";
import { PasswordIcon, UsernameIcon } from "../../assets/svg";

import { FormLoginType, formLoginSchema } from "../../lib/validation";
import { useLogin } from "../../hooks/useLogin";

export default function FormLogin() {
	const { isLoading, login } = useLogin();
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<FormLoginType>({
		resolver: zodResolver(formLoginSchema),
	});

	const onSubmit = (data: FormLoginType) => {
		login(data);
	};
	return (
		<form className="p-4 space-y-4" onSubmit={handleSubmit(onSubmit)}>
			<Input
				{...register("username")}
				name="username"
				placeholder="username"
				autoComplete="username"
				type="text"
				required={true}
				icon={<UsernameIcon />}
				className={
					errors.username?.message ? "border-red-500 outline-red-500" : ""
				}
			>
				{errors.username && (
					<Input.InputMessage message={errors.username.message} />
				)}
			</Input>
			<Input
				{...register("password")}
				name="password"
				placeholder="password"
				type="password"
				required={true}
				minLength={1}
				autoComplete="user1234"
				icon={<PasswordIcon />}
				className={errors.password?.message ? "border-red-500 " : ""}
			>
				{errors?.password && (
					<Input.InputMessage message={errors.password.message} />
				)}
			</Input>

			<button disabled={isLoading} className="btn btn-accent w-full mt-4">
				{isLoading ? "Loading..." : "Login"}
			</button>
		</form>
	);
}
