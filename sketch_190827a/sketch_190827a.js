
setup=_=>{d=createVector;createCanvas(S=500,S,WEBGL);H=S/2;P=PI*2;c=createCamera();p=d();v=d();v.z=1}
draw=_=>{clear();m=d(H-mouseX,mouseY-H);if(mouseIsPressed)p.add(v=d(m.x/H,m.y/H,1-m.mag()/H).mult(5));c.setPosition(p.x,p.y,p.z);c.lookAt(p.x+m.x,p.y+m.y,p.z+H);z=p.z;while(z<p.z+S)R=S/8,s=1-(z-p.z)/S,strokeWeight(s*50),stroke(255*s,200*s+55,100*s+155),point(sin(z/200*P)*R,sin(z/300*P)*R,z++)}
/**/
/*
setup=_=>{d=createVector;createCanvas(S=500,S,WEBGL);H=S/2;P=PI*2;c=createCamera();p=d();}
draw=_=>{clear();m=mouseX-H;n=mouseY-H;p.add(d(m,n,H-d(m,n).mag()).div(H));c.lookAt(m,n,H);z=b=-p.z;while(z<b+S)R=30,Z=z/99*P,point(sin(Z/2)*R-p.x,sin(Z/3)*R-p.y,z++-b)}
/**/
/*
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
  
  for(z = p.z; z < p.z + S; ++z) {
    s = 1 - (z-p.z)/S;
    strokeWeight(s*50);
    stroke(255*s, 200*s+55, 100*s+155);
    point(sin(z/200*P)*R, sin(z/300*P)*R, z);
  }
}
/**/
