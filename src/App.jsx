import React from "react";

// oxlint-disable-next-line no-unassigned-import
import "./style.css";

const Characters = React.lazy(() => import("./Characters"));

export function App() {
	return (
		<>
			<header></header>
			<main className="max-w-3xl p-4 mx-auto">
				<React.Suspense fallback={<>Loading...</>}>
					<Characters />
				</React.Suspense>
			</main>
		</>
	);
}
