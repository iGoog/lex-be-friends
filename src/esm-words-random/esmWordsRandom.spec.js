import randWordsPromise, { fetchWordPromise, CHUNK_SIZE, CHUNKS } from './index';
const crypto = require('crypto');

Object.defineProperty(global.self, 'crypto', {
	value: {
		getRandomValues: arr => crypto.randomBytes(arr.length)
	}
});

describe('Tests random words', () => {
	let windowSpy;


	it('can fetch a word', () => {
		fetchWordPromise(500).then( (res)=> {
			expect(res).toBeDefined();
			expect(res.length).toBeGreaterThan(3);
		} )
	});
	it('will retrieve the first and last word', () => {
		fetchWordPromise(0).then( (res)=> {
			expect(res).toBeDefined();
			expect(res.length).toBeGreaterThan(3);
		} );
		fetchWordPromise(CHUNK_SIZE * CHUNKS).then( (res)=> {
			expect(res).toBeDefined();
			expect(res.length).toBeGreaterThan(3);
		} );
	})

	it('can generate unique words', () => {
		const words = new Array(500);
		for (let i=0; i < words.length; i++) {
			words[i] = randWordsPromise(3);
		}
		Promise.all(words, (resolvedWords)=> {
			expect(resolvedWords[0]).toContain('-');
			const wordsSet = new Set();
			resolvedWords.forEach( resolvedWord => {
				wordsSet.add(resolvedWord);
			} );
			expect(wordsSet.size).toEqual(resolvedWords.length);
		})
	});

});
