/// <reference types="cypress" />

import hiddenDeck from "../../src/model/hiddenDeck";

const freshDeck = (size) => {
	return [...Array(size).keys()]
}

describe('Unit test hidden deck', () =>  {
	it('Hid the deck', () => {
		let deckCopy = freshDeck(52);
		expect(deckCopy).to.be.length(52);
		hiddenDeck(deckCopy);
		expect(deckCopy).to.be.length(0);
	});
	it('Created a randomized deck of appropriate size', () => {
		const shuffledDeck = hiddenDeck(freshDeck(52));
		expect(shuffledDeck.deck).to.be.length(52);
		expect(shuffledDeck.deck[0]).is.a('string');
		for (let i=0; i < 20; i++) {
			const anotherShuffle =  hiddenDeck(freshDeck(52));
			expect(shuffledDeck.deck).to.not.equal(anotherShuffle.deck);
		}
	});

	it('Drawn cards are actually randomized.', () => {
		const indexes = freshDeck(52);
		const shuffledDeck = hiddenDeck(freshDeck(52));
		const drawnDeck = shuffledDeck.fn.drawByIndexes(indexes);
		expect(drawnDeck).to.have.members(indexes);
		for (let i=0; i < 20; i++) {
			const anotherShuffle =  hiddenDeck(freshDeck(52));
			expect(drawnDeck).to.not.equal(anotherShuffle.fn.drawByIndexes(indexes));
		}
	});

});
