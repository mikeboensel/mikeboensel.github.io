var config = {
  'splitChance': .01,
  'minBallSize': 2,
  'loopLimit': 420, //TODO call 'stepLimit' or 'numOfDesiredSteps'
  'revealTechnique': "balls",
  'validTechniques':['balls', 'points', 'colorRotation','partialImages'],
  'clearBetweenPics': false,
  'pointSpecifics': { //TODO consolidate into a single 'specifics' object w/ sub objects
    'numSamples': 400
  },
  'colorRotationSpecifics': {
    'degreesPerUpdate': 3
  },
  'canvasWidth': 300,
  'canvasHeight': 300
};

var state = {
  'i': 0, //TODO should be called currStep. Refactoring is hard in Atom. Do in better editor.
  'startTime': new Date(),
  'balls': [],
  //Start out w/ just reference to an image location (src).
  //On display we create P5Images (p5Img).
  'images': [],
  'addImage': function(src) {
    this.images.push({
      'src': src,
      'p5Img': ''
    });
  },
  'convertImage': function(index, p5Img) {
    //Overwrite our empty string or out of date (wrong dimensions) p5Img
    this.images[index]['p5Img'] = p5Img;
  },
  'currImagesIndex': 0,
  'incrementImageIndex': function() {
    this.currImagesIndex++;
    if (this.currImagesIndex >= this.images.length)
      currImagesIndex = 0;
  },
  'getNextImage': function() {
    this.incrementImageIndex();
    return this.getCurrImage();
  },
  'getCurrImage': function() {
    if (this.images.length == 0)
      alert('Error coding, no images, but request made');
    return this.images[this.currImagesIndex];
  }
};

function setup() {
	var x = 1;
  createCanvas(config.canvasWidth, config.canvasHeight);
  document.getElementById('canvasDiv').appendChild(canvas);
  state.addImage('/images/2018-01-09-image-reveals/Heli.JPG'); //DogPants.png
  loadAndScaleImage();
  noStroke();
  statOutput = $('#statOutput p');
  noLoop(); //wait for image to load
}
var statOutput;

function loadAndScaleImage() {
  var img = state.getCurrImage();
  var src = img.src;
  var p5 = img.p5Img;

  if (p5.name != 'p5.Image') {
    //Not initialized, do so now
    loadImage(img.src, function(newP5) {
      newP5.resize(width, 0);
      state.convertImage(state.currImagesIndex, newP5); //Took src ref and created image
      newP5.loadPixels();
      loop(); 
    });
  } else if (p5.width != canvas.width) { //Not properly scaled (we fit to width)
    p5.resize(width, 0);
    p5.loadPixels();
    loop();
  } else { //Loaded and sized appropriately. Ready for processing
    p5.loadPixels();
    loop();
  }
}

function draw() {
  if (state.getCurrImage().p5Img.name != 'p5.Image') {
    //If Image is not be loaded can't proceed. Wrong size, probably ok (boundary issues possible)
    //but is a valid image async will true that up. Going to go with it, might get some cool "noise"
    return;
  }

  switch (config.revealTechnique) {
    case 'balls':
      ballAction();
      break;
    case 'points':
      pointAction();
      break;
    case 'colorRotation':
      colorRotation();
      break;
    case 'partialImages':
      partialImagesAction();
      break;
    default:
      alert("Unknown option " + config.revealTechnique);
  }

  if (state.i >= config.loopLimit)
    noLoop();

  state.i++;
}
//Pointilism style sampling picture into existence
function pointAction() {
  sampleUnderlyingImage();

  var i = state.i;
  //Update stats
  if (i % 5 == 0) {
    statOutput.text(i + ' iterations for a total of ' + i * config['pointSpecifics']['numSamples'] + " samples in " +
      (((new Date()).getTime() - state['startTime'].getTime()) / 1000) + " seconds");
  }
}

function ballAction() {
  if (state.balls.length == 0)
    createBall(0, 0, 3, 6, 12);

  var srcImg = state.getCurrImage().p5Img;
  state.balls.forEach(
    b => {
      if (b.dead == false) { //TODO cleanup of memory usage in future
        drawBall(b, srcImg);
        updateLocation(b);
      }
    }
  );
  //Update stats
  if (state.i % 10 == 0) {
    var numDead = state.balls.map(b => {
      if (b.dead)
        return 1;
      return 0;
    }).reduce((acc, val) => acc + val);

    statOutput.text("Currently " + state.balls.length + " balls in memory. " +
      numDead + " are dead");
  }

}

