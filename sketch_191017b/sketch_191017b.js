/*
setup=_=>{createCanvas(S=500,S,WEBGL);H=S/2;p=[];noStroke()}
draw=_=>{clear();p.some(T=>{push();T.v+=2;T.z<-4000?T.v*=-1.5:0;T.v*=0.99;fill(abs(T.z/15));translate(T.x, T.y, T.z-=T.v);sphere(50);pop()})}
mouseDragged=_=>p.push({x:mouseX-H,y:mouseY-H,z:0,v:0})
/**/

function setup() {
  createCanvas(S=500,S,WEBGL);
  H=S/2;
  p=[];
  l=0;
  noStroke();
}

function draw() {
  clear();
  for(i=0;i<l;++i) {
    T = p[i];
    push();
    T.v+=2;
    if(T.z<-4000) T.v*=-1.5;
    T.v*=0.99;
    fill(abs(T.z/15));
    translate(T.x, T.y, T.z-=T.v);
    sphere(50);
    pop();
  }
}

function mouseDragged() {
  p[l++] = {x:mouseX-H,y:mouseY-H,z:0,v:0};
}
/**/
