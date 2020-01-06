
T=C=0
draw=_=>{createCanvas(S=500,S),N=noise,H=S/2,colorMode(HSB),background(j=0);blendMode(ADD);for(;j<15;j+=3)m(T+j,C+j);T+=.01;C+=.1;}
m=(t,c)=>{for(x=y=v=i=0;i<1;i+=1/H)fill((i+c)*4%360,70,s=20-i*20),v+=N(a=i-t)/4,x+=(N(a)-.5)*v,y+=(N(a+S)-.5)*v-12/s,circle(H+x,S*.9+y,s)}
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
  for(j=0; j<15; j+=3) {
    m(T+j, C+j);
  }
  pop();
  T += 0.01;
  C += 0.1;
}

function m(t,c) {
  v = 0;
  p = createVector();
  for(i=0; i<H; ++i) {
    r = i/H;
    s = (1-r)*20;
    fill((r+c)*4%360, 70, s);
    v += noise(r-t)/4;
    p.add((noise(r-t)-0.5)*v, (noise(r-t+S)-0.5)*v - 12/s);
    circle(H + p.x, S*0.9 + p.y, s);
  }
}
/**/
