/*
setup=_=>{createCanvas(S=500,S);a=t=p=q=v=w=0;blendMode(BURN);stroke("#700")}
draw=_=>{background(255,40);o=p;r=q;b=a;v+=(mouseX-p)/9;w+=(mouseY-q)/9;p+=v*=.7;q+=w*=.7;a=mag(v,w)/4;strokeWeight(a/2);t+=.1;for(i=3;i;)line(p+cos(d=t+--i*2)*a,q+sin(d)*a,o+cos(d-=.1)*b,r+sin(d)*b)}
/**/

function setup() {
  createCanvas(S=500, S);
  t = 0;
  D = 0.1;
  a = 0;
  p = createVector();
  v = createVector();
  blendMode(BURN);
  stroke("#700");
}

function draw() {
  background(255, 40);
  m = createVector(mouseX, mouseY);
  o = p.copy();
  b = a;
  
  v.add(m.copy().sub(p).mult(0.1)).mult(0.7);
  a = v.mag()/4;
  p.add(v);
  strokeWeight(a/2);
  t += D;
  for(i = 0; i < 3; i++) {
    j = i * 2;
    line(o.x + cos(t+j-D)*b, o.y + sin(t+j-D)*b, p.x + cos(t+j)*a, p.y + sin(t+j)*a);
  }
}
/**/
