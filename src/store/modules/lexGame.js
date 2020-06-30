import socket from '../../network/sock/index'
import createDeck from "../../model/lexBeFriends/createDeck";
import DeckStack from "../../model/DeckStack";

const gameDeck = new DeckStack(createDeck()).shuffle();
const drawPile = gameDeck.draw();
const playerHand = gameDeck.draw(10);
const heldCard = new DeckStack([],false, 1);
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
	pullCardFromHand(state, index) {
		state.game.stackMap.get('playerHand').draw(1, index, heldCard);
	}

};

export default {
	namespaced: true,
	state,
	getters,
	actions,
	mutations
}
