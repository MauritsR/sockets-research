'use strict';

(function () {

	var socket = io();

	const emitToOthers = () => {
		console.log('emittt');
	};
	const emit1 = document.getElementById('socket1');
	emit1.addEventListener('click', emitToOthers, false);

})();