function sampleUnderlyingImage() {
  loadPixels();
  //Batch, then update.
  for (var i = 0; i < config.pointSpecifics.numSamples; i++) {
    //TODO should be images dimensions in case we end up out of sync following resize
    var x = Math.floor(random(0, width - 1));
    var y = Math.floor(random(0, height - 1));
    // var c = img.get(x, y);
    //2-4 sec /1k batch
    //2min+, 40sec,20sec,20sec				/10k
    var imgSrc = getPixel(x, y, state.getCurrImage().p5Img);
    setPixel(x, y, imgSrc[0], imgSrc[1], imgSrc[2], imgSrc[3]);
  }

  updatePixels();
}

function setPixel(x, y, r, g, b, a) {
  var d = pixelDensity();
  for (var i = 0; i < d; i++) {
    for (var j = 0; j < d; j++) {
      // loop over
      idx = 4 * ((y * d + j) * width * d + (x * d + i));
      pixels[idx] = r; //img.pixels[idx];
      pixels[idx + 1] = g; //img.pixels[idx + 1];
      pixels[idx + 2] = b; //img.pixels[idx + 2];
      pixels[idx + 3] = a; //img.pixels[idx + 3];
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

function changeImage() {
  var v = document.getElementById("userProvidedImage");
  var l = state.images.length;

  if (v.files) {
    for (var i = 0; i < v.files.length; i++) {
      var file = v.files.item(i);
      if (file.type.search('image') == 0) //Any type that begins with 'image'
        state.addImage(URL.createObjectURL(file));
    }
  }
  if (state.images.length > l) {
    //Something was successfully uploaded. User wants to see, so let's display.
    state.incrementImageIndex();
    loadAndScaleImage();
    reset();
  }
}
//TODO not sure if we need this anymore.
function addImage() {
  var v = document.getElementById("userProvidedImage");
  if (v.files && v.files.length > 0) {
    var tempImageSrc = URL.createObjectURL(v.files[0]);
    //They are stored in temp location on localserver
    loadAndScaleImage(tempImageSrc);
    reset();
  }
}

function reset() {
  state.i = 0;
  state.balls = [];
  createBall(0, 0, 3, 6, 12);
  if (config.clearBetweenPics)
    clearScreen();
  loop();
}

//Shimmer effect to mix with another image in the future
//Expects 2 images, will alternate between them on different strips of the image
function partialImagesAction() {
  var p5 = state.getCurrImage().p5Img;
  background(255); //clear on drawing new frame
  loadPixels();
  //Draw only half the pixels, alternating even and odds
  var startPos = state.i % 2;
  for (var x = startPos; x < p5.width; x += 2) {
    for (var y = startPos; y < p5.height; y +2) {
      var pVals = getPixel(x, y, state.getCurrImage().p5Img);
      setPixel(x, y, pVals[0], pVals[1], pVals[2], pVals[3]);
    }
  }
  //Get the complementary startPos
  startPos++;
  startPos%=2;
  state.incrementImageIndex();
  for (var x = startPos; x < p5.width; x += 2) {
    for (var y = startPos; y < p5.height; y +2) {
      var pVals = getPixel(x, y, state.getCurrImage().p5Img);
      setPixel(x, y, pVals[0], pVals[1], pVals[2], pVals[3]);
    }
  }
  updatePixels();

}


//TODO memory profiling. Potentially dumping this
var lookupMap = [];

function colorRotation() {
  var p5 = state.getCurrImage().p5Img;
  loadPixels();

  if (state.i == 0) {
    for (var x = 0; x < p5.width; x++) {
      var col = [];
      for (var y = 0; y < p5.height; y++) {
        var pVals = getPixel(x, y, state.getCurrImage().p5Img);
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
      hsla[0] = (hsla[0] + (config.colorRotationSpecifics.degreesPerUpdate * state.i / 360)) % 1; //Degrees per step * step #
      //Our conversion code works on a [0-> 1] range for hue
      pVals = hslToRgb(hsla[0], hsla[1], hsla[2]);
      setPixel(x, y, pVals[0], pVals[1], pVals[2], hsla[3]); //replace hsla[3] with alpha if rolling back from optimized
    }
    updatePixels();
  }
  var i = state.i;
  //Update stats
  if (i % 5 == 0) {
    statOutput.text(i + ' iterations for a total of ' + i * config['colorRotationSpecifics']['degreesPerUpdate'] + " degrees in " +
      (((new Date()).getTime() - state['startTime'].getTime()) / 1000) + " seconds");
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



function clearScreen() {
  background(255);
}

function propertyUpdate(e) {
  if (e.srcElement.type == 'select-one') {
    var index = e.srcElement.selectedIndex;

    if (e.srcElement.name == 'revealTechnique') {
      config.revealTechnique = e.srcElement.options[index].value;
      reset();
    }
  }
}

function pause() {
  noLoop();
}

function play() {
  loop();
}
