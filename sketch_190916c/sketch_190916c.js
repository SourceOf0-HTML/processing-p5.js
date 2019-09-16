/*
setup=_=>{createCanvas(S=500,S);H=S/2;g=createGraphics(S,S);g.noStroke();t=0}
draw=_=>{g.clear();beginShape();i=50;while(i)vertex(cos(j=t+i*i)*S+H,sin(j*j)*S+H),--i;endShape();s=g.get();s.mask(this);image(s,0,0);t+=1e-6}
/**/

function setup() {
  createCanvas(S=500,S);
  H=S/2;
  D=50;
  
  g = createGraphics(S,S);
  g.noStroke();
  
  t = 0;
}

function draw() {
  g.clear();
  
  beginShape();
  for(i=0; i<D; ++i) {
    j = t+i*i;
    vertex(cos(j)*S+H, sin(j*j)*S+H);
  }
  endShape();
  
  s = g.get();
  s.mask(this);
  
  image(s,0,0);
  
  t+=0.000001;
}
/**/
