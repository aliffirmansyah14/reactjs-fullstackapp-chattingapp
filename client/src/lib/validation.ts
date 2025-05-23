import z from "zod";

export const formLoginSchema = z.object({
	username: z.string().trim().min(2, "Minimal 2 karakter"),
	password: z
		.string()
		.min(1, "Password harus lebih dari atau sama dengan 8 karakter"),
});
export type FormLoginType = z.infer<typeof formLoginSchema>;

export const formSignUpSchema = z
	.object({
		username: z.string().trim().min(3, "Minimal 3 character"),
		fullname: z.string().trim().min(1, "Minimal 1 character"),
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
export type FormSignUpType = z.infer<typeof formSignUpSchema>;
