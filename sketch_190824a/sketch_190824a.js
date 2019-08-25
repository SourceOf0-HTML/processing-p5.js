
setup=_=>{R=random;V=createVector;createCanvas(S=500,S);p=[];for(n=0;n<99;)p[n++]={c:0}}
draw=_=>{i=0;p.some(T=>{
if(!i&&++T.c==1)T.p=V(mouseX,mouseY),T.v=V(R(3)).rotate(R(2*PI)),++i;
if(T.c%=n)T.p.add(T.v.mult(.9)),point(T.p.x,T.p.y)})}
/**/
/*
function setup() {
  createCanvas(S=500,S);
  p = [];
  for( num = 0; num++ < 99; ) {
    p[num] = { count: 0 };
  }
}

function draw() {
  i = 0;
  p.some(T=>{
    if(i < 1 && ++T.count == 1) {
      T.pos = createVector( mouseX, mouseY );
      T.v = createVector( random(3) ).rotate( random(2*PI) );
      ++i;
    }
    T.count %= num;
    if( T.count > 0 ) {
      T.pos.add( T.v.mult(0.9) );
      stroke( 0 );
      point( T.pos.x, T.pos.y );
    }
  });
}
/**/
