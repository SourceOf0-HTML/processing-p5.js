/*
setup=_=>{c=createGraphics;createCanvas(S=500,S);g=c(S,S,WEBGL);m=c(D=S/20,D)}
draw=_=>{g.background(0);g.rotate(.01,createVector(1,1,.5));g.box(S/2);for(y=x=0;y<S;(x%=S)?0:y+=D){m.image(g,-x,-y);image(m,S-D-x,S-D-y);x+=D}}
/**/

function setup() {
  createCanvas(S=500,S);
  H=S/2;
  D=S/20;
  
  g = createGraphics(S,S,WEBGL);
  v = createVector(1,1,0.5);
  
  m = createGraphics(D,D);
}

function draw() {
  clear();
  
  g.background(0);
  
  g.rotate(0.01,v);
  g.box(H);
  
  for(y=0;y<S;y+=D) {
    for(x=0;x<S;x+=D) {
      m.clear();
      m.image(g,-x,-y);
      image(m,S-D-x,S-D-y);
    }
  }
}
/**/
