import { Link } from "react-router-dom";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import Input from "../input";
import { PasswordIcon, UsernameIcon } from "../../assets/svg";

import useSignup from "../../hooks/useSignup";
import { FormSignUpType, formSignUpSchema } from "../../lib/validation";
import RadioButton from "../radio-button";

export default function FormSignup() {
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<FormSignUpType>({
		resolver: zodResolver(formSignUpSchema),
	});
	const { isLoading, signup } = useSignup();
	const onSubmit = (data: FormSignUpType) => {
		console.log(data);
		signup(data);
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
				autoComplete="username"
				className={
					errors.username?.message ? "border-red-500 outline-red-500" : ""
				}
			>
				{errors.username && (
					<Input.InputMessage message={errors.username.message} />
				)}
			</Input>
			<Input
				{...register("fullname")}
				name="fullname"
				placeholder="joe mama"
				type="text"
				required={true}
				icon={<UsernameIcon />}
				autoComplete="fullname"
				className={
					errors.fullname?.message ? "border-red-500 outline-red-500" : ""
				}
			>
				{errors.fullname && (
					<Input.InputMessage message={errors.fullname.message} />
				)}
			</Input>
			<Input
				{...register("password")}
				name="password"
				placeholder="password"
				type="password"
				required={true}
				minLength={8}
				icon={<PasswordIcon />}
				autoComplete="off"
				className={errors.password?.message ? "border-red-500 " : ""}
			>
				{errors?.password && (
					<Input.InputMessage message={errors.password.message} />
				)}
			</Input>
			<Input
				{...register("confirmPassword")}
				name="confirmPassword"
				placeholder="password"
				type="password"
				autoComplete="off"
				required={true}
				minLength={8}
				icon={<PasswordIcon />}
				className={errors.confirmPassword?.message ? "border-red-500 " : ""}
			>
				{errors?.confirmPassword && (
					<Input.InputMessage message={errors.confirmPassword.message} />
				)}
			</Input>
			<div className="flex gap-2">
				<RadioButton
					{...register("gender")}
					label="Male"
					value="male"
					name="gender"
					defaultChecked
				/>
				<RadioButton
					{...register("gender")}
					label="Female"
					value="female"
					name="gender"
				/>
			</div>
			{errors.gender?.message && <p>{errors.gender.message}</p>}
			<div>
				<Link
					to={"/login"}
					className="text-sm hover:underline hover:text-blue-600 mt-2 inline-block text-white"
				>
					Already have an account?
				</Link>
				<button
					disabled={isLoading}
					role="button"
					className="btn btn-accent w-full mt-2"
				>
					{isLoading ? "Loading..." : "Submit"}
				</button>
			</div>
		</form>
	);
}
