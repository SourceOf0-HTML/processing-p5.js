/*
setup=_=>{v=createVector;createCanvas(S=500,S);L=S/3;p=[];for(t=n=x=y=0;y<L;~~(x%=L)?0:++y)p[n++]=v(x++*S/L,y*S/L);M=255}
draw=_=>{p.some(T=>{r=noise(T.x/S,T.y/S,t/S);T.add(v(1).rotate(r*TAU*2)).add(S,S);set(T.x%=S,T.y%=S,[9,r*M,M-r*M,M])});updatePixels();++t}
/**/

function setup() {
  createCanvas(S=500,S);
  L = S/3;
  p = [];
  n = 0;
  for(y=0;y<L;++y) {
    for(x=0;x<L;++x) {
      p[n++] = createVector(x*S/L,y*S/L);
    }
  }
  t = 0;
}

function draw() {
  p.some(T=>{
    r = noise(T.x/S,T.y/S,t/S);
    T.add(createVector(1).rotate(r*TAU*2)).add(S,S);
    set(T.x%=S,T.y%=S,color(9,r*255,255-r*255));
  });
  updatePixels();
  ++t;
}
/**/
