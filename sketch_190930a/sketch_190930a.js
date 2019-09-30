function setup() {
  createCanvas(S=500,S);
  H=S/2;
  R=H/3;
  N=30;
  t=0;
}

function draw() {
  p = [];
  p[0] = createVector();
  r=noise(t)*R+1;
  p[1] = createVector(r).rotate(a=noise(t+3)*(PI)).sub(r);
  r=noise(t+1)*R+1;
  p[2] = createVector(r).rotate(a+=noise(t+4)*(PI-a)).sub(r);
  r=noise(t+2)*R+1;
  p[3] = createVector(r).rotate(TAU-a).sub(r);
  t+=0.005;
  
  background(255);
  o = createVector(H,H);
  setTile();
  for(k=0;k<N;++k) {
    o.add(p[2].x,p[2].y);
    setTile();
  }
  o = createVector(H,H);
  for(k=0;k<N;++k) {
    o.sub(p[2].x,p[2].y);
    setTile();
  }
}

function setTile() {
  push();
  fill(255);
  for(j=0;j<N;++j) {
    translate(-p[3].x,-p[3].y);
    setRect(1);
    translate(p[1]);
    setRect(-1);
    fill(255-j*10);
  }
  pop();
  
  push();
  fill(255);
  for(j=0;j<N;++j) {
    setRect(-1);
    translate(-p[1].x,-p[1].y);
    setRect(1);
    translate(p[3].x,p[3].y);
    fill(255-j*20);
  }
  pop();
}
function setRect(d) {
  beginShape();
  for(i=0;i<4;++i) {
    vertex(o.x+p[i].x*d,o.y+p[i].y*d);
  }
  endShape(CLOSE);
}
/**/
