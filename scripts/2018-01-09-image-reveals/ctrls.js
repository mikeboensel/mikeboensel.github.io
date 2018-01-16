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

	function addToCarousel(imgSrc){
		var tag = 
		`<div class='carouselImgContainer'>
			<span class='imgDeleteIcon'>X</span>
			<img src="${imgSrc}" onclick="ctrls.changeActiveImage(this, event)"/>
		</div>`;
		
		$('#imageCarousel').append($.parseHTML(tag));
	}
	
	function changeActiveImage(it, event){
		console.log(it + event);
	}
	
	function removeImage(it, event){
		
	}
	
	function saveImage(){
		saveCanvas();
	}
	
	var WIDTH_OF_IMG = 107; //Currently 100px wide + 7px margin (only on right)
	
	function movePlayHead(currStep){
		var percentComplete = currStep/config.stepsPerImage;
				
		var offset = (state.currImagesIndex + percentComplete) * WIDTH_OF_IMG;
		
		$('#playHead').get(0).style.left = offset + 'px';
	}
	
	//TODO terrible name. Couldn't come up with a better one Terrible pattern. Trying to move away from globals
	//I think this should really be called UI.js. Needs access to state/config
	var looperState = undefined; 
	var looperConfig = undefined; 
	
	function bindState(state){
		if(looperState){
			return; //Can only bind once.
		}
		looperState = state;
	}
	
	function bindConfig(config){
		if(looperConfig){
			return; //Can only bind once.
		}
		looperConfig = config;
	}
	

	return {
		clearScreen : clearScreen,
		pause : pause,
		play : play,
		addToCarousel: addToCarousel,
		changeActiveImage: changeActiveImage,
		removeImage: removeImage,
		movePlayHead: movePlayHead, 
		bindState : bindState,
		bindConfig : bindConfig,
		saveImage: saveImage
	};
})();