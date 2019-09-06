
draw=_=>{r=random;createCanvas(S=500,S);H=S/2;textAlign(C=CENTER,C);x=r(-5,5)+H;y=r(-5,5)+H;fill(0);j=9;while(--j){d=p5.Vector.random2D();p=d.copy();s=r(.1);l=r(H);i=0;while(i++<S){i>l?circle(p.x+x,p.y+y,(i-l)*s):0;p.add(d)}}textSize(H/2);text("😱",x,y)}
/**/
/*
function setup() {
  createCanvas(S=500,S);
  H=S/2;
  textAlign(CENTER, CENTER);
}

function draw() {
  clear();
  x = random(-5, 5) + H;
  y = random(-5, 5) + H;
  fill(0);
  for(j = 0; j < 9; ++j) {
    d = p5.Vector.random2D();
    p = d.copy();
    s = random(0.1);
    l = random(H);
    for(i = 0; i < S; ++i) {
      if(i > l) {
        circle(p.x + x, p.y + y, (i-l)*s);
      }
      p.add(d);
    }
  }
  textSize(H/2);
  text("😱",x,y);
}
/**/
