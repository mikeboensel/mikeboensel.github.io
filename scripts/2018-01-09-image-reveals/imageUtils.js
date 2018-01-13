var imageUtils = (function (){

	//Operates implicitly on the Canvas object
	function setPixel(x, y, r, g, b, a) {
	  var d = pixelDensity();
	  for (var i = 0; i < d; i++) {
		for (var j = 0; j < d; j++) {
		  // loop over
		  idx = 4 * ((y * d + j) * width * d + (x * d + i));
		  pixels[idx] = r;
		  pixels[idx + 1] = g; 
		  pixels[idx + 2] = b; 
		  pixels[idx + 3] = a; 
		}
	  }
	}

	function getPixel(x, y, img) {
	  x = Math.floor(x);
	  y = Math.floor(y);
	  var d = img._pixelDensity;
	  var ret = [];
	  for (var i = 0; i < d; i++) {
		for (var j = 0; j < d; j++) {
		  // loop over
		  idx = 4 * ((y * d + j) * width * d + (x * d + i));
		  ret.push(img.pixels[idx]);
		  ret.push(img.pixels[idx + 1]);
		  ret.push(img.pixels[idx + 2]);
		  ret.push(img.pixels[idx + 3]);
		}
	  }
	  return ret;
	}

	return {
		getPixel : getPixel,
		setPixel : setPixel
	};
	
})();
