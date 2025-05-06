import { Link } from "react-router-dom";
import z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import Input, { InputMessage } from "../Input";
import { PasswordIcon, UsernameIcon } from "../../assets/svg";
import RadioButton from "../RadioButton";
import useSignup from "../../hooks/useSignup";

const formSchema = z
	.object({
		username: z.string().min(3, "Minimal 3 character"),
		fullname: z.string().min(1, "Minimal 1 character"),
		password: z
			.string()
			.min(8, "Password harus lebih dari 8 karakter")
			.regex(
				/(?=.*?[a-z])(?=.*?[0-9]).{8,}$/,
				"At least one number one letter"
			),
		confirmPassword: z
			.string()
			.min(8, "Password harus lebih dari 8 karakter")
			.regex(
				/(?=.*?[a-z])(?=.*?[0-9]).{8,}$/,
				"At least one number one letter"
			),
		gender: z.enum(["male", "female"]),
	})
	.refine(data => data.password === data.confirmPassword, {
		message: "Password tidak sama",
		path: ["confirmPassword"],
	});
export type FormSignUp = z.infer<typeof formSchema>;

export default function FormSignup() {
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<FormSignUp>({
		resolver: zodResolver(formSchema),
	});
	const { isLoading, signup } = useSignup();
	const onSubmit = (data: FormSignUp) => {
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
				className={
					errors.username?.message ? "border-red-500 outline-red-500" : ""
				}
			>
				{errors.username && <InputMessage message={errors.username.message} />}
			</Input>
			<Input
				{...register("fullname")}
				name="fullname"
				placeholder="joe mama"
				type="text"
				required={true}
				icon={<UsernameIcon />}
				className={
					errors.fullname?.message ? "border-red-500 outline-red-500" : ""
				}
			>
				{errors.fullname && <InputMessage message={errors.fullname.message} />}
			</Input>
			<Input
				{...register("password")}
				name="password"
				placeholder="password"
				type="password"
				required={true}
				minLength={8}
				icon={<PasswordIcon />}
				className={errors.password?.message ? "border-red-500 " : ""}
			>
				{errors?.password && <InputMessage message={errors.password.message} />}
			</Input>
			<Input
				{...register("confirmPassword")}
				name="confirmPassword"
				placeholder="password"
				type="password"
				required={true}
				minLength={8}
				icon={<PasswordIcon />}
				className={errors.confirmPassword?.message ? "border-red-500 " : ""}
			>
				{errors?.confirmPassword && (
					<InputMessage message={errors.confirmPassword.message} />
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
					Submit
				</button>
			</div>
		</form>
	);
}
