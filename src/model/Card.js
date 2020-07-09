export default class Card {
	constructor(id, points, gameChar, hide=true, order = null) {
		this.id = id;
		this.points = points;
		this.gameChar = gameChar;
		this.hide = hide;
		this.order = order;
		this.status = 'ok';
	}
}
