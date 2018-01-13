var ctrls = (function (){
	function clearScreen() {
	  background(255);
	}

	function pause() {
		noLoop();
	}

	function play() {
	  loop();
	}
	return {
		clearScreen : clearScreen,
		pause : pause,
		play : play
	};
})();