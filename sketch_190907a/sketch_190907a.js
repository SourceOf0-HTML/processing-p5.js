
t=0
draw=_=>{V=createVector;createCanvas(S=500,S);background(0);H=S/2;M(V(),99,0,N=4);t+=.1}
M=(p,l,a,n,o=cos(n*t/6)*sin(n*t/8),i=-3)=>{for(;i<3;){r=n-N?-i*i/8:o;v=V(l*r).rotate(m=a+PI/3*i++).add(p);stroke(255);line(p.x+H,p.y+H,v.x+H,v.y+H);n?M(v,l*o,m,n-1):0}}
/**/
/*
function setup() {
  createCanvas(S=500,S);
  H = S/2;
  t = 0;
}

function draw() {
  background(0);
  makeLine(createVector(), 99, 0, N=4);
  t+=0.1;
}

function makeLine(p, l, a, n) {
  let o = cos(n*t/6) * sin(n*t/8);
  for(let i = -3; i < 3; ++i ) {
    r = n==N ? o : -i*i/8;
    m = a+PI/3*i;
    v = createVector(l*r).rotate(m);
    stroke(255);
    line(p.x + H, p.y + H, v.x + p.x + H, v.y + p.y + H);
    if(n) {
      makeLine(v.add(p),l*o, m, n-1);
    }
  }
}
/**/
