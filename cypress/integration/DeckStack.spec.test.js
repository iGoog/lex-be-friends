/// <reference types="cypress" />

import DeckStack from "../../src/model/DeckStack";

const freshDeck = (size) => {
	return [...Array(size).keys()]
}

describe('Unit tests for DeckStack', () => {
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
		expect(testStack.cards).to.be.length(55+52);
		expect(testStack.cards[55]).to.equal(0);
		expect(testStack.cards[55+51]).to.equal(51);
		expect(extraStack.cards).to.be.length(0);

	})

});
