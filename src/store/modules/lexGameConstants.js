
const ZONE_DRAW_PILE = 'drawPile';
const ZONE_DISCARD_PILE = 'discardPile';
const ZONE_PLAYER_HAND = 'playerHand';
const ZONE_PLAYER_PLAY = 'playerPlay';
const ZONE_HELD_CARD = 'heldCard';
const ZONE_HELD_DISCARD = 'heldDiscard';
const ZONE_OUT_FIELD = 'outField';
const ZONE_PLAY_FIELD = 'playFieldStacks';

const COMMIT_DROP_CARD = 'lexGame/dropCard';
const COMMIT_PULL_CARD = 'lexGame/pullCard';
const COMMIT_PLACE_CARD = 'lexGame/placeCards';
const COMMIT_EDIT_FROM_BOARD = 'lexGame/editFromBoard';

const DISPATCH_TURN_DRAW_FROM_ZONE = 'lexGame/turnDrawFromZone';
const DISPATCH_TURN_PLAY = 'lexGame/turnPlay'

const NULL_ID = -500;

const stackGrabber = (moduleState, zone, {index=0}={})=> {
	switch (zone) {
		case ZONE_PLAYER_HAND:
		case ZONE_HELD_CARD:
		case ZONE_PLAYER_PLAY:
		case ZONE_HELD_DISCARD:
			return moduleState.playerStacks[zone];
		case ZONE_DRAW_PILE:
		case ZONE_DISCARD_PILE:
			return moduleState.table[zone];
		case ZONE_PLAY_FIELD:
			return moduleState.table.playFieldStacks[index];
	}
}

export { ZONE_DISCARD_PILE, ZONE_DRAW_PILE, ZONE_PLAYER_HAND, ZONE_PLAY_FIELD,
	ZONE_PLAYER_PLAY, ZONE_HELD_CARD, ZONE_OUT_FIELD, ZONE_HELD_DISCARD,
	COMMIT_DROP_CARD, COMMIT_PULL_CARD, COMMIT_PLACE_CARD, COMMIT_EDIT_FROM_BOARD,
	DISPATCH_TURN_DRAW_FROM_ZONE, DISPATCH_TURN_PLAY,
	NULL_ID,
	stackGrabber};
