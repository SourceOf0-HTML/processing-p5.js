/*
setup=()=>{createCanvas(S=500,S);p=[];background(0);blendMode(ADD);r=random;i=0;while(i++<300){p[i]={x:S/2,y:S/3,v:createVector(r(7)).rotate(r(7))}}}
draw=()=>{p.forEach(T=>{T.v.mult(.98);strokeWeight(d=T.v.mag());stroke((10-d)*250,d*30,50,50);line(T.x,T.y,T.x+=T.v.x,T.y+=T.v.y+1)})}
/**/

setup=()=>{createCanvas(S=500,S);p=[];background(0);r=random;for(i=0;i<900;){p[i++]={x:S/2,y:S/3,v:createVector(r(15)).rotate(r(7))}}}
draw=()=>{p.forEach(T=>{strokeWeight(d=T.v.mult(.9).mag());stroke((15-d)*255,d*99,50);line(T.x,T.y,T.x+=T.v.x,T.y+=T.v.y+.3)})}
/**/

/*
function setup() {
  canvasSize = 500;
  createCanvas( canvasSize, canvasSize );
  pos = [];
  num = 300;
  background( 0 );
  blendMode( ADD );
  r = random;
  i = 0;
  while( i++ < num ) {
    pos[i] = {
      x: canvasSize/2,
      y: canvasSize/3,
      v: createVector(r(7)).rotate(r(PI*2))
    }
  }
}

function draw() {
  j = 0;
  while(j++<num) {
    target = pos[j];
  
    oldX = target.x;
    oldY = target.y;
    target.x += target.v.x;
    target.y += target.v.y + 1;
    
    target.v.mult( .98 );
    d = target.v.mag();
    strokeWeight( d );
    stroke( (10-d)*250, d*30, 50, 50 );
    line( target.x, target.y, oldX, oldY );
  }
}
/**/
