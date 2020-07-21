const words = (i) => ( import(`./words/${i}.js`) );
export const CHUNK_SIZE = 200;
export const CHUNKS = 956;

export const fetchWordPromise =  (rand, refStr = {value:null}) => {
	const i = rand % (CHUNK_SIZE * CHUNKS);
	return words(Math.floor(i/CHUNK_SIZE)).then( (wordArr) => {
		return refStr.value = wordArr.default[i%CHUNK_SIZE];
	});
}

const randWordsPromise = (wordCount, refStr = {value:null}) => {
	const uuidArrayNums = new Uint32Array(wordCount);
	window.crypto.getRandomValues(uuidArrayNums);
	const promiseWords = new Array(3);
	for (let i=0; i < wordCount; i++) {
		promiseWords[i] = fetchWordPromise(uuidArrayNums[i]);
	}
	return Promise.all(promiseWords).then((words) => {
		return refStr.value = words.reduce((acc, word)=> acc + '-' + word);
	} );
}
export default randWordsPromise;
