import { SearchIcon } from "lucide-react";
import React, { useEffect } from "react";
import { Outlet, useSearchParams } from "react-router";

// oxlint-disable-next-line no-unassigned-import
import "./style.css";

function Search({ value, setValue, onSubmit }) {
	return (
		<form
			className="flex items-center w-full h-14 bg-gray-50 rounded-full shadow-xl"
			onSubmit={onSubmit}
		>
			<input
				type="text"
				name="q"
				className="flex-1 w-full h-full px-8"
				value={value}
				onInput={(e) => setValue(e.target.value)}
				placeholder="Search character..."
			/>
			<button type="submit">
				<SearchIcon className="shrink mx-8 text-gray-600" />
			</button>
		</form>
	);
}

export default function App() {
	const [searchParams, setSearchParams] = useSearchParams();
	const [search, setSearch] = React.useState(searchParams.get("q") ?? "");

	useEffect(() => {
		const query = searchParams.get("q");
		if (query) {
			setSearch(query);
		}
	}, [searchParams]);

	return (
		<>
			<header className="sticky inset-bs-0 max-w-3xl p-4 mx-auto py-8 before:content-[''] before:fixed before:inset-0 before:inset-be-0 before:h-16 before:bg-white before:-z-10">
				<Search
					value={search}
					setValue={setSearch}
					onSubmit={(e) => {
						e.preventDefault();
						const form = new FormData(e.target);
						const data = Object.fromEntries(form);
						console.log(data);

						setSearchParams({
							q: data["q"].trim(),
						});
					}}
				/>
			</header>
			<main className="max-w-3xl p-4 mx-auto">
				<React.Suspense fallback={<>Loading...</>}>
					<Outlet />
				</React.Suspense>
			</main>
		</>
	);
}
