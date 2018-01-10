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

//Create 2 new balls, destroy older ball
function splitBall(ball) {
  ball.dead = true;
  createBallBasedOnOther(ball);
  createBallBasedOnOther(ball);
}

function drawBall(ball, srcImg) {
  var v = getPixel(ball.x, ball.y, srcImg);
  fill(v);
  ellipse(ball.x, ball.y, ball.r, ball.r);
}

function updateLocation(ball) {
  if (random(0, 1) < config['splitChance'] && ball.r > config['minBallSize']) {
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
