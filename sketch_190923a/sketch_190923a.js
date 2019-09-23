/*
setup=_=>createCanvas(S=500,S),t=0
draw=_=>{background("#AABBFF06");fill("#FFBBCC04");r=cos(t/1e5)*t%S/4;i=cos(t/1e4)*r+r;j=sin(t/99)*r+r;[arc,ellipse,circle,line,point,quad,rect,square,triangle][~~(t++/9)%9](i+S/10,j+S/10,i*r/2,j*r/2,i*r/3,j*r/3,i*r/4,j*r/4)}
/**/

function setup() {
  createCanvas(S=500,S);
  P=S/10;
  f = [arc,ellipse,circle,line,point,quad,rect,square,triangle];
  t = 0;
}

function draw() {
  background("#AABBFF06");
  fill("#FFBBCC04");
  r = cos(t/10000)*t%S/4;
  i = cos(t/1000)*r+r;
  j = sin(t/99)*r+r;
  f[~~(t++/9)%f.length](i+P, j+P, i*r/2, j*r/2, i*r/3, j*r/3, i*r/4, j*r/4);
}
/**/
