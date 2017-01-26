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

	const welcomeImageCanvas = document.getElementById('welcomeImageCanvas').getContext('2d');
	socket.on('welcomeImage', (data) => {
		if (data.image) {
			const img = new Image();
			img.src = `data:image/jpeg;base64,${data.buffer}`;
			img.onload = () => {
				welcomeImageCanvas.drawImage(img, 0, 0);
			}
		}
	});

	const emit6 = document.getElementById('sendFile');
	emit6.addEventListener('click', () => {
		const fileReader = new FileReader();
		const selectedFile = document.getElementById('input').files[0];
		fileReader.addEventListener('loadend', () => {
			socket.emit('newFile', {
				image: true,
				buffer: fileReader.result.toString('base64')
			})
			// socket.emit('newFile', fileReader.result)
		});
		fileReader.readAsArrayBuffer(selectedFile);
	}, false);

	const uploadImageCanvas = document.getElementById('uploadImageCanvas').getContext('2d');
	socket.on('newFile', (file) => {
		const img = new Image();
		img.src = `data:image/jpeg;base64,${file.buffer}`;
		img.onload = () => {
			console.log(img)
			uploadImageCanvas.drawImage(img, 0, 0);
		};

		// const blob = new Blob([file], {type: "image/jpeg"});
		// const downloadReader = new FileReader();
		// downloadReader.addEventListener('loadend', () => {
		// 	console.log(downloadReader.result);
		// 	uploadImageCanvas.drawImage(downloadReader.result, 0, 0);
		// });
		// downloadReader.readAsArrayBuffer(blob);

		// const img = new Image();
		// img.src = `data:image/jpeg;base64,${file}`;
		// img.onload = () => {
		// 	uploadImageCanvas.drawImage(img, 0, 0);
		// };
		// console.log('we got a new file');
		// console.log(blob);
	})

})();
