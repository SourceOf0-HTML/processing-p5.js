/*
t=0
draw=_=>{c=cos;s=sin;v=vertex;createCanvas(S=500,S);H=S/2;fill(0);R=S/8;N=~~map(A=c(t+=.02)+1,0,1,3,30);a=PI/2;r=A*H;translate(H,H);rotate(t/2);beginShape(TRIANGLE_STRIP);
for(i=N+1;i;--i){v(c(a)*r,s(a)*r);v(c(a+=b=PI/N)*R,s(a)*R);a+=b}endShape()}
/**/

function setup() {
  createCanvas(S=500,S);
  H = S/2;
  R = H/4;
  t = 0;
  fill(0);
}

function draw() {
  clear();
  A = cos(t+=0.02)+1;
  N = ~~map(A, 0, 1, 3, 30);
  a = PI/2;
  b = PI/N;
  r = A * H;
  
  translate(H,H);
  rotate(t/2);
  beginShape(TRIANGLE_STRIP);
  for(i = 0; i <= N; i++) {
    px = cos(a) * r;
    py = sin(a) * r;
    a += b;
    vertex(px, py);
    px = cos(a) * R;
    py = sin(a) * R;
    vertex(px, py);
    a += b;
  }
  endShape();
}
/**/
