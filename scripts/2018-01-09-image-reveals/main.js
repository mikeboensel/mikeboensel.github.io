var config = {
  'loopLimit': 420, //TODO call 'stepLimit' or 'numOfDesiredSteps'
  'revealTechnique': "balls",
  'validTechniques':['balls', 'points', 'colorRotation','partialImages'],
  'clearBetweenPics': false,
  'canvasWidth': 300,
  'canvasHeight': 300
};

var globalState ={
	'startTime': new Date()
};

var state = {
  'i': 0, //TODO should be called currStep. Refactoring is hard in Atom. Do in better editor.
  'startTime': new Date(),
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
	
	var width = $('.post').width()-60;
  //createCanvas(config.canvasWidth, config.canvasHeight);
  createCanvas(width, width);
  document.getElementById('canvasDiv').appendChild(canvas);
  state.addImage('/images/2018-01-09-image-reveals/Heli.JPG'); //DogPants.png
  loadAndScaleImage();
  noStroke();
  statOutput = $('#statOutput code');
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

  //Interface. Draw and stats methods
  var animation = undefined;

  switch (config.revealTechnique) {
    case 'balls':
      animation = ballAnimation;
      break;
    case 'points':
      animation = pointAnimation;
      break;
    case 'colorRotation':
	  animation = colorRotationAnimation;
      break;
    case 'partialImages':
	  animation = partialImagesAction; //TODO requires additional argument, JS partial?
	  animation = createPartialFunc(animation, state.getNextImage().p5Img);
      break;
    default:
      alert("Unknown option " + config.revealTechnique);
  }

  animation.nextStep(state.i, state.getCurrImage().p5Img);
  
  if (state.i >= config.loopLimit)
    noLoop();

  state.i++;
}

//TODO test this method
function createPartialFunc(func, ...argsBound) {
  return function(...args) { // (*)
    return func.call(this, ...argsBound, ...args);
  }
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
  //TODO dump state to save memory if switching animation techniques
  if (config.clearBetweenPics)
    ctrls.clearScreen();
  loop();
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