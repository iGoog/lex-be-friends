export default class DeckStack {
	constructor(cards, maxLength = cards.length*2) {
		this.cards = cards;
		this.maxLength = maxLength;
		this._randBuffer = this.maxLength < 256 ? new Uint8Array(this.maxLength) : new Uint16Array(this.maxLength);
	}

	_rand() {
		if (this.maxLength < this.cards.length) {
			this.maxLength = this.cards.length * 2;
			this._randBuffer = this.maxLength < 256 ? new Uint8Array(this.maxLength) : new Uint16Array(this.maxLength);
		}
		window.crypto.getRandomValues(this._randBuffer);
		return this._randBuffer;
	}

	/**
	 * Fisher–Yates shuffle the deck
	 * @returns {DeckStack}
	 */
	shuffle() {
		const { cards } = this;
		const buff = this._rand();
		for (let i=cards.length-1; i > 0; i--) {
			const j = buff[i] % (i+1);
			[cards[i], cards[j]] = [cards[j], cards[i]];
		}
		return this;
	}

	/**
	 * Place a card, deckStack of cards, or an array of cards into this stack.
	 * @param addCards - cards to be added to this stack and emptied
	 * @param position
	 * @returns {DeckStack}
	 */
	place(addCards, position=this.cards.length) {
		if (addCards instanceof DeckStack) addCards = addCards.cards;
		if (!Array.isArray(addCards)) addCards = [addCards];
		this.cards.splice.apply(this.cards, [position, 0].concat(
			addCards.splice(0, addCards.length)
		));
		return this;
	}

	/**
	 * Draw cards from the top (end) of the deckStack, or from position,
	 * and return a new deckStack or place them into targetStack
	 * @param cardsToDraw - (optional) number of cards to draw, default 1
	 * @param position - (optional) 0 based index of where to draw from
	 * @param targetStack - (optional) where to draw to.
	 * @returns {DeckStack} - the targetStack or a new deckStack
	 */
	draw(cardsToDraw=1, position, targetStack) {
		const { cards } = this;
		if (cardsToDraw > cards.length) {
			cardsToDraw= cards.length;
			position = 0;
		}
		if (!position) position = cards.length-cardsToDraw;
		if (position < 0) position = 0;
		const drawnCards = cards.splice(position, cardsToDraw);
		if (!targetStack) targetStack = new DeckStack(drawnCards);
		else targetStack.place(drawnCards)
		return targetStack;
	}

}
