import { Search } from "lucide-react";
import Listconversations from "./list-conversations";
import LogoutButton from "./button-logout";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { useDebounceValue } from "../../hooks/useDebounceValue";

interface ISideBar {
	className: string;
}

export default function Sidebar({ className }: ISideBar) {
	const [search, setSearch] = useState<string>("");
	const debounceSearch = useDebounceValue(search);

	return (
		<aside className={`${className}`}>
			<div className="flex flex-col gap-3 h-full ">
				<SearchInput value={search} setValue={setSearch} />
				<div className="flex-1 border-t-1 border-b-1 border-accent py-1 overflow-y-auto ">
					<Listconversations search={debounceSearch} />
				</div>
				<div className="mt-auto">
					<LogoutButton />
				</div>
			</div>
		</aside>
	);
}

type SearchInputProps = {
	value?: string;
	setValue: Dispatch<SetStateAction<string>>;
};

function SearchInput({ value, setValue }: SearchInputProps) {
	return (
		<div className="input w-full">
			<input
				type="text"
				placeholder="Search…"
				value={value}
				onChange={e => setValue(e.target.value)}
			/>
			<button type="submit" className="text-white  ">
				<Search className="size-[1.5rem] outline-none" />
			</button>
		</div>
	);
}
