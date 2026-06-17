import { SearchIcon } from "lucide-react";
import React from "react";
import { useSearchParams } from "react-router";

// oxlint-disable-next-line no-unassigned-import
import "./style.css";

const Characters = React.lazy(() => import("./Characters"));

function Search({ value, setValue }) {
	return (
		<div className="flex items-center w-full h-14 bg-gray-50 rounded-full shadow-xl">
			<input
				type="text"
				className="flex-1 w-full h-full px-8"
				value={value}
				onInput={(e) => setValue(e.target.value)}
				placeholder="Search character..."
			/>
			<SearchIcon className="shrink mx-8 text-gray-600" />
		</div>
	);
}

export default function App() {
	const [searchParams, setSearchParams] = useSearchParams();

	return (
		<>
			<header className="sticky inset-bs-0 max-w-3xl p-4 mx-auto py-8 before:content-[''] before:fixed before:inset-0 before:inset-be-0 before:h-16 before:bg-white before:-z-10">
				<Search
					value={searchParams.get("q")}
					setValue={(value) => setSearchParams({ q: value })}
				/>
			</header>
			<main className="max-w-3xl p-4 mx-auto">
				<React.Suspense fallback={<>Loading...</>}>
					<Characters />
				</React.Suspense>
			</main>
		</>
	);
}
