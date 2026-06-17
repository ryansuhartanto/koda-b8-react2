const first = await fetch("https://rickandmortyapi.com/api/character").then(
	(r) => r.json(),
);
const rest = await Promise.all(
	Array.from({ length: first.info.pages - 1 }, (_, i) =>
		fetch(`https://rickandmortyapi.com/api/character?page=${i + 2}`).then((r) =>
			r.json(),
		),
	),
);
export const data = {
	...first,
	results: [first, ...rest].flatMap((d) => d.results),
};
