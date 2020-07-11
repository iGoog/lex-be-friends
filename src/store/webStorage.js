import gen128UIDArray from "../security/gen128UIDArray";

class MapStorage {
	constructor() {
		this.store = new Map();
	}
	clear() {
		this.store.clear();
	}
	getItem(key) {
		return this.store.get(key);
	}
	removeItem(key) {
		this.store.delete(key);
	}
	key(index) {
		let i=0;
		let result = null;
		this.store.forEach((value, key)=> {
			if (i++==index) result = key;
		});
		return result;
	}

	setItem(key, value) {
		this.store.set(key, value);
	}


}

const webStorageInit = () => {
	const store = window && window.localStorage ? window.localStorage : new MapStorage();
	const set = (key, value) => {
		store.setItem(key,JSON.stringify(value));
	}
	const get = (key) => {
		return JSON.parse(store.getItem(key));
	}
	const clear = () => store.clear();
	const remove = (key) => store.removeItem(key);
	const tag = (key) => {
		const id = gen128UIDArray(1)[0];
		set(key, id);
		return id;
	}
	return {get, set, clear, remove, tag};

};
const webStorage = webStorageInit();
export default webStorage;
