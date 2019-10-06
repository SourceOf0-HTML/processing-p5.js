/*
d=[]
draw=_=>{s=sin,c=cos,r=random,createCanvas(S=500,S),noFill(),d.some(T=>{T.v<.1?0:(t=T.t+=T.v*=0.8,strokeWeight(T.v),push(),translate(T.x,T.y),rotate(t/40),T.s(),pop())})}
mousePressed=_=>{d.push({x:mouseX,y:mouseY,v:r(S/9),t:0,s:r([_=>{circle(0,0,t)},_=>{square(P=-t/2,P,t)},_=>{triangle(c(0)*t,s(0)*t,c(R=TAU/3)*t,s(R)*t,c(R*=2)*t,s(R)*t)}])})}
/**/

function setup() {
  createCanvas(S=500,S);
  d=[];
  l=0;
  noFill();
}

function draw() {
  clear();
  for(i=0;i<l;) {
    T=d[i];
    strokeWeight(T.v*3);
    T.t+=T.v*=0.8;
    push();
    translate(T.x,T.y);
    rotate(T.t/40);
    T.s();
    pop();
    if(T.v<0.1) {
      d.splice(i,1);
      --l;
    } else {
      ++i;
    }
  }
}

function mousePressed() {
  d[l++] = {
    x:mouseX,
    y:mouseY,
    v:random(S/9),
    t:0,
    s:random([
      _=>{circle(0,0,T.t)},
      _=>{square(-T.t/2,-T.t/2,T.t)},
      _=>{triangle(cos(0)*T.t,sin(0)*T.t,
                   cos(TAU/3)*T.t,sin(TAU/3)*T.t,
                   cos(TAU/3*2)*T.t,sin(TAU/3*2)*T.t)}
    ]),
  };
}
/**/
