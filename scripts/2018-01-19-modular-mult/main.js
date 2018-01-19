 function setup() {
	//Canvas initialization
  var width = $('.post').width()-60;
  createCanvas(width, width);

  document.getElementById('canvasContainer').appendChild(canvas);
  [circX,circY,circRad] = [width/2, height/2, (width-100)/2];
}

var circX,circY,circRad;
var points = [];
var multFactors = [2];
var maxPoints = 200;
var minNumOfPoints = 5;

var desiredPoints = minNumOfPoints;

var stopAnimation = false;

var timeoutDuration = 500; //Start at 2fps
var limitFPS = true;

function draw(){
	if(stopAnimation)
		return;
	var startTime = new Date();
	
	if(points.length != desiredPoints){
		//Generate new points on circle
		var increment = 360/desiredPoints;

		points = [];
		
		for( var i = 0; i < desiredPoints; i++){
			var point = getPoint(i*increment);
			point.val = i;
			points.push(point);
			//ellipse(point.x, point.y, 10, 10);
		}
	}
	
	//Drawing from here on

	stroke(0);
	background(255);
	
	//Display our multiplier
	textSize(48);
	fill(255,0,0);
	text(multFactors[0] + 'x',35, 75);
	textSize(12);

	//Circle
	fill(255);
	ellipse(width/2, height/2, circRad*2, circRad*2);
	
	fill(0);

	for(var i = 0; i < points.length; i++){
		let currPt = points[i];
		//label points on the circle
		text(i, currPt.xText, currPt.yText);
		//calculate connecting lines
		for(let multFactor of multFactors){
			let indexToDrawLineTo = (currPt.val * multFactor) % points.length;
			let destPt = points[indexToDrawLineTo];
			line(currPt.x, currPt.y, destPt.x, destPt.y);
		}
	}
	
	//Decide on next iteration's values/time between
	desiredPoints++;
	if(desiredPoints > maxPoints){
		desiredPoints = minNumOfPoints;
		multFactors[0]++;
	}
	
	
	//Timeout + noLoop to rate limit us.
	if(limitFPS){
		setTimeout(
			function(){
				loop();
			}, 
			timeoutDuration
		);
		noLoop();
	}
		
	//Stats
	var millisRunning = (new Date()).getTime() - startTime.getTime();
	var fps = millisToFPS( millisRunning);
	
	console.log(`Drawing with ${desiredPoints} desiredPoints and ${multFactors[0]} X at ${fps} frames per second`);
}


function millisToFPS(m){
	return 1/(m /1000); // 1 second divided by (secs/frame) = frames per sec
}

function FPStoMillis(f){
	return (1/f) * 1000 ; 
}

function getPoint(degree){
	degree = degree/360 * 2 * PI;
	var x = 0;
	var xText = 0;
	if(degree > 90 && degree < 270){
		x = circX - cos(degree)*circRad;
		xText = circX - cos(degree)*(circRad + 15);
	}
	else{
		x = circX + cos(degree)*circRad;
		xText = circX + cos(degree)*(circRad + 15);
	}
	
	var y = 0;
	var yText = 0;
	if(degree < 180){
		y = circY - sin(degree)*circRad;
		yText = circY - sin(degree)*(circRad + 15);
	}
	else{
		y = circY + sin(degree)*circRad;
		yText = circY + sin(degree)*(circRad + 15);
	}
	
	return {x: x, y: y, xText: xText, yText: yText};
}

function pauseOrPlay(){
	stopAnimation = !stopAnimation;
	
	var ele = document.getElementById('playCtrl');
	if(ele.textContent === 'Play'){
		ele.textContent = 'Pause';
	}
	else{
		ele.textContent = 'Play';
	}
}

function updateLimit(){
	var v = document.getElementById('limitFrames');
	limitFPS = v.checked;
}

function updateMaxFrames(){
	var v = document.getElementById('maxFrames');
	var maxFrames = v.options[v.selectedIndex].value;
	timeoutDuration = FPStoMillis(maxFrames);
}

function reset(){
	desiredPoints = minNumOfPoints;
	multFactors = [2];
}


