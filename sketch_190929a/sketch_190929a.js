function setup() {
  createCanvas(S=500,S);
  H = S/2;
  R = H/4;
}

function draw() {
  background(255);
  N = 6;
  a = 0;
  d = TAU/N;
  h = d/2;
  D = R*2;
  
  view(H,H,0);
  
  for(j=D; j <= H; j+=D) {
    a = 0;
    for(n=t=0; n <= N; n++,t+=d) {
      view(H+cos(a+h)*cos(h)*j,H+sin(a+h)*cos(h)*j,N%2?h:0);
    }
  }
}

function view(x,y,r) {
  beginShape();
  for(i = 0; i <= N; i++,a+=d) {
    vertex(x+cos(a+r)*R,y+sin(a+r)*R);
  }
  endShape();
}
/**/
