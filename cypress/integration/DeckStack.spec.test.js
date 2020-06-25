/// <reference types="cypress" />

import DeckStack from "../../src/model/DeckStack";

const freshDeck = (size) => {
	return [...Array(size).keys()]
}

describe('Tests for DeckStack', () => {
	it('Constructs a Stack of 52', () => {
		const cards = freshDeck(52);
		const cardCopy = [...cards];
		const testStack = new DeckStack(cards);
		expect(testStack.cards).to.be.length(52);
		expect(testStack.cards).to.deep.equal(cardCopy);
	});

	it('Shuffles the cards well', () => {
		const cards = freshDeck(52);
		const cardCopy = [...cards];
		const testStack = new DeckStack(cards);
		expect([...testStack.cards]).to.deep.equal(cardCopy);
		testStack.shuffle();
		expect(testStack.cards).to.have.members(cardCopy);
		expect(testStack.cards).to.not.equal(cardCopy);
		const spots = new Array(52);
		for (let j=0; j < 52; j++) spots[j] = new Set();
		const firsts = new Set(), lasts = new Set(), tenths = new Set();
		for (let i=0; i < 50; i++) {
			testStack.shuffle();
			for (let j=0; j<52; j++) spots[j].add(testStack.cards[j]);
		}
		for (let j=0; j < 52; j++) expect(spots[j].size).to.be.greaterThan(10);

	});

	it('Places cards into the deck well', () => {
		const cards = freshDeck(52);
		const cardCopy = [...cards];
		const testStack = new DeckStack(cards);
		testStack.place(['J','J'])
		expect(testStack.cards).to.be.length(54);
		expect(testStack.cards[53]).to.equal('J');
		expect(testStack.cards[52]).to.equal('J');
		testStack.place(72);
		expect(testStack.cards).to.be.length(55);
		expect(testStack.cards[54]).to.equal(72);
		const extraStack = new DeckStack(cardCopy);
		testStack.place(extraStack);
		expect(testStack.cards).to.be.length(107); //55+52
		expect(testStack.cards[55]).to.equal(0);
		expect(testStack.cards[55+51]).to.equal(51);
		expect(extraStack.cards).to.be.length(0);
		testStack.place(['foo','bar', 'baz'], 0);
		expect(testStack.cards).to.be.length(110);
		expect(testStack.cards[0]).to.equal('foo');
		expect(testStack.cards[1]).to.equal('bar');
		expect(testStack.cards[2]).to.equal('baz');
		testStack.place('buzz', 1);
		expect(testStack.cards).to.be.length(111);
		expect(testStack.cards[1]).to.equal('buzz');
		const lateCopy = [...testStack.cards];
		testStack.shuffle();
		expect(testStack.cards).to.have.members(lateCopy);
		expect(testStack.cards).to.not.equal(lateCopy);
	});

	it ('Draws from deck well', () => {
		const cards = freshDeck(52);
		const cardCopy = [...cards];
		const testStack = new DeckStack(cards);
		const drawStacks = [];

		for (let i=0; i < 5; i++) {
			drawStacks.push(testStack.draw());
			expect(drawStacks[i].cards).to.deep.equal([51-i]);
		}
		expect(testStack.cards).to.be.length(47);
		drawStacks.push(testStack.draw(5));
		expect(drawStacks[5].cards).to.deep.equal([42,43,44,45,46]);
		drawStacks.push(testStack.draw(3, 0));
		expect(drawStacks[6].cards).to.deep.equal([0,1,2]);
		testStack.draw(4, 1, drawStacks[0]);
		expect(drawStacks[0].cards).to.deep.equal([51,4,5,6,7]);

	});

});
