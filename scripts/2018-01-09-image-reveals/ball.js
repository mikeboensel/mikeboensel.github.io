var ballAnimation = (function () {
    var state = undefined;

	function initializeState(){
		state = {
			balls: []
		};
	}
	initializeState();

    var config = {
        splitChance: .01,
		splitFactor: 2, //On split how many balls should result?
        minBallSize: 2,
		startingBallSize: 12,
        stepsPerStatUpdate: 10
    };

	//Ball X and Y are in source image's coordinate system (not canvas'). 
	//Since we scale to fit width, the X coords of both are the same, but Y are not.
    function createBall(x, y, vx, vy, r) {
        var ball = {};
        ball.x = x;
        ball.y = y;
        ball.vx = vx;
        ball.vy = vy;
        ball.r = r;
        ball.dead = false;
        state.balls.push(ball);
        return ball;
    }

    function createBallBasedOnOther(ball) {
        createBall(ball.x, ball.y, random(-3, 3), random(-3, 3), ball.r - 1);
    }
	
	function createRandomBall(srcImg){
		createBall(random(1, srcImg.width-1), random(1, srcImg.height-1), random(-3, 3), random(-3, 3), config.startingBallSize);
	}

    function ballAction(currStepNum, srcImg) {
        if (state.balls.length == 0)
			createRandomBall(srcImg);
            //createBall(0, 0, 3, -6, 12); 

        //var srcImg = state.getCurrImage().p5Img;
        state.balls.forEach(
            b => {
				if (b.dead == false)
				{ //TODO cleanup of memory usage in future
				drawBall(b, srcImg);
				updateLocation(b, srcImg);
			}
		});

    updateStats(currStepNum);

}

	function updateStats(currStepNum) {
		//Update stats
		if (currStepNum % config.stepsPerStatUpdate == 0) {
			var numDead = state.balls.map(b => {
				if (b.dead)
					return 1;
				return 0;
			}).reduce(
				(acc, val) => acc + val
				);

			statOutput.text(`Currently ${state.balls.length} balls in memory. ${numDead} are dead. Step #: ${currStepNum}`);
		}
		
		ctrls.movePlayHead(currStepNum);
	}


	//Create 2 new balls, destroy older ball
	function splitBall(ball) {
		ball.dead = true;
		for(var i = 0; i < config.splitFactor; i++){
			createBallBasedOnOther(ball);
		}
	}

	function drawBall(ball, srcImg) {
		var pixelColorVal = imageUtils.getPixel(ball.x, ball.y, srcImg);
		fill(pixelColorVal);
		var yOffset = (height - srcImg.height)/2; //To center image
		ellipse(ball.x, ball.y+yOffset, ball.r, ball.r);
	}

	function updateLocation(ball, srcImg) {
		if (random(0, 1) < config.splitChance && ball.r > config.minBallSize) {
			splitBall(ball);
		} else {
			ball.x += ball.vx;
			if (ball.x > width) {
				ball.x = 0;
			}
			if (ball.x < 0) {
				ball.x = width;
			}
			ball.y += ball.vy;
			if (ball.y > srcImg.height) {
				ball.y = 0;
			}
			if (ball.y < 0) {
				ball.y = srcImg.height;
			}
		}
	}

	return {
		nextStep: ballAction,
		clearState: initializeState
	};

})();
