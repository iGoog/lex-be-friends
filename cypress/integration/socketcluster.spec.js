/// <reference types="cypress" />

import store from '../../src/store/index'


it('ok', () => {
	console.log(store.state.lexGame.message);
	store.dispatch('lexGame/connectSocket');

})
