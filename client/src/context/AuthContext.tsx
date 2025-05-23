import {
	createContext,
	Dispatch,
	SetStateAction,
	PropsWithChildren,
	useState,
	useEffect,
	use,
} from "react";
import { axiosInstance } from "../lib/axios";

type AuthUserType = {
	id: string;
	fullname: string;
	email: string;
	profilePic: string;
	gender: string;
};

const AuthContext = createContext<{
	authUser: AuthUserType | null;
	setAuthUser: Dispatch<SetStateAction<AuthUserType | null>>;
	isLoading: boolean;
}>({
	authUser: null,
	setAuthUser: () => {},
	isLoading: true,
});

const useAuth = () => {
	return use(AuthContext);
};

const AuthProvider = ({ children }: PropsWithChildren) => {
	const [authUser, setAuthUser] = useState<AuthUserType | null>(null);
	const [isLoading, setIsloading] = useState<boolean>(true);

	useEffect(() => {
		const controller = new AbortController();
		const signal = controller.signal;
		const fetchUser = async () => {
			try {
				await new Promise(resolve => setTimeout(resolve, 2000));
				const response = await axiosInstance.get("/api/auth/me", { signal });
				if (response.status !== 200) {
					throw new Error(response.data.error);
				}
				setAuthUser(response.data);
			} catch (error) {
				console.log(error);
			} finally {
				setIsloading(false);
			}
		};
		fetchUser();
		return () => controller.abort();
	}, []);

	return (
		<AuthContext value={{ authUser, setAuthUser, isLoading }}>
			{children}
		</AuthContext>
	);
};

export { AuthContext, AuthProvider, useAuth };
