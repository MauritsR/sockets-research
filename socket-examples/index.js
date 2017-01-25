const express = require('express');
const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http);
const port = process.env.PORT || 3000;

app.use(express.static(__dirname + '/public'));

// Default namespace
function onConnection(socket) {
	// console.log(socket.id)
	socket.broadcast.emit('newConnection', 'hi! Someone else has connected!');
	socket.on('emitMsgBack', (data) => socket.emit('emitMsgBack', `This was your message: ${data}`));
	socket.on('emitToOthers', (data) => socket.broadcast.emit('emitToOthers', `This was your message: ${data}`));
	socket.on('disconnect', () => socket.broadcast.emit('disconnectedClient', 'hi! Someone has disconnected!'))
}
io.on('connection', onConnection);

// Custom namespace
function onVIPConnection(socket) {
	socket.broadcast.emit('newVIP', 'VIP!');
	socket.on('joinAdminVIP', () => {
		socket.join('VIPAdmin');
		socket.to('VIPAdmin').emit('adminJoined', 'EMIT: new person has joined admin room in VIP namespace');
	});
}
const VIP = io.of('/VIP'); // Declare the custom namespace (unrelated to the URL)
VIP.on('connection', onVIPConnection);


http.listen(port, () => console.log('listening on port ' + port));
