import socket from '../../network/sock/index'
import createDeck from "../../model/lexBeFriends/createDeck";
import DeckStack from "../../model/DeckStack";

const rawDeck = createDeck();
const gameDeck = new DeckStack(rawDeck, false, rawDeck.length, (card)=>card.id).shuffle();
const drawPile = gameDeck.draw();
const playerHand = gameDeck.draw(10);
const heldCard = gameDeck.draw(0,0);
const stackMap = new Map();
stackMap.set('gameDeck', gameDeck);
stackMap.set('drawPile', drawPile);
stackMap.set('playerHand', playerHand);
stackMap.set('heldCard', heldCard);


// const game = {
// 	drawPile: gameDeck.cards,
// 	discardPile: drawPile.cards,
// 	playerHand : playerHand.cards,
// 	stackMap
// }

const state = () => ({
	message: 'silence',
	channel: '',
	channelName: '',
	connected: false,
	game : {
		drawPile: gameDeck.cards,
		discardPile: drawPile.cards,
		playerHand : playerHand.cards,
		heldCard: heldCard.cards,
		stackMap
	},
	gui : {
		dropZone: {count: 0, zone: ''}
	}
});

const getters = {

};

const actions = {
	connectSocket({commit, state}, options) {
		(async () => {
			let result = await socket.invoke('customProc', {foo: 'bar'});
			commit('setMessage', result);
		})();
	},
	joinRoom({ commit, state }, room) {
		if (state.connected) commit('setConnected', false);
		(async () => {
			let channel = socket.subscribe(room);
			commit('setConnected', true);
			try {
				channel.transmitPublish("some daata");
			} catch (error) { }
			for await (let data of channel) {
				console.log(data);
			}
		})();
		(async () => {
			let fooChannel = socket.channel(room);
			try {
				// Publish data; wait for an acknowledgement from the server.
				const resolved = await fooChannel.invokePublish('This is some more data');
				commit('setConnected', true);
				console.log(resolved);
			} catch (error) {
				// ... Handle potential error if server does not acknowledge before timeout.
				console.log(error)
			}
		})();
	}
};

const mutations = {
	setMessage(state, message) {
		state.message = message;
	},
	setConnected(state, connected) {
		state.connected = connected;
	},
	shuffleHand(state) {
		state.game.stackMap.get('playerHand').shuffle();
	},
	pullCardFromHand(state, id) {
		console.log(`pulling ${id}`);
		state.game.stackMap.get('playerHand').drawById(id, heldCard);
	},
	placeCardInHand(state, {isBefore, id}) {
		const hand = state.game.stackMap.get('playerHand');
		const cardSelection = state.game.stackMap.get('heldCard');
		if (isBefore) hand.placeBefore(cardSelection, id);
		else hand.placeAfter(cardSelection, id);
	},
	dropCard(state, zone) {
		state.gui.dropZone.zone = zone;
		state.gui.dropZone.count++;
	}


};

export default {
	namespaced: true,
	state,
	getters,
	actions,
	mutations
}
