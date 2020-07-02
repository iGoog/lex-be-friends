import {useStore} from "vuex";
import {reactive, ref, watch} from "vue";
import fakeTouchDragFactory from "../../compatability/fakeTouchDragFactory";
import * as g from '../../store/modules/lexGameConstants';

const setupPlayCards = (zone= g.ZONE_PLAYER_HAND, hoverDelayMs=500) => {
	const store = useStore();

	const playCards = reactive(store.state.lexGame.game[zone]);
	const heldCard = reactive(store.state.lexGame.game.heldCard);
	const hoverId = ref(-500);
	const hoverRight = ref(false);
	const dropZone = reactive(store.state.lexGame.gui.dropZone);
	watch(
		() => dropZone.count,
		(count, prevCount)=> {
			if (dropZone.zone!=zone) {
				hoverId.value = -500;
			} else {
			}
		}
	);
	const dragExit = (msg) => {
		hoverId.value = -500
	}
	let transitioned = true;
	const dragHover = (e, id) => {
		if (id != hoverId.value) {
			transitioned = false;
			hoverId.value = id;
			setTimeout(()=>transitioned=true, hoverDelayMs);
		} else if (transitioned) {
			transitioned = false;
			hoverRight.value = !hoverRight.value;
			setTimeout(()=>transitioned=true, hoverDelayMs);
		}


	}

	const draw = (id) => {
		store.commit(g.COMMIT_PULL_CARD, {id, zone});
	}
	const dropCard = () => {
		store.commit(g.COMMIT_PLACE_CARD, {
			isBefore: !hoverRight.value,
			id: hoverId.value,
			zone
		});
		hoverId.value = -500;
		return false;
	}



	const fakedrag = fakeTouchDragFactory();

	return { draw, dragHover, dragExit, dropCard, fakedrag,
		hoverId, hoverRight, playCards, heldCard };
}
export default setupPlayCards;
