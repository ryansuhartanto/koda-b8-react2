import React from "react";
import { useSearchParams } from "react-router";

import { data } from "#/api";

/**
 * @param {{ name: string, image: string }} props
 */
function Card({ name, image }) {
	return (
		<div className="flex flex-col rounded-3xl overflow-hidden shadow-md">
			<img
				src={image}
				alt={name}
				className="object-cover"
			/>
			<div className="p-4 text-xl font-bold text-center">{name}</div>
		</div>
	);
}

export default function Characters() {
	const [searchParams] = useSearchParams();
	const query = searchParams.get("q");

	let display = data.results;
	if (query) {
		display = display.filter(({ name }) =>
			name.toLowerCase().includes(query.toLowerCase()),
		);
	}

	return (
		<>
			{query && (
				<div className="mbe-4">
					Found <span className="font-bold">{display.length} results</span>.
				</div>
			)}
			<div className="grid grid-cols-2 gap-6">
				{display.map(({ id, name, image }) => (
					<Card
						key={id}
						name={name}
						image={image}
					/>
				))}
			</div>
		</>
	);
}
