
function setup() {
  createCanvas(windowWidth, S = windowHeight);
  H = S/2;
  angle = 0;
  pX = pY = H;
  legs = [];
  let d = H/4;
  let dR = PI/6;
  for(let r = PI/4; r < PI; r+= dR) {
    legs.push(createLeg(createVector(d).rotate(r), false));
    legs.push(createLeg(createVector(d).rotate(r*-1), true));
    d *= 1.1;
    dR *= 1.15;
  }
  fill(100);
}

function draw() {
  clear();
  if(dist(pX, pY, mouseX, mouseY) > 5) {
    angle = atan2(pY - mouseY, pX - mouseX);
  }
  pX += (mouseX - pX) * 0.005;
  pY += (mouseY - pY) * 0.005;
  let i = 0;
  legs.forEach(leg=>{
    leg.move(frameCount%40/10 == i%4);
    ++i;
  })
}

function createLeg(pos, isReverse) {
  return {
    pos,
    isReverse,
    targetX: H + pos.x,
    targetY: H + pos.y,
    footX: H + pos.x,
    footY: H + pos.y,
    segment1: createSegment(H + pos.x, H + pos.y, pos.mag()*0.75, H/40),
    segment2: createSegment(H, H, pos.mag()*0.3 + 3000/pos.mag(), H/40),
    move: function(isMove) {
      let p = this.pos.copy().rotate(angle);
      this.segment2.x = pX;
      this.segment2.y = pY;
      if(isMove && dist(this.footX, this.footY, pX + p.x, pY + p.y) > this.pos.mag()*0.4) {
        this.targetX = pX + p.x;
        this.targetY = pY + p.y;
      }
      this.footX += (this.targetX - this.footX) * 0.5;
      this.footY += (this.targetY - this.footY) * 0.5;
      let t = this.segment1.reach(this.footX, this.footY, this.segment2.angle, this.isReverse);
      this.segment2.reach(t.x, t.y);
      let pin = this.segment2.getPin();
      this.segment1.x = pin.x;
      this.segment1.y = pin.y;
      //fill(this.isReverse?255:100);
      this.segment1.view();
      this.segment2.view();
      //circle(pX + p.x, pY + p.y, 10);
    }
  };
}

function createSegment(x, y, w, h) {
  return {
    x, y, w, h, angle: 0,
    getPin: function() {
      x = this.x + cos(this.angle) * this.w;
        y = this.y + sin(this.angle) * this.w;
      return {x, y};
    },
    reach: function(x, y, a, isReverse) {
      let dx = x - this.x;
      let dy = y - this.y;
      let angle = atan2(dy, dx);
      if(a) {
        a = (angle - a + PI + TAU) % TAU;
        if(isReverse) {
          if(a > PI) {
            angle -= a - PI;
          }
        } else {
          if(a < PI) {
            angle -= a - PI;
          }
        }
      }
      this.angle = angle;
      let pin = this.getPin();
      let w = pin.x - this.x;
      let h = pin.y - this.y;
      let tx = x - w;
      let ty = y - h;
      return {x:tx, y:ty};
    },
    view: function() {
      push();
      translate(this.x, this.y);
      rotate(this.angle);
      rect(0, -this.h/2, this.w, this.h);
      pop();
    }
  };
}
/**/
