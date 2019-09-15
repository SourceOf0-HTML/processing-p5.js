/*
setup=_=>{createCanvas(S=500,S);t=0;r=rotate;H=S/2;R=H*1.5;D=S/10;w=sin(d=PI/45)*R;h=cos(d)*R;n=C();g=C();g.fill(50,100,M=255)}
draw=_=>{background(0,50);for(i=x=y=0;y<R;(x%=~~w)?0:++y){n.set(++x,y,color(0,sin(noise(x/D,(y-t)/D,t/D)*TAU)*M))}
n.updatePixels();g.clear();g.triangle(0,0,0,R,w,h);s=g.get();s.mask(n.get());push();blendMode(ADD);translate(H,H);for(r(t++/200);i<TAU;i+=d){r(d);image(s,0,0)}pop();}
C=_=>createGraphics(S,S)
/**/

function setup() {
  createCanvas(S=500, S);
  H = S/2;
  R = H*1.5;
  
  n = createGraphics(S, S);
  g = createGraphics(S, S);
  
  t = 0;
  d = PI/45;
  D = S/10;
  
  w = sin(d)*R;
  h = cos(d)*R;
  
}

function draw() {
  background(0, 50);
  
  for( y = 0; y < R; ++y ) {
    for( x = 0; x < w; ++x ) {
      c = sin(noise(x/D, y/D, t/D)*TAU)*255;
      n.set(x, y, color(0, c));
    }
  }
  n.updatePixels();
  
  g.clear();
  g.fill(50, 100, 255);
  g.triangle(0, 0, 0, R, w, h);
  
  s = g.get();
  s.mask(n.get());
  
  push();
  blendMode(ADD);
  translate(H, H);
  rotate(t/200);
  for(i = 0; i < TAU; i += d) {
    rotate(d);
    image(s, 0, 0);
  }
  pop();
  
  ++t;
}
/**/
