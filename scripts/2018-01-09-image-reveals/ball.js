var ballAnimation = (function () {
    var state = {
        balls: []
    };

    var config = {
        splitChance: .01,
        minBallSize: 2,
        stepsPerStatUpdate: 10
    };

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

    function ballAction(currStepNum, srcImg) {
        if (state.balls.length == 0)
            createBall(0, 0, 3, 6, 12);

        //var srcImg = state.getCurrImage().p5Img;
        state.balls.forEach(
            b => {
				if (b.dead == false)
				{ //TODO cleanup of memory usage in future
				drawBall(b, srcImg);
				updateLocation(b);
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

			statOutput.text(`Currently ${state.balls.length} balls in memory. ${numDead} are dead`);
		}
	}



	//Create 2 new balls, destroy older ball
	function splitBall(ball) {
		ball.dead = true;
		createBallBasedOnOther(ball);
		createBallBasedOnOther(ball);
	}

	function drawBall(ball, srcImg) {
		var pixelColorVal = imageUtils.getPixel(ball.x, ball.y, srcImg);
		fill(pixelColorVal);
		ellipse(ball.x, ball.y, ball.r, ball.r);
	}

	function updateLocation(ball) {
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
			if (ball.y > height) {
				ball.y = 0;
			}
			if (ball.x < 0) {
				ball.x = height;
			}
		}
	}

	return {
		nextStep: ballAction
	};

})();