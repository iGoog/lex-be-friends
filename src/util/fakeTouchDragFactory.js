const fakeTouchDragFactory = () => {
	const point =  { x: 0, y: 0 };

	const _triggerFake = (type) => {
		const fakeDragoverEvent = new MouseEvent(type,
			{ clientX: point.x, clientY: point.y, bubbles: true, cancelable: true});
		document.elementFromPoint(point.x, point.y).dispatchEvent(fakeDragoverEvent);
	}
	const _updatePoint = (event) => {
		if (event.touches && event.touches[0]!=null) {
			const {clientX, clientY} = event.touches[0];
			point.x = clientX;
			point.y = clientY;
		}
	}
	/**
	 * Generates a fake event at a given location, with the intent of emulating drag
	 *
	 * use in a view component:
	 *
	 *      v-on:touchstart="fakedrag('dragstart', $event)"
     *      v-on:touchmove="fakedrag( 'dragover', $event)"
     *      v-on:touchend="fakedrag('drop', $event)"
     *      v-on:touchcancel="fakedrag('drop', $event)"
	 * @param type
	 * @param event
	 * @returns {boolean}
	 */
	const fakeDrag = (type, event) => {
		if (event) {
			event.stopPropagation();
			event.preventDefault();
			event.stopImmediatePropagation();
			_updatePoint(event);
		}
		_triggerFake(type);
		return false;
	}
	return fakeDrag;
}
export default fakeTouchDragFactory;
