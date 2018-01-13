var colorRotationAnimation = (function() {

	var config = {
		stepsPerStatUpdate : 5,
		degreesPerUpdate : 3
	};

	//TODO memory profiling. Potentially dumping this
	var lookupMap = [];

	function nextStep(currStepNum, p5){
  
	  loadPixels();

	  if (currStepNum == 0) {
		for (var x = 0; x < p5.width; x++) {
		  var col = [];
		  for (var y = 0; y < p5.height; y++) {
			var pVals = imageUtils.getPixel(x, y, p5);
			var alpha = pVals[3];
			var hsl = rgbToHsl(pVals[0], pVals[1], pVals[2]);
			hsl.push(alpha);
			col.push(hsl);
		  }
		  lookupMap.push(col);
		}
	  }

	  for (var x = 0; x < p5.width; x++) {
		var col = lookupMap[x];
		for (var y = 0; y < p5.height; y++) {
		  //code before attempted optimization:

		  // var pVals = getPixel(x,y);
		  // var alpha = pVals[3];
		  //Seems terrible and inefficient, but probably better than creating a Color object to use hsl directly. Instead stick with
		  //setting the pixels manually, after we determine the rotation in hsl space.
		  //TODO confirm with some performance testing
		  // var hsla = rgbToHsl(pVals[0],pVals[1],pVals[2]);
		  // hsla.push(alpha);
		  var hsla = col[y];
		  hsla[0] = (hsla[0] + (config.degreesPerUpdate * currStepNum / 360)) % 1; //Degrees per step * step #
		  //Our conversion code works on a [0-> 1] range for hue
		  pVals = hslToRgb(hsla[0], hsla[1], hsla[2]);
		  imageUtils.setPixel(x, y, pVals[0], pVals[1], pVals[2], hsla[3]); //replace hsla[3] with alpha if rolling back from optimized
		}
		updatePixels();
	  }
	}
	
	function updateStats(currStepNum){
	  if (currStepNum % config.stepsPerStatUpdate == 0) {
		statOutput.text(`${currStepNum} iterations for a total of  ${currStepNum * config.degreesPerUpdate} degrees in 
		  ${(((new Date()).getTime() - globalState.startTime.getTime()) / 1000)} seconds`);
	  }

	}

	/**https://gist.github.com/mjackson/5311256
	 *https://stackoverflow.com/questions/2353211/hsl-to-rgb-color-conversion
	 * Converts an HSL color value to RGB. Conversion formula
	 * adapted from http://en.wikipedia.org/wiki/HSL_color_space.
	 * Assumes h, s, and l are contained in the set [0, 1] and
	 * returns r, g, and b in the set [0, 255].
	 *
	 * @param   {number}  h       The hue
	 * @param   {number}  s       The saturation
	 * @param   {number}  l       The lightness
	 * @return  {Array}           The RGB representation
	 */
	function hslToRgb(h, s, l) {
	  var r, g, b;

	  if (s == 0) {
		r = g = b = l; // achromatic
	  } else {
		var hue2rgb = function hue2rgb(p, q, t) {
		  if (t < 0) t += 1;
		  if (t > 1) t -= 1;
		  if (t < 1 / 6) return p + (q - p) * 6 * t;
		  if (t < 1 / 2) return q;
		  if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
		  return p;
		}

		var q = l < 0.5 ? l * (1 + s) : l + s - l * s;
		var p = 2 * l - q;
		r = hue2rgb(p, q, h + 1 / 3);
		g = hue2rgb(p, q, h);
		b = hue2rgb(p, q, h - 1 / 3);
	  }

	  return [Math.round(r * 255), Math.round(g * 255), Math.round(b * 255)];
	}
	/**
	 * Converts an RGB color value to HSL. Conversion formula
	 * adapted from http://en.wikipedia.org/wiki/HSL_color_space.
	 * Assumes r, g, and b are contained in the set [0, 255] and
	 * returns h, s, and l in the set [0, 1].
	 *
	 * @param   {number}  r       The red color value
	 * @param   {number}  g       The green color value
	 * @param   {number}  b       The blue color value
	 * @return  {Array}           The HSL representation
	 */
	function rgbToHsl(r, g, b) {
	  r /= 255, g /= 255, b /= 255;
	  var max = Math.max(r, g, b),
		min = Math.min(r, g, b);
	  var h, s, l = (max + min) / 2;

	  if (max == min) {
		h = s = 0; // achromatic
	  } else {
		var d = max - min;
		s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
		switch (max) {
		  case r:
			h = (g - b) / d + (g < b ? 6 : 0);
			break;
		  case g:
			h = (b - r) / d + 2;
			break;
		  case b:
			h = (r - g) / d + 4;
			break;
		}
		h /= 6;
	  }

	  return [h, s, l];
	}


	return {
		nextStep: nextStep
	};

})();