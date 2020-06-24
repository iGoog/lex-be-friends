const COMPLEXITY = Math.pow(2, 30);
// const peerRandom = (randoms) => {
// 	if (randoms==null|| randoms.length===0) return Math.random();
// 	else if (randoms.length===1) return randoms[0];
// 	else {
// 		let r = Math.floor(randoms[0] * COMPLEXITY);
// 		// xor (^) is commutative and associative
// 		for (let i=1; i < randoms.length; i++) {
// 			r ^= Math.floor(randoms[i] * COMPLEXITY);
// 		}
// 		return (r + .5) / COMPLEXITY;
// 	}
// };

const peerRandom = new Promise( (resolve, reject) => {

	resolve(Math.random());
});


export default peerRandom;
