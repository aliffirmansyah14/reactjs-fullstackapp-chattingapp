import {
	createContext,
	Dispatch,
	SetStateAction,
	PropsWithChildren,
	useState,
	useEffect,
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

const AuthProvider = ({ children }: PropsWithChildren) => {
	const [authUser, setAuthUser] = useState<AuthUserType | null>(null);
	const [isLoading, setIsloading] = useState<boolean>(true);

	useEffect(() => {
		const fetchUser = async () => {
			try {
				const response = await axiosInstance.get("/auth/me");
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
	}, []);

	return (
		<AuthContext value={{ authUser, setAuthUser, isLoading }}>
			{children}
		</AuthContext>
	);
};

export { AuthContext, AuthProvider };
