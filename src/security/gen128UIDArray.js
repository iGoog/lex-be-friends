const gen128UIDArray = (n) => {
	const uuidArrayNums = new Uint32Array(4*n);
	window.crypto.getRandomValues(uuidArrayNums);
	const result = new Array(n);
	for (let i=0; i <4*n; i+=4) {
		result[i/4] = `${uuidArrayNums[i].toString(36)}-${uuidArrayNums[i+1].toString(36)}-${uuidArrayNums[i+2].toString(36)}-${uuidArrayNums[i+3].toString(36)}`;
	}
	return result;
}
export default gen128UIDArray;
