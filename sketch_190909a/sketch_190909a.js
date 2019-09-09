
setup=_=>{s=sin;createCanvas(S=500,S);H=S/2;R=H/4;q=r=t=0}
draw=_=>{background(0);noStroke();push();blendMode(DIFFERENCE);fill(k=237,l=34,m=93);u(H*8);u(H*6);u(H*4);u(S);fill(k,m,l);u(H*7);u(H*5);u(H*3);pop();q=s(t)+2;r=cos(t/2);t+=.01}
u=d=>{beginShape();v(0,S,1,1,d);v(S,0,-1,-1,d);endShape()}
v=(y,a,b,i,d)=>{for(;y!=a;y+=b){j=y-H+t*5;vertex(i*s(j*q/50)*R/4*q+i*H*r+s(j*r/20)*R*2-q*S+d,y);}}
/**/
/*
q=r=t=0
draw=_=>{s=sin;createCanvas(S=500,S);H=S/2;R=H/8;u(8);u(6);u(4);u(2);u(7);u(5);u(3);q=s(t+=.01)+2;r=cos(t/2)}
u=d=>{v(0,S,1,1,d*H);v(S,0,-1,-1,d*H)}
v=(y,a,b,i,d)=>{o=-1;for(;y!=a;y+=b)j=y-H+t*5,line(o,y-1,o=i*s(j*q/50)*R*q+i*H*r+s(j*r/20)*R*4-q*S+d,y)}
/**/
/*
function setup() {
  createCanvas(S=500,S);
  H = S/2;
  R = H/4;
  s = 0;
  r = 0;
  t = 0;
}

function draw() {
  background(0);
  noStroke();
  
  push();
  blendMode(DIFFERENCE);
  fill(237,34,93);
  createVertex(H*8);
  createVertex(H*6);
  createVertex(H*4);
  createVertex(H*2);
  
  fill(237,93,34);
  createVertex(H*7);
  createVertex(H*5);
  createVertex(H*3);
  pop();
  
  s = sin(t)+2;
  r = cos(t/2);
  t += 0.01;
}

function createVertex(d) {
  beginShape();
  setVertex(0, S, 1, 1, d);
  setVertex(S, 0, -1, -1, d);
  endShape();
}

function setVertex(a, b, c, i, d) {
  for(y = a; y != b; y += c) {
    j = y - H + t * 5;
    vertex(i*sin(j*s/50)*R/4*s + i*H*r + sin(j*r/20)*R*2 - s*S + d, y);
  }
}
/**/
