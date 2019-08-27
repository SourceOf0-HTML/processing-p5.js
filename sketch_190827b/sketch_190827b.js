setup=_=>{
  createCanvas(S=500,S);
  H=S/2;P=PI*2;t=0;
}
draw=_=>{
  clear();
  strokeWeight(2);
  for(i=0;i<P;i+=PI/999) {
    C=255;
    stroke(C*(1-i/P),0,C*i/P);
    point(sin(i+t/sin(t))*H+H,cos(t+i)*H+H);
  }
  textSize(20);
  text(t,H,H);
  t+=0.002;
}
