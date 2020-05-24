
flies = [];

function preload() {
  bg = loadImage("bg.png");
  imgHae1 = loadImage("hae1.png");
  imgHae2 = loadImage("hae2.png");
}

function setup() {
  createCanvas(800, 600);
  
  for (let i = 0; i < 150; ++i) {
    let newFly = new Fly();
    newFly.init();
    flies.push(newFly);
  }
}

function draw() {
  clear();
  
  imageMode(CORNER);
  image(bg, 0, 0);
  
  imageMode(CENTER);
  flies.forEach(fly=>{
    for (let i = 0; i < fly.speed; ++i) {
      fly.move();
    }
    fly.draw();
  });
}

function mouseMoved() {
  flies.forEach(fly=>{
    fly.targetX = mouseX;
    fly.targetY = mouseY;
  });
}

class Fly {
  constructor() {
    this.x = 0;
    this.y = 0;
    this.targetX = 0;
    this.targetY = 0;
    this.t = 0;
    this.speed = 0;
    this.restTime = 0;
    this.isRestMove = false;
    this.state = 0;
  }
  
  init() {
    this.x = random(width*2) - width;
    this.y = random(height*2) - height;
    this.t = random(TAU);
    this.setSpeed();
    this.setTargetPos();
  }
  
  setSpeed() {
    this.speed = floor(random(5)) + 1;
  }
  
  setTargetPos() {
    this.targetX = random(width);
    this.targetY = random(height);
  }
  
  move() {
    if (this.restTime > 0) {
      if (this.isRestMove) {
        if (this.restTime%4 < 2) {
          this.state = 1;
        }
        if (this.restTime%100 == 0) {
          this.setSpeed();
          this.isRestMove = false;
          this.state = 0;
        }
      }
      if (this.restTime > 20 && this.restTime%20 == 0 && random(10) < 5) {
        this.isRestMove = true;
      } else {
        this.state = 0;
      }
      this.restTime--;
      return;
    }
    // 円軌道を描く為の式
    this.t += TAU / (dist(this.x, this.y, this.targetX, this.targetY) / cos( PI/2 - atan2(this.targetY - this.y, this.targetX - this.x) + this.t) * PI);
    this.x += cos(this.t);
    this.y += sin(this.t);
    
    if (abs(this.targetX - this.x) <= 1 && abs(this.targetY - this.y) <= 1) {
      this.setTargetPos();
      
      if (random(10) < 3) {
        this.restTime = floor(random(1000));
      }
    }
  }
  
  draw() {
    push();
    translate(this.x, this.y);
    rotate(this.t);
    switch(this.state) {
      case 0:
        image(imgHae1, 0, 0);
        break;
      case 1:
        image(imgHae2, 0, 0);
        break;
    }
    pop();
  }
}
