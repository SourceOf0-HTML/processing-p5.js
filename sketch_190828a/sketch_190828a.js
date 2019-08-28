function setup() {
  createCanvas(S=500, S, WEBGL);
  c = createCamera();
  H = S/2;
  R = S/8;
  P = PI*2;
  p = createVector();
  v = createVector(0, 0, 1);
}

function draw() {
  clear();
  m = createVector(H-mouseX, mouseY-H);
  if(mouseIsPressed) {
    p.add(createVector(m.x/H, m.y/H, 1 - m.mag()/H).mult(5));
  }
  c.setPosition(p.x, p.y, p.z);
  c.lookAt(p.x + m.x, p.y + m.y, p.z + H);
  
  for(z = p.z; z < p.z + S; z+=5) {
    s = 1 - (z-p.z)/S;
    strokeWeight(s*30);
    for(i=0; i<P; i+=PI/60) {
      t = z/400;
      stroke(100*s+155*(1-i/P)+55, 255*s, 100*s+155*i/P+55);
      point(sin(i+t/sin(t))*R, cos(t+i)*R, z);
    }
  }
}
/**/
