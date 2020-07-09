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

const playField = [];

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
		stackMap,
		playField,
		isEditing: false
	},
	gui : {
		dropZone: {count: 0, zone: ''},
		startZone: {count: 0, zone: g.ZONE_PLAYER_HAND}
	}
});

const getters = {

};

const actions = {

	turnDrawFromZone({commit, state}, {fromZone=g.ZONE_DISCARD_PILE}={}) {
		if (fromZone===g.ZONE_DRAW_PILE) commit('flipCards', {zone:fromZone});
		setTimeout( ()=> {
			commit('pullCard', {zone:fromZone, toZone:g.ZONE_PLAYER_HAND});
			commit('placeCards', {zone:g.ZONE_DISCARD_PILE, fromZone: g.ZONE_HELD_DISCARD});
		}, 700 );

	},
	turnPlay({commit, state}) {
		commit('playToBoard');
	},
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
	flipCards(state, {zone=g.ZONE_DRAW_PILE, quantity=1}={}) {
		const stack = state.game.stackMap.get(zone).cards;
		for (let i=0; i < quantity && i < stack.length; i++) {
			console.log(stack[stack.length-1-i].hide);
			stack[stack.length-1-i].hide = !stack[stack.length-1-i].hide;
			console.log(stack[stack.length-1-i].hide);
		}
	},
	pullCard(state, {id, zone=g.ZONE_PLAYER_HAND, toZone = g.ZONE_HELD_CARD} = {}) {
		const targetZone = state.game.stackMap.get(toZone);
		if (id==null) {
			state.game.stackMap.get(zone).draw(1,null, targetZone);
		} else {
			state.game.stackMap.get(zone).drawById(id, targetZone);
		}
		if (toZone==g.ZONE_HELD_CARD) {
			state.gui.startZone.zone = zone;
			state.gui.startZone.count++;
		}

	},
	placeCards(state, {isBefore, id, zone=state.gui.startZone.zone, fromZone = g.ZONE_HELD_CARD}={}) {
		const hand = state.game.stackMap.get(zone);
		const cardSelection = state.game.stackMap.get(fromZone);
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
	playToBoard(state) {
		const toPlayCards = state.game.stackMap.get(g.ZONE_PLAYER_PLAY);
		if (!state.game.isEditing || toPlayCards.validateOrder() ) {
			toPlayCards.clearOrder();
			toPlayCards.stash(state.game.playField);
			//TODO: clear all order
			state.game.isEditing = false;
		}

	},
	editFromBoard(state, {editIndex=0}={}) {
		if (playField.length <= editIndex) throw new Error('Unexpected board index');
		const playedWord = playField.splice(editIndex, 1)[0];
		console.log(playField.length);
		const playerPlay = state.game.stackMap.get(g.ZONE_PLAYER_PLAY);
		const playerHand = state.game.stackMap.get(g.ZONE_PLAYER_HAND);
		const heldCard = state.game.stackMap.get(g.ZONE_HELD_CARD);
		playerHand.place(playerPlay);
		playerHand.place(heldCard);
		for (let i=0; i <playedWord.cards.length; i++) {
			playedWord.cards[i].order = i+1;
		}
		state.game.isEditing = true;
		playerPlay.place(playedWord);
	}


};

export default {
	namespaced: true,
	state,
	getters,
	actions,
	mutations
}
