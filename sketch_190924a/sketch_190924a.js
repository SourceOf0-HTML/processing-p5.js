function setup() {
  createCanvas(S=500, S);
  H = S/2;
  R = S/5;
  P = 10;
  pins = [];
  for(y = 0; y < P; ++y) {
    for(x = 0; x < P; ++x) {
      pins[x+y*P] = pin((x+0.5)/P*S, (y+0.5)/P*S);
    }
  }
}

function draw() {
  clear();
  pins.some(T=>{
    if(T.f) {
      T.x = mouseX;
      T.y = mouseY;
    } else {
      spring(T);
    }
    strokeWeight(1);
    circle(T.x, T.y, 2);
  });
}

function mousePressed() {
  pins.forEach(T=>{
    if(dist(T.x, T.y, mouseX, mouseY) < R) {
      T.f = 1;
    }
  });
}

function mouseReleased() {
  pins.forEach(T=>T.f=0);
}

pin=(x, y)=>({
  x,
  y,
  vx : 0,
  vy : 0,
  f  : 0
});

function spring(A) {
  pins.some(B=>{
    distance = dist(A.x, A.y, B.x, B.y);
    if(distance < R && A != B) {
      M = 1 - distance/R;
      N = M * 0.01;
      F = 0.97;
      angle = atan2(B.y - A.y, B.x - A.x);
      tx = B.x - cos(angle) * R;
      ty = B.y - sin(angle) * R;
      A.vx += (tx - A.x) * N;
      A.vy += (ty - A.y) * N;
      A.x += A.vx *= F;
      A.y += A.vy *= F;
      A.x = constrain(A.x,0,S);
      A.y = constrain(A.y,0,S);
      strokeWeight(M*2);
      line(A.x, A.y, B.x, B.y);
    }
  });
}
/**/
