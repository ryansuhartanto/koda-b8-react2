import React from "react";

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

const req = await fetch("https://rickandmortyapi.com/api/character");
const data = await req.json();

/**
 * @param {{ filterFn: (Array) => Array }} props
 */
export default function Characters({ filterFn = (a) => a }) {
	const [display, setDisplay] = React.useState([]);

	React.useEffect(() => {
		setDisplay(filterFn(data.results));
	}, [filterFn]);

	return (
		<div className="grid grid-cols-2 gap-6">
			{display.map(({ id, name, image }) => (
				<Card
					key={id}
					name={name}
					image={image}
				/>
			))}
		</div>
	);
}
