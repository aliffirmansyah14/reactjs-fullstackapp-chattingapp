import { useForm } from "react-hook-form";
import Input, { InputMessage } from "../Input";
import { zodResolver } from "@hookform/resolvers/zod";
import z from "zod";
import { PasswordIcon, UsernameIcon } from "../../assets/svg";
import useLogin from "../../hooks/useLogin";

const formSchema = z.object({
	username: z.string().min(2, "Minimal 2 karakter"),
	password: z.string().min(1, "Password harus lebih dari 8 karakter"),
});
export type FormLogin = z.infer<typeof formSchema>;

export default function FormLogin() {
	const { isLoading, login } = useLogin();
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<FormLogin>({
		resolver: zodResolver(formSchema),
	});

	const onSubmit = (data: FormLogin) => {
		login(data);
	};
	return (
		<form className="p-4 space-y-4" onSubmit={handleSubmit(onSubmit)}>
			<Input
				{...register("username")}
				name="username"
				placeholder="joe mama"
				type="text"
				required={true}
				icon={<UsernameIcon />}
				className={
					errors.username?.message ? "border-red-500 outline-red-500" : ""
				}
			>
				{errors.username && <InputMessage message={errors.username.message} />}
			</Input>
			<Input
				{...register("password")}
				name="password"
				placeholder="password"
				type="password"
				required={true}
				minLength={1}
				icon={<PasswordIcon />}
				className={errors.password?.message ? "border-red-500 " : ""}
			>
				{errors?.password && <InputMessage message={errors.password.message} />}
			</Input>

			<button disabled={isLoading} className="btn btn-accent w-full mt-4">
				{isLoading ? "Loading..." : "Login"}
			</button>
		</form>
	);
}
