export default class Card {
	constructor(id, points, gameChar, hide=true) {
		this.id = id;
		this.points = points;
		this.gameChar = gameChar;
		this.hide = hide;
	}
}
