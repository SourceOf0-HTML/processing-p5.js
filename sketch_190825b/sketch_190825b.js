
/*
setup=_=>{r=random;v=createVector;t=40;createCanvas(S=500,S);i(d=[],v(S/2,S/4))}
draw=_=>{m(d)}
i=(D,P)=>{n=--t;while(--n){D[n]={p:P.copy(),v:v(r(-3,3),r(-3,3))}}}
m=(D)=>{D.some(T=>{T.v.mag()>.1?(p=T.p.add(T.v.mult(.99)),point(p.x,p.y+=.4)):T.d? m(T.d):t>2? i(T.d=[],T.p):0})}
/**/

function setup() {
  t = 40;
  createCanvas( S=500, S );
  init( d=[], createVector(S/2,S/4) );
}

function draw() {
  move(d);
}

function init(D, P) {
  n = --t;
  while(--n) {
    D[n] = {
      p: P.copy(),
      v: createVector( random(-3,3), random(-3,3) )
    }
  }
}

function move(D) {
  D.some(T=>{
    if(T.v.mag() > 0.1) {
      T.p.add( T.v.mult(.99) );
      T.p.y += 0.4;
      point( T.p.x, T.p.y );
    } else if( T.d ) {
      move(T.d);
    } else if(t > 2) {
      init( T.d=[], T.p );
    }
  });
}

/**/
