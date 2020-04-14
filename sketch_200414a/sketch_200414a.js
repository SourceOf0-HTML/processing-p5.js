/*
setup=_=>{createCanvas(S=500,S),W=S/9,M=99,b=[],F=p=0,textAlign(CENTER)}
draw=_=>{clear(),text(p,H=S/2,H),b.some((T,i)=>{c=W/2,circle(i%9*W+c,~~(i/9)*W+c,W*T/M),(i-~~(mouseX/W)-~~(mouseY/W)*9)?0:(p+=T,T=0),b[i]=T?--T:0}),++F%(M/6)?0:(b[~~random(81)]=M)}
/**/

function setup() {
  createCanvas(S=500,S);
  W=S/9;
  M=99;
  b=[];
  F=p=0;
  textAlign(CENTER);
}
function draw() {
  clear();
  text(p,H=S/2,H);
  b.some((T,i)=>{
    c=W/2;
    circle(i%9*W+c,~~(i/9)*W+c,W*T/M);
    (i-~~(mouseX/W)-~~(mouseY/W)*9)?0:(p+=T,T=0);
    b[i]=T?--T:0;
  });
  ++F%(M/6)?0:(b[~~random(81)]=M);
}
/**/
