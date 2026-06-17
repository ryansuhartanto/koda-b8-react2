import { SearchIcon } from "lucide-react";
import React, { useEffect, useState } from "react";
import { Outlet, useSearchParams } from "react-router";

import { data } from "#/api";

// oxlint-disable-next-line no-unassigned-import
import "./style.css";

function Search({ value, setValue, onSubmit, onSelect, suggestions = [] }) {
	const [open, setOpen] = useState(false);

	const filtered = value
		? suggestions.filter((name) =>
				name.toLowerCase().includes(value.toLowerCase()),
			)
		: [];

	return (
		<div className="relative w-full">
			<form
				className="flex items-center w-full h-14 bg-gray-50 rounded-full shadow-xl"
				onSubmit={(e) => {
					setOpen(false);
					onSubmit(e);
				}}
			>
				<input
					type="text"
					name="q"
					className="flex-1 w-full h-full px-8 bg-transparent outline-none"
					value={value}
					onInput={(e) => {
						setValue(e.target.value);
						setOpen(true);
					}}
					onFocus={() => setOpen(true)}
					onBlur={() => setOpen(false)}
					onKeyDown={(e) => e.key === "Escape" && setOpen(false)}
					autoComplete="off"
					placeholder="Search character..."
				/>
				<button type="submit">
					<SearchIcon className="shrink mx-8 text-gray-600" />
				</button>
			</form>
			{open && filtered.length > 0 && (
				<ul className="absolute z-10 top-full mt-2 w-full max-h-64 overflow-y-auto bg-white rounded-2xl shadow-xl py-2">
					{filtered.map((name) => (
						<li
							key={name}
							className="px-8 py-3 hover:bg-gray-100 cursor-pointer transition-colors"
							onMouseDown={(e) => e.preventDefault()}
							onClick={() => {
								setValue(name);
								setOpen(false);
								onSelect(name);
							}}
						>
							{name}
						</li>
					))}
				</ul>
			)}
		</div>
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

	function applySearch(q) {
		const trimmed = q.trim();
		if (trimmed) {
			setSearchParams({ q: trimmed });
		} else {
			setSearchParams({});
		}
	}

	return (
		<>
			<header className="sticky inset-bs-0 max-w-3xl p-4 mx-auto py-8 before:content-[''] before:fixed before:inset-0 before:inset-be-0 before:h-16 before:bg-white before:-z-10">
				<Search
					value={search}
					setValue={setSearch}
					suggestions={data.results.map((c) => c.name)}
					onSelect={applySearch}
					onSubmit={(e) => {
						e.preventDefault();
						applySearch(new FormData(e.target).get("q") ?? "");
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
