/*
setup=_=>{R=random;createCanvas(S=500,S);i(D=[]);noStroke()}
draw=_=>{background(0),m(D)}
i=(d,l=10,c=0,x=S/2,y=S/2)=>{for(n=0;n<80-c*30;++n){d[n]={x,y,c,r:R(TAU),l:0,a:e=R(l*.9),e}}}
m=d=>d.some(T=>{l=T.l+=a=T.a*=.95,x=cos(T.r)*l+T.x,y=sin(T.r)*l+T.y,a>2?circle(x,y,a/2):(T.d?m(T.d):(T.c<2?i(T.d=[],T.e,T.c+1,x,y):0))})
/**/

setup=_=>createCanvas(S=500,S,R=random,x=y=S/2,i(D=[]))
draw=_=>m(D,background(0))
i=(d,l=9,c=0)=>{for(n=0;n<30;)d[n++]={x,y,c,r:R(TAU),l:0,a:e=R(l),e}}
m=d=>d.some(T=>{l=T.l+=a=T.a*=.95,x=cos(T.r)*l+T.x,y=sin(T.r)*l+T.y,a>2?circle(x,y,a):T.d?m(T.d):T.c<2?i(T.d=[],T.e,T.c+1):0})
/**/

/*
function setup() {
  createCanvas(S=500, S);
  D = [];
  init(D);
  noStroke();
}

function draw() {
  background(0);
  move(D);
}

function init(d, l=10, c=0, x=S/2, y=S/2) {
  for( n=0; n < 80 - c*30; ++n) {
    d[n] = {
      x, y, c,
      r: random(TAU),
      l: 0,
      a: e = random(l * 0.9),
      e
    };
  }
}

function move(d) {
  d.forEach(T=>{
    T.a *= 0.95;
    T.l += T.a;
    l = T.l;
    x = cos(T.r)*l + T.x;
    y = sin(T.r)*l + T.y;
    if(T.a > 2) {
      circle(x, y, T.a/2);
    } else if(T.d) {
      move(T.d);
    } else if(T.c < 2) {
      init(T.d=[], T.e, T.c+1, x, y);
    }
  });
}

/**/
