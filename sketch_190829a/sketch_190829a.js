
T=C=0
draw=_=>{createCanvas(S=500,S),N=noise,H=S/2,colorMode(HSB),background(j=0);blendMode(ADD);for(;j<24;j+=3)m(T+j,C+j);T+=N(C+=.005)*.001}
m=(t,c)=>{for(x=y=v=i=0;i<1;i+=1/H)fill((i+c)*4%360,70,s=10-i*10),v+=N(a=i-t),x+=(N(a-c)-.5)*v,y+=(N(a-c+S)-.5)*v,circle(H+x,H+y,s)}
/**/
/*
setup=_=>{N=noise;createCanvas(S=500,S);H=S/2;T=C=0}
draw=_=>{clear();j=24;while(j-=3)m(T+j,C+j);T+=N(C+=.005)*.01}
m=(t,c)=>{for(x=y=i=v=0;i<1;i+=1/H)stroke(0,M=255,M,i*M),strokeWeight((1-i)*20),v+=N(i-t),x+=(N(i-t-c)-.5)*v,y+=(N(i-t-c+S)-.5)*v,point(H+x,H+y)}
/**/
/*
function setup() {
  createCanvas(S=500, S);
  H = S/2;
  T = 0;
  C = 0;
  colorMode(HSB);
}

function draw() {
  background(0);
  push();
  blendMode(ADD);
  for(j=0; j<24; j+=3) {
    m(T+j, C+j);
  }
  pop();
  T += noise(C) * 0.001;
  C += 0.005;
}

function m(t,c) {
  v = 0;
  p = createVector();
  for(i=0; i<H; ++i) {
    r = i/H;
    stroke((r+c)*4%360, 70, s=(1-r)*20);
    strokeWeight(s);
    v += noise(r-t)/2;
    p.add((noise(r-t-c)-0.5)*v, (noise(r-t-c+S)-0.5)*v);
    point(H + p.x, H + p.y);
  }
}
/**/
