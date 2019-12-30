/*
setup=_=>{R=random;V=createVector;createCanvas(S=500,S);i(D=[]);noStroke()}
draw=_=>{background(0),m(D)}
i=(d,l=10,T,n=0)=>{c=T?T.c+1:0;while(n<80-c*30){d[n++]=t={c,p:T?T.p.copy():V(),v:V(R(l*.9)).rotate(R(TAU))};t.l=t.v.mag()}}
m=d=>d.some(T=>{l=T.v.mag();l>2?(T.p.add(T.v.mult(.95)),circle(T.p.x+S/2,T.p.y+S/2,l/2)):(T.d?m(T.d):(T.c<2?i(T.d=[],T.l,T):0))})
/**/

S=500
L=9
setup=_=>i(D=[])
draw=_=>m(D,createCanvas(S,S))
r=_=>random(-L,L)
i=(d,c=0,x=S/2,y=S/2)=>{for(n=0;n<30-c*14;++n)d[n]={c,x,y,l:mag(u=r(),v=r()),u,v}}
m=d=>d.some(T=>(l=mag(T.u,T.v))>1?circle(x=T.x+=T.u*=.95,y=T.y+=T.v*=.95,l):T.d?m(T.d):T.c<2?i(T.d=[],T.c+1,x,y,L=T.l):0)
/**/

/*
function setup() {
  createCanvas(S=500, S);
  d = [];
  init(d, 10);
  noStroke();
}

function draw() {
  background(0);
  translate(H=S/2, H);
  move(d);
}

function init(D, L, T=0) {
  c = (T)? T.c+1 : 0;
  for( n=0; n < 80-c*30; ) {
    D[n++] = t = {
      c: c,
      p: (T)? T.p.copy() : createVector(),
      v: createVector(random(L*.9)).rotate(random(PI*2))
    };
    t.l = t.v.mag();
  }
}

function move(D) {
  D.some(T=>{
    m = T.v.mag();
    if(m > 2) {
      T.p.add(T.v.mult(.95));
      circle(T.p.x, T.p.y, m/2);
    } else if(T.d) {
      move(T.d);
    } else if(T.c < 2) {
      init(T.d=[], T.l, T);
    }
  });
}

/**/
