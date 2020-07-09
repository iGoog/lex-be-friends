
const ZONE_DRAW_PILE = 'drawPile';
const ZONE_DISCARD_PILE = 'discardPile';
const ZONE_PLAYER_HAND = 'playerHand';
const ZONE_PLAYER_PLAY = 'playerPlay';
const ZONE_HELD_CARD = 'heldCard';
const ZONE_HELD_DISCARD = 'heldDiscard';
const ZONE_OUT_FIELD = 'outField';

const COMMIT_DROP_CARD = 'lexGame/dropCard';
const COMMIT_PULL_CARD = 'lexGame/pullCard';
const COMMIT_PLACE_CARD = 'lexGame/placeCards';
const COMMIT_EDIT_FROM_BOARD = 'lexGame/editFromBoard';

const DISPATCH_TURN_DRAW_FROM_ZONE = 'lexGame/turnDrawFromZone';
const DISPATCH_TURN_PLAY = 'lexGame/turnPlay'

const NULL_ID = -500;

export { ZONE_DISCARD_PILE, ZONE_DRAW_PILE, ZONE_PLAYER_HAND,
	ZONE_PLAYER_PLAY, ZONE_HELD_CARD, ZONE_OUT_FIELD, ZONE_HELD_DISCARD,
	COMMIT_DROP_CARD, COMMIT_PULL_CARD, COMMIT_PLACE_CARD, COMMIT_EDIT_FROM_BOARD,
	DISPATCH_TURN_DRAW_FROM_ZONE, DISPATCH_TURN_PLAY,
	NULL_ID};
