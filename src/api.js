const req = await fetch("https://rickandmortyapi.com/api/character");
export const data = await req.json();
