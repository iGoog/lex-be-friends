import { createRouter, createWebHistory } from "vue-router";
import TheHome from "./TheHome.vue";
import TheWhaleWordGame from "./TheWhaleWordGame.vue";

export const routerHistory = createWebHistory();

export const router = createRouter( {
	history: routerHistory,
	strict: true,
	routes: [
		{
			path: '/',
			name: 'home',
			component: TheHome
		},
		{
			path: '/whale-word-rummy',
			name: 'TheWhaleWordGame',
			component: TheWhaleWordGame
		}

	]
});
