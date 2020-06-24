import gen128UIDArray from "../security/gen128UIDArray";

const hiddenDeck = (hiddenCards) => {
	// let keyRef = 0;
	let publicHiddenCards = [];
	let hiddenLookup = new Map();

	const shuffleIn = (addedCards) => {
		const totalLength = addedCards.length+publicHiddenCards.length;
		const addedLength = addedCards.length;
		const typedArray =
			totalLength < 256 ? new Uint8Array(addedLength) : new Uint16Array(addedLength);
		window.crypto.getRandomValues(typedArray);
		const nextKeys = gen128UIDArray(addedLength);
		for (let i=0; i < addedLength; i++) {
			publicHiddenCards.splice((typedArray[i] % (publicHiddenCards.length+1)), 0, nextKeys[i]);
			hiddenLookup.set(nextKeys[i], addedCards.splice(0, 1)[0]);
		}
	}
	shuffleIn(hiddenCards);

	const spliceIn = (position, addedCards) => {
		for (let i=0; i < addedCards.length; i++) {
			const keyStr = (keyRef++).toString(36);
			publicHiddenCards.splice(position, 0, keyStr);
			hiddenLookup.set(keyStr, addedCards.splice(0, 1)[0]);
		}
	}

	const drawByIndexes = (indexes) => {
		const drawnCards = new Array(indexes.length);
		for (let i=0; i < indexes.length; i++) {
			const key = publicHiddenCards.splice(indexes[i]-i, 1)[0];
			drawnCards[i] = hiddenLookup.get(key);
			hiddenLookup.delete(key);
		}
		return drawnCards;
	}


	return {
		deck : publicHiddenCards,
		fn: {
			drawByIndexes,
			shuffleIn,
			spliceIn
		}

	}
}

export default hiddenDeck;
