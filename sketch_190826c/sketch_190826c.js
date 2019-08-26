
setup=_=>{c=createVector;createCanvas(S=500,S);t=0;R=30;D=20;P=PI*2;p=c();v=c();m=c();fill(0)}
draw=_=>{d=c(mouseX,mouseY).sub(m).div(D);j=D;while(j--){o=v.add(m.add(d).copy().sub(p).mult(.001/D)).mult(1-.2/D).copy();t+=o.mag()/9/D;p.add(o);for(i=0;i<P;i+=P/5)r=D/10,circle(p.x+cos(t+i)*o.y*r*R,p.y+sin(t+i)*o.x*r*R,cos(t+i)*o.mag()/(4/D)+1)}}
/**/
/*
function setup() {
  createCanvas(S=500, S);
  t = 0;
  R = 30;
  D = 20;
  p = createVector();
  v = createVector();
  m = createVector();
  fill(0);
}

function draw() {
  n = createVector(mouseX, mouseY);
  diff = n.copy().sub(m).div(D);
  for(j = 0; j < D; ++j) {
    m.add(diff);
    v.add(m.copy().sub(p).mult(0.001/D)).mult(1-.2/D);
    o = v.copy();
    a = o.mag()
    t += a/D/9;
    p.add(o);
    for(i = 0; i < PI*2; i += PI*2/5) {
      M = 10;
      ratioX = o.y/(M/D);
      ratioY = o.x/(M/D);
      circle(p.x + cos(t+i)*ratioX*R, p.y + sin(t+i)*ratioY*R, cos(t+i)*a/(4/D)+1);
    }
  }
}
/**/
