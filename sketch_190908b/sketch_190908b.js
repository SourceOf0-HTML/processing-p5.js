
setup=_=>{r=random;createCanvas(S=500,S);p=[];for(n=0;n<10;)p[n++]=I({})}
draw=_=>{background(0,5);push();blendMode(DODGE);p.some(T=>{c=~~(T.y/T.d);T.c!=c?(T.u=c%2?0:T.v*r([-1,1]),T.c=c):0;strokeWeight(w=T.d/S*5+T.v);stroke(200,w*20+150,99);line(T.x,T.y,T.x+=T.u,T.y+=T.v);T.y>S?I(T):0;T.x%=S});pop()}
I=T=>(T.x=r(S),T.v=r([.01,.02,.1,.2,.3,1,5])*r(9)+1,T.d=r(50)+9+T.v,T.y=T.u=T.c=0,T)
/**/
/*
setup=_=>{r=random;createCanvas(S=500,S);p=[];for(n=0;n<10;)p[n++]=I({})}
draw=_=>{p.some(T=>{c=~~(T.y/T.d);T.c!=c?(T.u=c%2?0:T.v*r([-1,1]),T.c=c):0;line(T.x,T.y,T.x+=T.u,T.y+=T.v);T.y>S?I(T):0;T.x%=S})}
I=T=>(T.x=r(S),T.v=r(5,20),T.d=r(50)+T.v,T.y=T.u=T.c=0,T)
/**/
/*
function setup() {
  createCanvas(S=500,S);
  p = [];
  for(n = 0; n < 9; ++n) {
    p[n] = init({});
  }
}

function draw() {
  background(0,5);
  push();
  blendMode(DODGE);
  p.forEach(T=>{
    c = ~~(T.y/T.d);
    if(T.c != c) {
      T.u = c%2? 0 : T.v*random([-1,1]);
      T.c = c;
    }
    strokeWeight(w=T.d/S*5+T.v);
    stroke(200,w*20+150,99);
    x = T.x;
    y = T.y;
    T.x += T.u;
    T.y += T.v;
    line(x, y, T.x, T.y);
    if(T.y > S) init(T);
    if(T.x < 0) T.x += S;
    if(T.x > S) T.x -= S;
  });
  pop();
}

init=T=>{
  T.x = random(S);
  T.v = random([0.01,0.02,0.1,0.2,0.3,1,5])*random(9)+1;
  T.d = random(50)+9+T.v;
  T.y = T.u = T.c = 0;
  return T;
}
/**/
