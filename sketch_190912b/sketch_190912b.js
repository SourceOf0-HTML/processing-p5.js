
function setup() {
  createCanvas(S=windowWidth, windowHeight);
  g = createGraphics(width, height, WEBGL);
  c = g.createCamera();
  H = S/2;
  R = S/4;
  P = PI*2;
  p = createVector();
  v = createVector(0, 0, 1);
  t = 0;
  g.colorMode(HSB);
}

function draw() {
  clear();
  g.background(200, 70, 100);
  
  m = createVector(width/2-mouseX, mouseY-height/2);
  if(mouseIsPressed) {
    p.add(createVector(m.x/H, m.y/H, 1 - m.mag()/H).mult(H/50));
  }
  r = atan2(S - m.y, m.x);
  c.camera(p.x, p.y, p.z, p.x + m.x, p.y + m.y, p.z + H, cos(r), sin(r), 0);
  
  g.ambientLight(220, 80, 50);
  g.pointLight(200, 30, 100, p.x, p.y - H, p.z);
  
  g.noStroke();
  
  g.push();
  g.fill(10);
  g.translate(p.x, p.y + S*8.5, p.z + S);
  g.sphere(S*8, 24, 24);
  g.pop();
  
  for(z = p.z; z < p.z + S*2; z += 4) {
    s = 1 - (z-p.z)/(S*2);
    g.strokeWeight(s*50);
    g.stroke(100*s + 150, 100, 100);
    g.point(sin(z/(R*3)*P)*R, sin(z/(R*4)*P)*R, z);
  }
  
  image(g, 0, 0);
  
  stroke(100, 255, 200);
  noFill();
  
  strokeWeight(5);
  s = H/20;
  d = 100;
  for(i = -50; i < 50; ++i) {
    l = i%5 ? 0 : 0.8;
    line(H*0.5, p.y + i*d, H*0.5 + s * (1 + l), p.y + i*d);
    line(H*1.5 - s * (1 + l), p.y + i*d, H*1.5, p.y + i*d);
    line(p.x + i*d, H/10, p.x + i*d, H/10 + s * (1 + l));
  }
  l = H/3;
  line(-cos(r)*l + width/2, -sin(r)*l + height/2, cos(r)*l + width/2, sin(r)*l + height/2);
  r -= PI/2;
  line(-cos(r)*l + width/2, -sin(r)*l + height/2, cos(r)*l + width/2, sin(r)*l + height/2);
  circle(width/2, height/2, l);
  circle(width/2, height/2, l*1.5);
  
  fill(0, 255, 200);
  textSize(H/10);
  
  textAlign(CENTER, TOP);
  text(~~p.x, width/2, 0);
  text(degrees(r).toFixed(3), width/2, height/2);
  
  textAlign(RIGHT, CENTER);
  text(~~p.y, width - H/10, height/2);
}
/**/
