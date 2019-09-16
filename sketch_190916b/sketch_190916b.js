/*
setup=_=>{c=createGraphics;w=image;createCanvas(S=500,S);H=S/2;g=c(S,S,WEBGL);g.noStroke();t=0}
draw=_=>{background(0);b(M=255,100,250);m=c(S,S);m.beginShape();i=200;while(i){m.vertex(cos(j=noise(t+i)*TAU*2)*S+H,sin(j)*S+H);--i}m.endShape();s=g.get();s.mask(m);b(150,200,M);w(g,0,0);w(s,0,0);g.rotate(.005,createVector(1,1,.5));t+=.0002}
b=(j,k,l)=>{g.clear();g.ambientLight(0,10,50);g.pointLight(M,M,200,0,0,H*0.64);g.ambientMaterial(M,j,k,l);g.box(H*0.8)}
/**/

function setup() {
  createCanvas(S=500,S);
  H=S/2;
  D=200;
  R=H*0.8;
  
  g = createGraphics(S,S,WEBGL);
  g.noStroke();
  
  m = createGraphics(S,S);
  
  v = createVector(1,1,0.5);
  t = 0;
}

function draw() {
  background(0);
  setBox(255,100,250);
  
  m.clear();
  m.beginShape();
  for(i=0; i<D; ++i) {
    m.vertex(cos(noise(t+i)*TAU*2)*S+H, sin(noise(t+i)*TAU*2)*S+H);
  }
  m.endShape();
  
  s = g.get();
  s.mask(m);
  
  setBox(150,200,255);
  
  image(g,0,0);
  image(s,0,0);
  
  g.rotate(0.005,v);
  t+=0.0002;
}

function setBox(j,k,l) {
  g.clear();
  g.ambientLight(0,10,50);
  g.pointLight(255,255,200,0,0,R*0.8);
  g.ambientMaterial(255,j,k,l);
  g.box(R);
}
/**/
