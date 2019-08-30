
setup=_=>{createCanvas(S=500,S);A=c();B=c();w=H/2;h=H/8}
draw=_=>{clear();t=r(A,mouseX,mouseY);r(B,t[0],t[1]);t=p(B);A.x=t[0];A.y=t[1];v(A);v(B)}
c=_=>({x:H=S/2,y:H,a:0})
v=T=>{push();translate(T.x,T.y);rotate(T.a);rect(0,-h/2,w,h);pop()}
r=(T,x,y)=>(T.a=atan2(y-T.y,x-T.x),t=p(T),[x-t[0]+T.x,y-t[1]+T.y])
p=T=>[T.x+cos(T.a)*w,T.y+sin(T.a)*w]
/**/
/*
setup=_=>{S=99;A=c();B=c();C=c();w=H/2}
draw=_=>{t=r(A,mouseX,mouseY);r(B,t[0],t[1]);p(B,A);v(A);v(B)}
c=_=>({x:H=S/2,y:H,a:0})
v=T=>{p(T,C);line(T.x,T.y,C.x,C.y)}
r=(T,x,y)=>(T.a=atan2(y-T.y,x-T.x),p(T,C),[x-C.x+T.x,y-C.y+T.y])
p=(M,N)=>{N.x=M.x+cos(M.a)*w;N.y=M.y+sin(M.a)*w}
/**/
/*
function setup() {
  createCanvas(S=500,S);
  H=S/2;
  segment1 = createSegment(0,0);
  segment2 = createSegment(H,H);
}

function draw() {
  clear();
  t = reach(segment1, mouseX, mouseY);
  reach(segment2, t.x, t.y);
  p = getPin(segment2);
  segment1.x = p.x;
  segment1.y = p.y;
  view(segment1);
  view(segment2);
}

function createSegment(x,y) {
  return {
    x: x,
    y: y,
    w: H/2,
    h: H/8,
    angle: 0
  };
}

function view(T) {
  push();
  translate(T.x,T.y);
  rotate(T.angle);
  rect(0,-T.h/2,T.w,T.h);
  pop();
}

function reach(T,x,y) {
  dx = x - T.x;
  dy = y - T.y;
  T.angle = atan2(dy,dx);
  pin = getPin(T);
  w = pin.x - T.x;
  h = pin.y - T.y;
  tx = x - w;
  ty = y - h;
  return {x:tx, y:ty};
}

function getPin(T) {
  x = T.x + cos(T.angle) * T.w;
  y = T.y + sin(T.angle) * T.w;
  return {x:x, y:y};
}
/**/
