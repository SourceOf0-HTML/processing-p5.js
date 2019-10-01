
t=0;
draw=_=>{createCanvas(S=500,S);H=S/2;colorMode(HSL);background(0);noFill();strokeCap(SQUARE);i=M=9;while(--i)d(t/(M-i),cos(t/i)*PI,i/M*S,noise(i+t/9)*360);t+=.05}
d=(r,a,s,c)=>{strokeWeight(s/4);stroke(c,90,70,.3);arc(H,H,s,s,a+PI+r,TAU+r)}
/**/
/*
function setup() {
  createCanvas(S=500,S);
  H=S/2;
  t=0;
  colorMode(HSL);
}

function draw() {
  background(0);
  
  i=M=20;
  while(--i) {
    arcDraw(t/(M-i),cos(t/i)*PI,i/M*S,noise(i+t/9)*360);
  }
  t+=0.05;
}

function arcDraw(r,a,s,c) {
  noFill();
  strokeCap(SQUARE);
  strokeWeight(s/4);
  stroke(c,90,70,0.3);
  arc(H,H,s,s,a+PI+r,TAU+r);
}
/**/
