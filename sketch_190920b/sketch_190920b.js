/*
setup=_=>{v=createVector;createCanvas(S=500,S);L=S/6;p=[];F=S*S;for(t=n=x=y=0;y<L;~~(x%=L)?0:++y)p[n++]=v(x++*S/L+F,y*S/L+F);M=255}
draw=_=>{background(0);p.some(T=>{r=noise(T.x,T.y/S,t/S);T.add(v(1).rotate(r*TAU));stroke(9,r*M,M-r*M);point(T.x%S,T.y%S)});++t}
/**/

function setup() {
  createCanvas(S=500,S);
  L = S/6;
  p = [];
  n = 0;
  for(y=0;y<L;++y) {
    for(x=0;x<L;++x) {
      p[n++] = createVector(x*S/L+S*S,y*S/L+S*S);
    }
  }
  t = 0;
}

function draw() {
  background(0);
  p.some(T=>{
    r = noise(T.x,T.y/S,t/S);
    T.add(createVector(1).rotate(r*TAU));
    stroke(9,r*255,255-r*255);
    point(T.x%S,T.y%S);
  });
  ++t;
}
/**/
