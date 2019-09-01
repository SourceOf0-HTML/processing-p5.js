
setup=_=>{createCanvas(S=500,S);s=sin;c=cos;H=S/2;D=H/4;t=0;colorMode(HSB)}
draw=_=>{background(0);push();blendMode(ADD);translate(H,H);for(i=0;i<1;i+=.01){fill(i*360,100,10,10);rotate(s(t));r=t+i*2;rect(c(r)*D,s(r)*D,c(t)*H,s(t)*H)}pop();t+=.001}
/**/
/*
function setup() {
  createCanvas(S=500, S);
  H = S/2;
  colorMode(HSB);
  t = 0;
}

function draw() {
  clear();
  background(0);
  push();
  blendMode(ADD);
  noStroke();
  translate(H, H);
  i = 0;
  for(i = 0; i<1; i += 0.01) {
    fill(i*360, 100, 10, 10);
    rotate(sin(t));
    rect(cos(t+i*2)*H/4, sin(t+i*2)*H/4, cos(t)*H, sin(t)*H);
  }
  pop();
  t += 0.001;
}
/**/
