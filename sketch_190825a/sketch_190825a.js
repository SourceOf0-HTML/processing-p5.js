
setup=_=>{r=random;v=createVector;createCanvas(S=500,S);d=[];i(d,10);noStroke()}
draw=_=>{background(0);translate(H=S/2,H);m(d)}
i=(D,L,T=0)=>{c=(T)?T.c+1:0;for(n=0;n<80-c*30;){D[n++]=t={c:c,p:(T)?T.p.copy():v(),v:v(r(L*.9)).rotate(r(PI*2))};t.l=t.v.mag()}}
m=(D)=>{D.some(T=>{l=T.v.mag();(l>2)?(T.p.add(T.v.mult(.95)),circle(T.p.x,T.p.y,l/2)):((T.d)?(m(T.d)):((T.c<2)?(i(T.d=[],T.l,T)):0))});}
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
