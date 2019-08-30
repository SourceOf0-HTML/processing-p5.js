
setup=_=>{createCanvas(S=500,S);H=S/2;s1=c(H,H);s2=c(s1.w,0)}
draw=_=>{clear();s1.a=mouseX/S*PI;s2.a=mouseY/S*PI;push();v(s1);push();v(s2);pop();pop()}
c=(x,y)=>({x:x,y:y,w:H/2,h:H/8,a:0})
v=T=>{translate(T.x,T.y);rotate(T.a);rect(0,-T.h/2,T.w,T.h)}
/**/
/*
function setup() {
  createCanvas(S=500,S);
  H = S/2;
  segment1 = createSegment(H,H);
  segment2 = createSegment(segment1.w,0);
}

function draw() {
  clear();
  segment1.angle = mouseX/S*PI;
  segment2.angle = mouseY/S*PI;
  push();
  view(segment1);
  push();
  view(segment2);
  pop();
  pop();
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
  translate(T.x,T.y);
  rotate(T.angle);
  rect(0,-T.h/2,T.w,T.h);
}
/**/
