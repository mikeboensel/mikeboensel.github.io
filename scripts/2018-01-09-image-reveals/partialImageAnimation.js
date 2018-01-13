var partialImageAnimation = (function (){

	//Shimmer effect to mix with another image in the future
	//Expects 2 images, will alternate between them on different strips of the image
	function nextStep(p5_next, currStepNum, p5) {

		background(255); //clear on drawing new frame
		loadPixels();
		//Draw only half the pixels, alternating even and odds
		var startPos = state.i % 2;
		for (var x = startPos; x < p5.width; x += 2) {
			for (var y = startPos; y < p5.height; y +2) {
				var pVals = imageUtils.getPixel(x, y, p5);
				imageUtils.setPixel(x, y, pVals[0], pVals[1], pVals[2], pVals[3]);
			}
		}
		//Get the complementary startPos
		startPos++;
		startPos%=2;

		for (var x = startPos; x < p5.width; x += 2) {
			for (var y = startPos; y < p5.height; y +2) {
				var pVals = imageUtils.getPixel(x, y, p5_next);
				imageUtils.setPixel(x, y, pVals[0], pVals[1], pVals[2], pVals[3]);
			}
		}
		updatePixels();
		
		updateStats(currStepNum);
	}
	
	function updateStats(currStepNum){
		//TODO
	}
	return {
		nextStep: nextStep
	
	};
})();