
function setup() {
  createCanvas(S=500,S);
  H=S/2;
  segment = [];
  for(n=0;n<13;++n) {
    segment[n] = createSegment(0,0,n%2*0.5+0.1);
  }
  segment[n-1].x = H;
  segment[n-1].y = H;
}

function draw() {
  clear();
  textSize(H/8);
  textAlign(CENTER, BOTTOM);
  text("世の中",H,H);
  t = reach(segment[0], mouseX, mouseY);
  for(i=1;i<n;++i) {
    t = reach(segment[i], t.x, t.y);
  }
  for(i=n-1;i>0;--i) {
    p = getPin(segment[i]);
    segment[i-1].x = p.x;
    segment[i-1].y = p.y + abs(cos(segment[i-1].angle));
  }
  for(i=0;i<n;++i) {
    view(segment[i]);
  }
}

function createSegment(x,y,d) {
  return {
    x: x,
    y: y,
    w: w=H/15,
    h: w*d,
    angle: 0
  };
}

function view(T) {
  push();
  noFill();
  strokeWeight(T.w/10);
  translate(T.x,T.y);
  rotate(T.angle);
  rect(0,-T.h/2,T.w,T.h,3);
  pop();
}

function reach(T,x,y) {
  dx = x - T.x;
  dy = y - T.y;
  T.angle = atan2(dy,dx);
  pin = getPin(T);
  w = pin.x - T.x;
  h = pin.y - T.y;
  tx = x - w;
  ty = y - h;
  return {x:tx, y:ty};
}

function getPin(T) {
  x = T.x + cos(T.angle) * T.w * 0.8;
  y = T.y + sin(T.angle) * T.w * 0.8;
  return {x:x, y:y};
}
/**/
