/*
setup=_=>{createCanvas(W=500,W);i=image;t=text;c=color;n=noise;I=g();O=g();S=g();R=g();d=random(180);for(y=0;y<L;++y){r=y/L;for(x=0;x<L;++x){v(I,r*255);v(O,c(`hsl(${~~(r*90+n(y)*90+d)},100%,50%)`))}}u(O);u(I);fill(0);textSize(L/5);m=5;o=0}
draw=_=>{clear();for(y=0;y<L;++y){for(x=0;x<L;++x){r=n(x/L+o,y/L+o);v(S,c(r*255));v(R,O.get(0,r*L))}}u(S);u(R);i(I,L,L);t("IN",L,L-m);i(O,P=W-L*2,L);t("OUT",P,L-m);i(S,L,L*3);t("SOURCE",L,L*3-m);i(R,P,L*3);t("RESULT",P,L*3-m);o+=.01}
g=_=>createGraphics(L=100,L)
u=T=>T.updatePixels()
v=(T,k)=>T.set(x,y,k)
/**/
/*
setup=_=>{createCanvas(S=250,S);n=noise;O=createGraphics(S,1);d=n(0)*180;x=o=0;for(;x<S;)O.set(x,0,color(`hsl(${~~(x/S*80+n(x++)*100+d)},100%,50%)`));u(O)}
draw=_=>{for(x=y=0;y<S;(x%=S)?0:++y){set(x,y,O.get(n(x++/S+o,y/S+o)*S,0))};u(this);o+=.01}
u=T=>T.updatePixels()
/**/

function setup() {
  createCanvas(S=500, S);
  L = 100;
  
  gIn = createGraphics(L, L);
  gOut = createGraphics(L, L);
  gSource = createGraphics(L, L);
  gResult = createGraphics(L, L);
  
  base = random(180);
  for(let y = 0; y < L; ++y ) {
    let ratioH = y/L;
    let colorRatio = ratioH * 255;
    let outColor = color(`hsl(${~~(ratioH*90+noise(y)*90+base)}, 100%, 50%)`);
    for(let x = 0; x < L; ++x ) {
      gIn.set(x, y, colorRatio);
      gOut.set(x, y, outColor);
    }
  }
  gIn.updatePixels();
  gOut.updatePixels();
  
  fill(0);
  textSize(L/5);
  
  margin = 5;
  t = 0;
}

function draw() {
  clear();
  
  for(let y = 0; y < L; ++y ) {
    let ratioH = y / L + t;
    for(let x = 0; x < L; ++x ) {
      let ratio = noise(x/L + t, ratioH);
      let sourceColor = color(ratio * 255);
      gSource.set(x, y, sourceColor);
      gResult.set(x, y, gOut.get(0, ratio*L));
    }
  }
  gSource.updatePixels();
  gResult.updatePixels();
  
  image(gIn, 100, 100);
  text("IN", 100, 100 - margin);
  image(gOut, S - L - 100, 100);
  text("OUT", S - L - 100, 100 - margin);
  image(gSource, 100, 300);
  text("SOURCE", 100, 300 - margin);
  image(gResult, S - L - 100, 300);
  text("RESULT", S - L - 100, 300 - margin);
  
  t += 0.01;
}
/**/
