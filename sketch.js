var button;
var balls = [];

var grav;
var bounceDamping = 0.9;
var airResistance = 0.99;
var standStilThreshold = 0.00001;

var nrOfBalls = 20;

function setup() {
  createCanvas(500, 500);
  strokeWeight(1);
  stroke(255, 204, 0);
  grav = 0.5;

  for (var i = 0; i < nrOfBalls; i++) {
    balls.push(new Ball());
  }

  gravSlider = createSlider(0, 100, 50);
}

function draw() {
  background(100);
  fill(255);

  for (var i = 0; i < balls.length; i++) {
    balls[i].updateSpeed();
    balls[i].detectCollision();
    balls[i].disp();
    // for (var j = 0; j < balls.length; j++){
    //   if (i != j){
    //     balls[i].intersect(balls[j]);
    //   }
    // }
  }
}


function Ball() {
  this.x = random(width);
  this.y = random(height/2);
  this.diameter = random(10, 30);
  this.vx = random(-5,5);
  this.vy = random(-1,5);
  this.xStopped = false;
  this.yStopped = false;

  this.updateSpeed = function(){
    grav = map(gravSlider.value(),0,100,0,1);

    if (!this.yStopped){
      this.vy += grav;
    }

    this.vx *= airResistance;
    if (abs(this.vx) < standStilThreshold && !this.xStopped) {
      this.vx = 0;
      // console.log("x stopped");
      this.xStopped = true;
    }
    this.vy *= airResistance;

    this.x += this.vx;
    this.y += this.vy;
  }

  this.detectCollision = function() {
    if(this.y > height - this.diameter / 2){ // bounce
      this.vy = -abs(this.vy * bounceDamping);
      this.y = height - this.diameter / 2;
      if (abs(this.vy) < standStilThreshold && !this.yStopped) {
        this.vy = 0;
        this.yStopped = true;
      }

    }

    if (this.y < this.diameter / 2){ // ceiling
      this.vy = abs(this.vy);
      this.y = this.diameter / 2;
    }

    if(this.x > width - this.diameter / 2){ // right wall
      this.vx = -abs(this.vx * bounceDamping);
      this.x = width - this.diameter / 2;
    }

    if(this.x < this.diameter / 2){ // left wall
      this.vx = abs(this.vx * bounceDamping);
      this.x = this.diameter / 2;
    }
  }

  // this.intersect = function(otherBall){
  //   var separation = dist(this.x,this.y,otherBall.x,otherBall.y);
  //   var sumRadii = (this.diameter + otherBall.diameter) / 2;
  //   if (separation <= sumRadii){
  //     this.vx *= -1;
  //     this.vy *= -1;
  //     otherBall.vx *= -1;
  //     otherBall.vy *= -1;
  //     return true;
  //   }
  //   return false;
  // }

  this.disp = function(){
    ellipse(this.x, this.y, this.diameter, this.diameter);
  }

};

function mousePressed(){
  for (var i=0; i<balls.length; i++) {
    //balls[i].vy -= 10 * (balls[i].y/height);
    balls[i].vx += random(-10,10);
    balls[i].vy += random(-10,10);
  }
}
