
setup=_=>{createCanvas(S=500,S,WEBGL);P=PI/5;L=80}
draw=_=>{clear();orbitControl();m(L,0)}
m=(l,i,j=0)=>{push();i?(rotateX(sin(P*i)*.7),rotateZ(cos(P*i)*.7)):0;stroke(255*(1-l/L),0,0);line(0,0,0,-l);translate(0,-l);if(l>20){while(j<5)m(l*.7,++j*2+1)}pop()}
/**/
/*
function setup() {
  createCanvas(S=500, S, WEBGL);
  P = PI*2;
  L = 80;
}

function draw() {
  clear();
  orbitControl();
  m(L, 0);
}

function m(l, i) {
  push();
  if(i) {
    rotateX(sin(P/10*i)*0.7);
    rotateZ(cos(P/10*i)*0.7);
  }
  r = l/L;
  stroke(255*(1-r), 0, 0);
  line(0, 0, 0, 0, -l, 0);
  translate(0, -l, 0);
  
  if( l > 20 ) {
    for(let j = 0; j < 5; ++j) {
      m(l*0.7, j*2+1);
    }
  }
  pop();
}
/**/
