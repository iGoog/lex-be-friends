import socket from '../../network/sock/index'
import createDeck from "../../model/lexBeFriends/createDeck";
import DeckStack from "../../model/DeckStack";
import * as g from './lexGameConstants';

const showFn = (card)=>card.hide=false;
const idFn = (card)=>card.id;
const hideFn = (card)=>card.hide=true;

const state = () => {
	const rawDeck = createDeck();
	const drawPile = new DeckStack(rawDeck, rawDeck.length, idFn, hideFn).shuffle();
	const discardPile = drawPile.draw(1,undefined, null, showFn);
	const playerHand = drawPile.draw(10,undefined, null, showFn);
	const heldCard = drawPile.draw(0,0, null, showFn);
	const heldDiscard = drawPile.draw(0,0, null, showFn);
	const playerPlay = drawPile.draw(0,0, null, showFn);
	return {
		message: 'silence',
		channel: '',
		channelName: '',
		connected: false,
		playerStacks : {
			drawPile, discardPile, playerHand,
			heldCard, playerPlay, heldDiscard,
		},
		playFieldStacks : [],
		mode : {
			isEditing: false,
			dropZone: {count: 0, zone: ''},
			startZone: {count: 0, zone: g.ZONE_PLAYER_HAND}
		}
	};
};

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
	shuffle(state, zone=g.ZONE_PLAYER_HAND) {
		state.playerStacks[zone].shuffle();
	},
	flipCards(state, {zone=g.ZONE_DRAW_PILE, quantity=1}={}) {
		const stack = state.playerStacks[zone].cards;
		for (let i=0; i < quantity && i < stack.length; i++) {
			console.log(stack[stack.length-1-i].hide);
			stack[stack.length-1-i].hide = !stack[stack.length-1-i].hide;
			console.log(stack[stack.length-1-i].hide);
		}
	},
	pullCard(state, {id, zone=g.ZONE_PLAYER_HAND, toZone = g.ZONE_HELD_CARD} = {}) {
		const targetZone = state.playerStacks[toZone];
		if (id==null) {
			state.playerStacks[zone].draw(1,null, targetZone);
		} else {
			state.playerStacks[zone].drawById(id, targetZone);
		}
		if (toZone==g.ZONE_HELD_CARD) {
			state.mode.startZone.zone = zone;
			state.mode.startZone.count++;
		}

	},
	placeCards(state, {isBefore, id, zone=state.mode.startZone.zone, fromZone = g.ZONE_HELD_CARD}={}) {
		const targetStack = state.playerStacks[zone];
		const fromStack = state.playerStacks[fromZone];
		if (id==g.NULL_ID || id == null) {
			if (isBefore) targetStack.place(fromStack, 0);
			else targetStack.place(fromStack);
		} else {
			if (isBefore) targetStack.placeBefore(fromStack, id);
			else targetStack.placeAfter(fromStack, id);
		}

	},
	dropCard(state, zone=g.ZONE_PLAYER_HAND) {
		state.mode.dropZone.zone = zone;
		state.mode.dropZone.count++;
	},
	playToBoard(state) {
		const toPlayCards = state.playerStacks[g.ZONE_PLAYER_PLAY] ;
		if (!state.mode.isEditing || toPlayCards.validateOrder() ) {
			toPlayCards.clearOrder();
			toPlayCards.stash(state.playFieldStacks);
			//TODO: clear all order
			state.mode.isEditing = false;
		}

	},
	editFromBoard(state, {editIndex=0}={}) {
		if (state.playFieldStacks.length <= editIndex) throw new Error('Unexpected board index');
		const playedWord = state.playFieldStacks.splice(editIndex, 1)[0];
		const {playerPlay, playerHand, heldCard } = state.playerStacks;
		playerHand.place(playerPlay);
		playerHand.place(heldCard);
		for (let i=0; i <playedWord.cards.length; i++) {
			playedWord.cards[i].order = i+1;
		}
		state.mode.isEditing = true;
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
