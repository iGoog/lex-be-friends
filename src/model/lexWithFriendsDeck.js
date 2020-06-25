import Card from "./Card";

const pointDist = {
	wild: [2, 12],
	e: [12, 10],
	a: [8, 10],
	o: [8, 10],
	t: [7, 10],
	i: [7, 10],
	n: [6, 10],
	r: [6, 10],
	s: [5, 10],
	l: [4, 10],
	u: [4, 10],
	d: [4, 9],
	g: [3, 9],
	c: [3, 8],
	m: [3, 8],
	b: [2, 8],
	p: [2, 8],
	h: [2, 7],
	f: [2, 7],
	w: [2, 7],
	y: [2, 7],
	v: [1, 7],
	k: [1, 6],
	j: [1, 3],
	x: [1, 3],
	q: [1, 1],
	z: [1, 1]
}

const createDeck = (playerCount = 4) => {
	let id = 0;
	let copies = Math.ceil(playerCount / 6);
	const deck = [];
	Object.entries(pointDist).forEach( ([key,arr])=> {
		for (let i=0; i < arr[0]*copies; i++) {
			deck.push(new Card(id++, arr[1], key));
		}
	} );
	return deck;
}

export default createDeck;
