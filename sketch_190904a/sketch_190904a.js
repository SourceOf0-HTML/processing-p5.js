/*
setup=_=>{c=createVector;s=sphere;t=translate;f=fill;createCanvas(S=500,S,WEBGL);H=S/2;K=.08;v=c();p=c();noStroke()}
draw=_=>{clear();ambientLight(C=60,C,C);pointLight(M=255,M,M,0,0,H);f(220);t(0,0,-H);rotateX(p.add(v.add((atan2(H-mouseY,H)-p.x)*K,(atan2(mouseX-H,H)-p.y)*K).mult(.8)).x);rotateY(p.y);s(R=H/2);t(0,0,D=H/3);f(80,200);s(R*.5);t(0,0,D/4);f(0);s(R*.2)}
/**/

setup=_=>{s=sphere;t=translate;f=fill;a=atan2;createCanvas(S=500,S,WEBGL);H=S/2;x=y=u=v=0;noStroke()}
draw=_=>{clear();f(220);u+=a(H-mouseY,H)-x;v+=a(mouseX-H,H)-y;u*=.8;v*=.8;rotateX(x+=u);rotateY(y+=v);s(R=H/4);t(0,0,D=H/6);f(80,200);s(R/2);f(0);s(R*.35)}
/**/
/*
function setup() {
  createCanvas(S=500,S,WEBGL);
  H=S/2;
  K=0.08;
  F=0.8;
  D=H/3;
  R=H/2;
  v=createVector();
  p=createVector();
  noStroke();
}

function draw() {
  clear();
  ambientLight(60, 60, 60);
  pointLight(255, 255, 255, 0, 0, H);
  
  fill(220);
  translate(0,0,-H);
  v.x += (atan2(H-mouseY, H) - p.x) * K;
  v.y += (atan2(mouseX-H, H) - p.y) * K;
  p.add(v.mult(F));
  rotateX(p.x);
  rotateY(p.y);
  sphere(R);
  translate(0,0,D);
  fill(80,200);
  sphere(R*0.5);
  translate(0,0,D/4);
  fill(0);
  sphere(R*0.2);
}
/**/
