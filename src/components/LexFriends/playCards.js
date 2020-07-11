import {useStore} from "vuex";
import {reactive, ref, watch} from "vue";
import fakeTouchDragFactory from "../../util/fakeTouchDragFactory";
import {
	COMMIT_PLACE_CARD,
	COMMIT_PULL_CARD,
	NULL_ID,
	ZONE_PLAYER_HAND,
	stackGrabber,
	ZONE_HELD_CARD
} from '../../store/modules/lexGameConstants';
import {vmin, vw} from "../../util/cssConvert";

const setupPlayCards = (zone= ZONE_PLAYER_HAND,
                        opts = { hoverDelayMs:500,
                        }) => {
	const store = useStore();
	const moduleState = store.state.lexGame;

	const playCards = reactive(stackGrabber(moduleState, zone).cards);
	const heldCard = reactive(stackGrabber(moduleState, ZONE_HELD_CARD).cards);
	const hoverId = ref(NULL_ID);
	const hoverRight = ref(false);
	const dropZone = reactive(store.state.lexGame.mode.dropZone);
	watch(
		() => dropZone.count,
		(count, prevCount)=> {
			if (dropZone.zone!=zone) {
				hoverId.value = NULL_ID;
			} else {
			}
		}
	);

	const gutterCheck = (x, vwWidth = 100, cardWidth = 9.5) => {
		const cardsWidth = vmin((playCards.length+1)*cardWidth);
		const gutterWidth = (vw(vwWidth) - cardsWidth) / 2;
		// console.log(`gutterCheck ${x} ${gutterWidth} ${gutterWidth+ cardsWidth}`);
		return {
			leftGutter : x < gutterWidth,
			rightGutter : x > gutterWidth + cardsWidth
		}
	}

	let transitioned = true;
	const dragHover = (e, id) => {
		if (id==null) {
			const x = e.x ? e.x : e.clientX;
			const gutters = gutterCheck(x);
			if (gutters.leftGutter) {
				hoverId.value = NULL_ID;
				hoverRight.value = true;
			} else if (gutters.rightGutter) {
				hoverId.value = NULL_ID;
				hoverRight.value = false;
			}
		} else if (id != hoverId.value) {
			transitioned = false;
			hoverId.value = id;
			setTimeout(()=>transitioned=true, opts.hoverDelayMs);
		} else if (transitioned) {
			transitioned = false;
			hoverRight.value = !hoverRight.value;
			setTimeout(()=>transitioned=true, opts.hoverDelayMs);
		}
	}

	const draw = (id) => {
		store.commit(COMMIT_PULL_CARD, {id, zone});
	}
	const dropCard = (event) => {
		// console.log(`drop id: ${ hoverId.value} isBefore: ${(hoverId.value==NULL_ID) ? hoverRight.value : !hoverRight.value} zone: ${zone}`);
		store.commit(COMMIT_PLACE_CARD, {
			isBefore:  (hoverId.value==NULL_ID) ? hoverRight.value : !hoverRight.value,
			id: hoverId.value,
			zone
		});
		hoverId.value = NULL_ID;
		return false;
	}



	const fakedrag = fakeTouchDragFactory();

	const dragLeave = (event, id) => {
	}

	return { draw, dragHover, dropCard, fakedrag, dragLeave,
		hoverId, hoverRight, playCards, heldCard };
}
export default setupPlayCards;
