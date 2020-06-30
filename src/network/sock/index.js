import socketCluster from 'socketcluster-client';

const options = {
	hostname: 'localhost',
	secure: false,
	port: 8000,
	rejectUnauthorized: false // Only necessary during debug if using a self-signed certificate
};

const socket = socketCluster.create(options);
socket.connect();

export default socket;

//
// socket.transmit('customRemoteEvent', 123);
//
// (async () => {
// 	let result = await socket.invoke('customProc', {foo: 'bar'});
// 	console.log(result);
// 	// result will be 'Success'
// })();
