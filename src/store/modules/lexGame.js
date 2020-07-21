import socket from '../../network/sock/index'
import createDeck from "../../model/lexBeFriends/createDeck";
import DeckStack from "../../model/DeckStack";
import {
	NULL_ID,
	stackGrabber,
	ZONE_DISCARD_PILE,
	ZONE_DRAW_PILE,
	ZONE_HELD_DISCARD,
	ZONE_PLAYER_HAND,
	ZONE_HELD_CARD
} from './lexGameConstants';

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
		myId: '1',
		secret: '',
		message: 'silence',
		channel: '',
		channelName: '',
		connected: false,
		playerStacks : {
			playerHand, heldCard, playerPlay, heldDiscard,
		},
		players : [
			{ emojii: '', name: '', turnOrder: 1, active: true, cards: 10, points: 0, id: '1', sharedSecret: '', ready: false, watching: false},
			{ emojii: 'heartbreak', name: 'DR. SBAITSO', turnOrder: 2, active: false, cards: 10, points: 0, id: 'x', sharedSecret: '', ready: true, watching: false},
			{ emojii: 'bomb', name: 'DOOOOOOOOM', turnOrder: 3, active: false, cards: 10, points: 0, id: 'y', sharedSecret: '', ready: true, watching: false}
		],
		table : {
			playFieldStacks : [],
			drawPile, discardPile,
		},
		mode : {
			isEditing: false,
			dropZone: {count: 0, zone: ''},
			startZone: {count: 0, zone: ZONE_PLAYER_HAND},
			nameSet: false,
			gameLaunched: false
		}
	};
};

const getters = {

};

const actions = {

	setReadyForGame({commit, state} ) {
		commit('setReadyForGame');
	},

	setUserName({commit, state}, {name, emojii}={}) {
		commit('setPlayerDetails', {name, emojii});
	},

	turnDrawFromZone({commit, state}, {fromZone=ZONE_DISCARD_PILE}={}) {
		if (fromZone===ZONE_DRAW_PILE) commit('flipCards', {zone:fromZone});
		setTimeout( ()=> {
			commit('pullCard', {zone:fromZone, toZone:ZONE_PLAYER_HAND});
			commit('placeCards', {zone:ZONE_DISCARD_PILE, fromZone: ZONE_HELD_DISCARD});
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

	setReadyForGame(state) {
		let allReady = true;
		state.players.forEach(value => {
			if(value.id == state.myId) value.ready = true;
			else if (!value.ready) allReady = false;
		});
		if (allReady) state.mode.gameLaunched = true;
	},
	setPlayerDetails(state, {name, emojii}={}) {
		state.players[0].emojii=emojii;
		state.players[0].name=name;
	},
	setMessage(state, message) {
		state.message = message;
	},
	setConnected(state, connected) {
		state.connected = connected;
	},
	shuffle(state, zone=ZONE_PLAYER_HAND) {
		stackGrabber(state, zone).shuffle();
	},
	flipCards(state, {zone=ZONE_DRAW_PILE, quantity=1}={}) {
		const stack = stackGrabber(state, zone).cards;
		for (let i=0; i < quantity && i < stack.length; i++) {
			stack[stack.length-1-i].hide = !stack[stack.length-1-i].hide;
		}
	},
	pullCard(state, {id, zone=ZONE_PLAYER_HAND, toZone = ZONE_HELD_CARD} = {}) {
		const targetZone = stackGrabber(state, toZone);
		if (id==null) {
			stackGrabber(state, zone).draw(1,null, targetZone);
		} else {
			stackGrabber(state, zone).drawById(id, targetZone);
		}
		if (toZone==ZONE_HELD_CARD) {
			state.mode.startZone.zone = zone;
			state.mode.startZone.count++;
		}

	},
	placeCards(state, {isBefore, id, zone=state.mode.startZone.zone, fromZone = ZONE_HELD_CARD}={}) {
		const targetStack = stackGrabber(state, zone);
		const fromStack = stackGrabber(state, fromZone);
		if (id==NULL_ID || id == null) {
			if (isBefore) targetStack.place(fromStack, 0);
			else targetStack.place(fromStack);
		} else {
			if (isBefore) targetStack.placeBefore(fromStack, id);
			else targetStack.placeAfter(fromStack, id);
		}

	},
	dropCard(state, zone=ZONE_PLAYER_HAND) {
		state.mode.dropZone.zone = zone;
		state.mode.dropZone.count++;
	},
	playToBoard(state) {
		const toPlayCards = state.playerStacks.playerPlay ;
		if (!state.mode.isEditing || toPlayCards.validateOrder() ) {
			for ( const [,stack] of Object.entries(state.playerStacks)) {
				stack.clearOrder();
			}
			toPlayCards.stash(state.table.playFieldStacks);


			state.mode.isEditing = false;
		}

	},
	editFromBoard(state, {editIndex=0}={}) {
		if (state.mode.isEditing) return;
		if (state.table.playFieldStacks.length <= editIndex) throw new Error('Unexpected board index');
		const playedWord = state.table.playFieldStacks.splice(editIndex, 1)[0];
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
