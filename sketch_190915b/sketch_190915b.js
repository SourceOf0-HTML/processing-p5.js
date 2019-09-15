
t=0;
draw=_=>{createCanvas(S=500,S);g=createGraphics(S,S);background(0);g.clear();for(p=0;p<S;){g.stroke(50,100,255,sin(noise((t*p)/1e3)*TAU)*255);g.point(p++,0)}translate(H=S/2,H);for(i=0;i<TAU;){push();blendMode(ADD);rotate(i+=PI/45);image(g,0,0);pop()}++t}
/**/
/*
function setup() {
  createCanvas(S=500, S);
  H = S/2;
  R = H*1.5;
  
  t = 0;
  D = PI/45;
  
  g = createGraphics(S, S);
}

function draw() {
  background(0);
  
  g.clear();
  for(p = 0; p < R; ++p) {
    g.stroke(50, 100, 255, sin(noise((t*p)/1000)*TAU)*255);
    g.point(p, 0);
  }
  
  translate(H, H);
  for(i = 0; i < TAU; i += D) {
    push();
    blendMode(ADD);
    rotate(i);
    image(g, 0, 0);
    pop();
  }
  
  ++t;
}
/**/
