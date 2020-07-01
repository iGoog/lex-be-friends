export default class DeckStack {
	constructor(cards, hideCards = false, maxLength = cards.length*2,
	            getIdFn = (card) => card) {
		this.cards = cards;
		this.maxLength = maxLength;
		this.hideCards = false;
		// if (hideCards) this.hide();
		this.getId = getIdFn;
		//TODO: manage hiding within DeckStack
	}

	_rand() {
		if (this._randBuffer == null || this.maxLength < this.cards.length) {
			if (this.maxLength < this.cards.length) this.maxLength = this.cards.length * 2;
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

	_coerceArray(cards) {
		if (cards instanceof DeckStack) cards = cards.cards;
		if (!Array.isArray(cards)) cards = [cards];
		return cards;
	}

	/**
	 * Place a card, deckStack of cards, or an array of cards into this stack.
	 * @param addCards - cards to be added to this stack and emptied
	 * @param position
	 * @returns {DeckStack}
	 */
	place(addCards, position=this.cards.length) {
		addCards = this._coerceArray(addCards);
		this.cards.splice.apply(this.cards, [position, 0].concat(
			addCards.splice(0, addCards.length)
		));
		return this;
	}

	placeBefore(addCards, cardId=null) {
		const { cards } = this;
		let position = cards.findIndex( (card) => this.getId(card)===cardId );
		if (position < 0) position = 0;
		return this.place(addCards, position);
	}

	placeAfter(addCards, cardId=null) {
		const { cards } = this;
		let position = cards.findIndex( (card) => this.getId(card)===cardId )+1;
		if (position == 0 || position > cards.length) position = cards.length;
		return this.place(addCards, position);
	}

	_deriveNewStack(drawnCards, maxLength = drawnCards.length*2) {
		return new DeckStack(drawnCards, this.hideCards, maxLength, this.getId);
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
		if (position==null) position = cards.length-cardsToDraw;
		if (position < 0) position = 0;
		const drawnCards = cards.splice(position, cardsToDraw);
		if (!targetStack) targetStack = this._deriveNewStack(drawnCards);
		else targetStack.place(drawnCards)
		return targetStack;
	}

	drawById(id, targetStack) {
		const { cards } = this;
		const position = cards.findIndex( (card) => this.getId(card)===id );
		if (position < 0) return this._deriveNewStack([]);
		const drawnCards = cards.splice(position, 1);
		console.log(`position ${position}`);
		console.log(drawnCards[0]);
		if (!targetStack) targetStack = this._deriveNewStack(drawnCards);
		else targetStack.place(drawnCards)
		return targetStack;
	}


}
