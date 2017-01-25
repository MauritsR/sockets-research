'use strict';

(function () {

	var socket = io();
	var VIPSocket;

	socket.on('newConnection', (data) => {
		console.log(data);
	});

	// console.log(socket)

	socket.on('disconnectedClient', (data) => {
		console.log(data);
	});

	const emit1 = document.getElementById('emitMsgBack');
	emit1.addEventListener('click', () => {
		socket.emit('emitMsgBack', 'foo')
	}, false);
	socket.on('emitMsgBack', (msg) => {
		console.log(msg);
	});

	const emit2 = document.getElementById('emitToOthers');
	emit2.addEventListener('click', () => {
		socket.emit('emitToOthers', 'coolbeans')
	}, false);
	socket.on('emitToOthers', (msg) => {
		console.log(msg);
	});

	const emit3 = document.getElementById('connectToVIP');
	emit3.addEventListener('click', () => {
		VIPSocket = io('/VIP');
		VIPSocket.on('newVIP', (msg) => {
			console.log('a new VIP has connected', msg)
		});
		emit3.setAttribute('disabled', 'disabled');
		emit4.removeAttribute('disabled');
	}, false);

	const emit4 = document.getElementById('connectToAdminVIP');
	emit4.addEventListener('click', () => {
		VIPSocket.emit('joinAdminVIP');
		VIPSocket.on('adminJoined', (msg) => {
			console.log(msg);
		});
		emit4.setAttribute('disabled', 'disabled');
	}, false);

	const emit5 = document.getElementById('emitWithAck');
	emit5.addEventListener('click', () => {
		socket.emit('emitWithAck', 'interesting data from frontend', (dataFromBackend) => {
			console.log(dataFromBackend);
		});
	}, false);
})();
