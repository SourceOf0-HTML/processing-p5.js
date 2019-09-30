function setup() {
  createCanvas(S=500,S);
  H = S/2;
  R = H/3;
  p = [];
  t = 0;
}

function draw() {
  background(255);
  circle(H,H,3);
  
  a = 0;
  p[0] = (sin(t)+1)*PI/2;
  a += p[0];
  p[1] = (sin(t)+1)*(PI-a)/2;
  a += p[1];
  p[2] = (sin(t)+1)*(TAU-a)/2;
  t += 0.005;

  o = createVector(H,H);
  setTile();
  R*=-1;
  translate(createVector(R).rotate(p[0]+p[1]+p[2]));
  setTile();
  R*=-1;
}

function setTile() {
  push();
  fill(100);
  translate(createVector(-R).rotate(p[0]+p[1]+p[2]));
  setRect(1);
  translate(createVector(R).rotate(p[0]));
  setRect(-1);
  translate(createVector(-R).rotate(p[0]+p[1]+p[2]));
  setRect(1);
  translate(createVector(R).rotate(p[0]));
  setRect(-1);
  translate(createVector(-R).rotate(p[0]+p[1]+p[2]));
  setRect(1);
  translate(createVector(R).rotate(p[0]));
  setRect(-1);
  translate(createVector(-R).rotate(p[0]+p[1]+p[2]));
  setRect(1);
  translate(createVector(R).rotate(p[0]));
  setRect(-1);
  pop();
  
  push();
  fill(50);
  translate(createVector(R).rotate(p[0]+p[1]));
  setRect(-1);
  translate(createVector(-R).rotate(p[0]));
  setRect(1);
  translate(createVector(R).rotate(p[0]+p[1]+p[2]));
  setRect(-1);
  translate(createVector(-R).rotate(p[0]));
  setRect(1);
  translate(createVector(R).rotate(p[0]+p[1]+p[2]));
  setRect(-1);
  translate(createVector(-R).rotate(p[0]));
  setRect(1);
  translate(createVector(R).rotate(p[0]+p[1]+p[2]));
  setRect(-1);
  translate(createVector(-R).rotate(p[0]));
  setRect(1);
  pop();
  
}
function setRect(d) {
  beginShape();
  vertex(o.x,o.y);
  v = createVector(R);
  for(i=0;i<3;++i) {
    v.rotate(p[i]);
    vertex(o.x+v.x*d,o.y+v.y*d);
  }
  endShape(CLOSE);
}
/**/
