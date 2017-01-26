'use strict';

(function () {

	const socket = io();
	let VIPSocket;
	const users = [];

	socket.on('newConnection', (message, id) => {
		console.log(message);
		users.unshift(id);
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

	const welcomeImageCanvas = document.getElementById('welcomeImageCanvas').getContext('2d');
	socket.on('welcomeImage', (data) => {
		if (data.image) {
			const img = new Image();
			img.src = `data:image/jpeg;base64,${data.buffer}`;
			img.onload = () => {
				welcomeImageCanvas.drawImage(img, 0, 0);
			};
		}
	});

	const emit6 = document.getElementById('sendToLastConnected');
	emit6.addEventListener('click', () => {
		socket.emit('sendToLastConnected', {
			message: `Hi, welcome user with id ${users[0]}, I am the user with id ${socket.id}`,
			target: users[0],
		});
	}, false);
	socket.on('sendToLastConnected', (msg) => {
		console.log(msg);
	});
})();
