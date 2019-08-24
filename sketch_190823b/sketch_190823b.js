/*
setup=_=>{R=random;S=sin;createCanvas(L=500,L);t=0;d=5;a=.05;b=a/d;f=.99;c=255;l=L/3;h=L/2;r=PI*2;n=100;p=[];for(i=0;i++<n;)p[i]=[0,0,0,0,0]}
draw=_=>{background(0);x=S(t*a)*l+h;y=S(t++*b)*l+h;i=0;p.some(T=>{
if(i<1&&++T[4]==1)T[0]=x+R(-1,1),T[1]=y+R(-1,1),T[2]=R(-1,1),T[3]=R(-1,1),++i;
if((T[4]%=n)>0)T[0]+=T[2]*=f,T[1]+=T[3]*=f,fill(c,(1-T[4]/n)*c),circle(T[0],T[1],1)});t%=r/a*d}
/**/

function setup() {
  createCanvas(S=500,S);
  t = 0;
  div = 5;
  a = .05;
  b = a/div;
  l = S/3;
  half = S/2;
  r = PI*2;
  n = 100;
  p = Array();
  for( i = 0; i++ < n; ) {
    p.push([0, 0, 0, 0, 0]);
  }
}

function draw() {
  background(0);
  noStroke();
  x = sin(t*a)*l+half;
  y = sin(t++*b)*l+half;
  i = 0;
  p.some(T=>{
    if(i < 1 && ++T[4] == 1) {
      T[0] = x + R();
      T[1] = y + R();
      T[2] = R();
      T[3] = R();
      ++i;
    }
    T[4] %= n;
    if(T[4] > 0) {
      T[0] += T[2] *= .99;
      T[1] += T[3] *= .99;
      fill(255, (1-T[4]/n)*255);
      circle(T[0], T[1], 1);
    }
  });
  t %= r/a*div;
}

function R() {
  return random(-1,1);
}
/**/
