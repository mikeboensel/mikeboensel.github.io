//Pointilism style sampling picture into existence
var pointAnimation = (function(){
	
	var config = {
		stepsPerStatUpdate: 10,
		numSamples: 400
	};
	
	function pointAction(currStepNum, srcImg) {
		sampleUnderlyingImage(srcImg);
		updateStats(currStepNum);
	}

	function sampleUnderlyingImage(srcImg) {
	  loadPixels();
	  //Batch, then update.
	  for (var i = 0; i < config.numSamples; i++) {
		//TODO should be images dimensions in case we end up out of sync following resize
		var x = Math.floor(random(0, width - 1));
		var y = Math.floor(random(0, height - 1));
		// var c = img.get(x, y);
		//2-4 sec /1k batch
		//2min+, 40sec,20sec,20sec				/10k
		var pixelVal = imageUtils.getPixel(x, y, srcImg);
		imageUtils.setPixel(x, y, pixelVal[0], pixelVal[1], pixelVal[2], pixelVal[3]);
	  }

	  updatePixels();
	}

	function updateStats(currStepNum){
		  
		  //TODO cleanup. Maybe stick with global state to ease constant passing in methods
	  if (currStepNum % config.stepsPerStatUpdate == 0) {
		statOutput.text(`${currStepNum} iterations for a total of ${currStepNum * config.numSamples} samples in 
		  ${(((new Date()).getTime() - globalState.startTime.getTime()) / 1000)} seconds`);
	  }
	}

	return {
		nextStep : pointAction
	};
})();




