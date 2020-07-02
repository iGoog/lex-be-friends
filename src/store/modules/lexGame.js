import socket from '../../network/sock/index'
import createDeck from "../../model/lexBeFriends/createDeck";
import DeckStack from "../../model/DeckStack";
import * as g from './lexGameConstants';

const showFn = (card)=>card.hide=false;
const idFn = (card)=>card.id;
const hideFn = (card)=>card.hide=true;
const rawDeck = createDeck();
const drawPile = new DeckStack(rawDeck, rawDeck.length, idFn, hideFn).shuffle();
const discardPile = drawPile.draw(1,undefined, null, showFn);
const playerHand = drawPile.draw(10,undefined, null, showFn);
const heldCard = drawPile.draw(0,0, null, showFn);
const heldDiscard = drawPile.draw(0,0, null, showFn);
const playerPlay = drawPile.draw(0,0, null, showFn);
const stackMap = new Map();

stackMap.set(g.ZONE_DRAW_PILE, drawPile);
stackMap.set(g.ZONE_DISCARD_PILE, discardPile);
stackMap.set(g.ZONE_PLAYER_HAND, playerHand);
stackMap.set(g.ZONE_PLAYER_PLAY, playerPlay);
stackMap.set(g.ZONE_HELD_CARD, heldCard);
stackMap.set(g.ZONE_HELD_DISCARD, heldDiscard);



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
		drawPile: drawPile.cards,
		discardPile: discardPile.cards,
		playerHand : playerHand.cards,
		heldCard: heldCard.cards,
		playerPlay: playerPlay.cards,
		heldDiscard: heldDiscard.cards,
		stackMap
	},
	gui : {
		dropZone: {count: 0, zone: ''},
		fromZone: {count: 0, zone: ''}
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
	shuffleHand(state, zone=g.ZONE_PLAYER_HAND) {
		state.game.stackMap.get(zone).shuffle();
	},
	pullCard(state, {id, zone=g.ZONE_PLAYER_HAND}) {
		state.game.stackMap.get(zone).drawById(id, heldCard);
	},
	placeCard(state, {isBefore, id, zone=g.ZONE_PLAYER_HAND}) {
		const hand = state.game.stackMap.get(zone);
		const cardSelection = state.game.stackMap.get(g.ZONE_HELD_CARD);
		if (id==g.NULL_ID || id == null) {
			if (isBefore) hand.place(cardSelection, 0);
			else hand.place(cardSelection);
		} else {
			if (isBefore) hand.placeBefore(cardSelection, id);
			else hand.placeAfter(cardSelection, id);
		}

	},
	dropCard(state, zone=g.ZONE_PLAYER_HAND) {
		state.gui.dropZone.zone = zone;
		state.gui.dropZone.count++;
	},



};

export default {
	namespaced: true,
	state,
	getters,
	actions,
	mutations
}
