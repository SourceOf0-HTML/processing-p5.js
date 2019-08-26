
function setup() {
  createCanvas(S=500, S);
  d = [];
  init(d, 3);
  noStroke();
  background(0);
}

function draw() {
  background(0, 20);
  push();
  blendMode(ADD);
  move(d);
  pop();
}

function init(D, L, T=0) {
  c = (T)? T.c+1 : 1;
  n = (3-c);
  for( i=0; i < n*30+c; ) {
    D[i++] = t = {
      c: c,
      p: (T)? T.p.copy() : createVector(S/2, S/4),
      v: p5.Vector.random3D().mult(L)
    };
    t.l = t.v.mag();
  }
}

function move(D) {
  D.some(T=>{
    m = T.v.mag();
    if(m > (3-T.c)*0.1) {
      T.p.add(T.v.mult(0.98));
      r = 3-m/4-T.c;
      fill(50*r+200, 50*r+80, 50);
      circle(T.p.x, T.p.y+=T.c*0.2, T.v.z);
    } else if(T.d) {
      move(T.d);
    } else if(T.c < 3) {
      init(T.d=[], T.l*0.7, T);
    }
  });
}

/**/
