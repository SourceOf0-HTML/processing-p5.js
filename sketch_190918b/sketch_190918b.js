/*
t=0
draw=_=>{p=text;f=fill;createCanvas(S=500,S);D=S/20;textSize(s=S/15);B=n=~~(++t/30);X=n.toString(16);c=0;for(x=S-D;x>0;x-=D){a=B&1;f(a?0:255);rect(x,s*6,D,D*2);B>>=1;f(0);p(a,x,s*6);++c%4?0:(p(X.slice(-1),x,s*5),X=X.slice(0,-1),x-=D)}p(n,S/2,s*3)}
/**/

function setup() {
  createCanvas(S=500,S);
  D = S/20;
  n = 0;
  t = 0;
  textSize(s = S/15);
}

function draw() {
  clear();
  
  X = n.toString(16);
  B = n.toString(2);
  c = 0;
  for(x=S-D;x>0;x-=D) {
    a = B.slice(-1);
    B = B.slice(0,-1);
    fill(a==1?0:255);
    rect(x,s*6,D,D*2);
    fill(0);
    text(a,x,s*6);
    if(++c%4==0) {
      i = X.slice(-1);
      X = X.slice(0,-1);
      text(i,x,s*5);
      x -= D;
    }
  }
  text(n,S/2,s*3);
  if(++t%30 == 0) {
    ++n;
  }
}
/**/
