function setup() {
  createCanvas(S=500,S);
  d=[];
  l=0;
  c=false;
  strokeCap(SQUARE);
}

function draw() {
  background(G=c?0:255);
  for(i=0;i<l;) {
    T=d[i];
    strokeWeight(T.v*3);
    T.t+=T.v*=0.9;
    push();
    blendMode(DIFFERENCE);
    translate(T.x,T.y);
    rotate(T.t/100*T.r);
    if(T.f) {
      fill(255);
      noStroke();
    } else {
      noFill();
      stroke(255);
    }
    T.s();
    pop();
    if(T.v<0.01) {
      d.splice(i,1);
      --l;
      if(T.f) {c=!c}
    } else {
      ++i;
    }
  }
}

function mousePressed() {
  d[l++] = {
    x:mouseX,
    y:mouseY,
    r:random([-1,1]),
    f:F=random([1,0,0,0,0,0,0,0]),
    v:random(S/15)+F*S/5+1,
    t:0,
    s:random([
      ()=>{circle(0,0,T.t)},
      ()=>{square(-T.t/2,-T.t/2,T.t)},
      ()=>{rect(-T.t,(T.f?T.v*4-S*2:0),T.t*2,(T.f?S*4-T.v*8:0))},
      ()=>{triangle(cos(0)*T.t,sin(0)*T.t,
                   cos(TAU/3)*T.t,sin(TAU/3)*T.t,
                   cos(TAU/3*2)*T.t,sin(TAU/3*2)*T.t)}
    ]),
  };
}
/**/
