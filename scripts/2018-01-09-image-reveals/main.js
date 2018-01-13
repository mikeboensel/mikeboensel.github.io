var config = {
  stepsPerImage: 520, 
  repeatImages : true,
  'revealTechnique': "balls",
  'validTechniques':['balls', 'points', 'colorRotation','partialImages'],
  'clearBetweenPics': false,
  resizeOnNewImageHeight : false //Resizing the canvas means losing the prior image painted
};

var globalState ={
	'startTime': new Date(),
	yOffset : 0
};

var state = {
  currStepNum: 0, 
  'startTime': new Date(),
  //Start out w/ just reference to an image location (src).
  //On display we create P5Images (p5Img).
  images: [],
  'addImage': function(src) {
    this.images.push({
      'src': src,
      'p5Img': '',
	  loadInProgress:false //Some race conditions possible, but we will handle elsewhere.
    });
  },
  'convertImage': function(index, p5Img) {
    //Overwrite our empty string or out of date (wrong dimensions) p5Img
    this.images[index]['p5Img'] = p5Img;
	this.images[index]['loadInProgress'] = false;//Update flag
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
	//Canvas initialization
	var width = $('.post').width()-60;
  //createCanvas(config.canvasWidth, config.canvasHeight);
  createCanvas(width, width);
  document.getElementById('canvasDiv').appendChild(canvas);

  state.addImage('/images/2018-01-09-image-reveals/Heli.JPG'); 	//Default image
  state.addImage('/images/2018-01-09-image-reveals/BadgerFight.jpg'); //Secondary image
  
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
  if (state.getCurrImage().p5Img.name != 'p5.Image'){
	if(state.getCurrImage().loadInProgress == false) {
	  state.getCurrImage().loadInProgress = true;
	  loadAndScaleImage();
		//TODO Handle image loaded, but scaled to wrong size in future. For now we assume its probably ok (boundary issues possible)
		// might get some cool "noise"
		return;
	}
	else{
		//Load in progress. Nothing to do but wait.
		return;
	}
  }

  var p5Img = state.getCurrImage().p5Img;
  
	if(state.currStepNum == 0){
		if (config.resizeOnNewImageHeight)// Resizing canvas to new image
			resizeCanvas(p5Img.width, p5Img.height);
		else//Calculate a y-offset so our X scaled image fits centered within the canvas
			globalState.yOffset = (height - p5Img.height)/2;
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
	  //TODO additionally, uses 2 images. Lot to consider in the flow of things given how different this one is.
	  animation = createPartialFunc(animation, state.getNextImage().p5Img);
      break;
    default:
      alert("Unknown option " + config.revealTechnique);
  }

  animation.nextStep(state.currStepNum, p5Img);
  
  if (state.currStepNum >= config.stepsPerImage){
	if(state.currImagesIndex < state.images.length - 1){
		//We have more images to go through
		state.incrementImageIndex();
		reset();
	}
	else{//Ran through requested numSteps for each image
		if(config.repeatImages){
			//We repeat from the beginning
			state.currImagesIndex = 0;
			reset();
		}
		else{
			//Done unless something changes (user uploads pic for example)
			noLoop();
		}
	}
  }
    

  state.currStepNum++;
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
    //Something was successfully uploaded. User wants to see, so let's display. Note they may have uploaded many images. We process the first and move on as needed.
    state.incrementImageIndex();
    loadAndScaleImage();
    reset();
  }
}

function reset() {
  state.currStepNum = 0;
  ballAnimation.clearState();
  //TODO Better method than this to dump state to save memory if switching animation techniques OR image
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