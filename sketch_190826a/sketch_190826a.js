/*
setup=_=>{r=random;c=createVector;createCanvas(S=500,S);P=PI;R=P/2}
draw=_=>{background(0,50);push();blendMode(ADD);m(c(S/2,S/2),c(D=S/6).rotate(R),int(r(1,3)));pop()}
m=(o,u,n,l,i=0)=>{l=n;while(i++<4-l){p=o.copy();v=u.copy();p.add(v.mult(r(.01,1)).rotate(r(P)-R));d=v.mag();s=d/D;b=100;stroke(b*s+155,b*s+50,b*s);strokeWeight(s+1);line(o.x,o.y,p.x,p.y);d>S/8?n+=1:0;n?m(p.copy(),v.copy(),n-1):0;p.set(o)}}
/**/

function setup() {
  createCanvas(S=500, S);
  H = S/2;
  P = PI;
  R = P/2;
}

function draw() {
  background(0, 50);
  push();
  blendMode(ADD);
  makeLine(createVector(H, H), createVector(D=S/6).rotate(R), int(random(1, 3)));
  pop();
}

function makeLine(o, u, n, l, i=0) {
  l = n;
  while(i++<4-l) {
    p = o.copy();
    v = u.copy();
    p.add(v.mult(random(.01,1)).rotate(random(P)-R));
    d = v.mag();
    s = d / D;
    stroke(100*s+155, 100*s+50, 100*s);
    strokeWeight(s+1);
    line(o.x, o.y, p.x, p.y);
    if(d>S/8) n+=1;
    if(n) makeLine(p.copy(), v.copy(), n-1);
    p.set(o);
  }
}
/**/
