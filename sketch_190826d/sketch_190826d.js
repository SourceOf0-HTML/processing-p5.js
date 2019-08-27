function setup() {
  createCanvas(S=500,S);
  D=20;
  R=20;
  P=PI*2;
  H=S/2;
  x=H;
  y=H;
  noFill();
  t=0;
  background(0);
}

function draw() {
  background(0,10);
  push();
  for(i=0;i<S;i+=S/10) {
    w=(t+i)%S;
    r=w/S;
    strokeWeight(w/3);
    stroke(r*100,r*50,r*50+100,r*100);
    circle(x+cos(-t/40+i/S*P)*R, y+sin(-t/90+i/S*P)*R, w);
  }
  pop();
  t+=1;
}
/**/
