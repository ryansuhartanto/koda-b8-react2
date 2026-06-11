import React from "react";

// oxlint-disable-next-line no-unassigned-import
import "./style.css";

const Characters = React.lazy(() => import("./Characters"));

function Search() {
	return (
		<div className="flex items-center gap-4 w-full h-14 bg-gray-50 rounded-full shadow-xl">
			<input
				type="text"
				className="flex-1 w-full h-full px-8"
			/>
		</div>
	);
}

export function App() {
	return (
		<>
			<header className="sticky inset-bs-0 max-w-3xl p-4 mx-auto py-8 before:content-[''] before:fixed before:inset-0 before:inset-be-0 before:h-16 before:bg-white before:-z-10">
				<Search />
			</header>
			<main className="max-w-3xl p-4 mx-auto">
				<React.Suspense fallback={<>Loading...</>}>
					<Characters />
				</React.Suspense>
			</main>
		</>
	);
}
