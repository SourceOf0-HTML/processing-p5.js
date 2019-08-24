/*
setup=()=>{M=255;p=[];l=100;createCanvas(S=500,S);i=0;while(++i<l){p[i]={x:S/2,y:S/5,u:random(-2,2),v:random(-2,2),d:1}}}
draw=()=>{i=0;while(++i<l){T=p[i];d=T.d*=F=.995;stroke((1-d)*M,d*M,M);strokeWeight(d*8);line(T.x,T.y,T.x+=T.u*=F,T.y+=(T.v*=F)+1)}}
/**/


function setup() {
  canvasSize = 500;
  createCanvas( canvasSize, canvasSize );
  
  pos = [];
  num = 100;
  speed = 2;
  i = 0;
  while(++i<num) {
    pos[i] = {
      x: canvasSize / 2,
      y: canvasSize / 5,
      aX: random( -speed, speed ),
      aY: random( -speed, speed ),
      weight: 1
    }
  }
}

function draw() {
  i = 0;
  while(++i < num) {
    target = pos[i];
    target.aX *= .995;
    target.aY *= .995;
  
    oldX = target.x;
    oldY = target.y;
    target.x += target.aX;
    target.y += target.aY + 1;
    
    target.weight *= .995;
    weight = target.weight;
    
    stroke( (1-weight)*255, weight*255, 255, 255 );
    strokeWeight( weight*8 );
    line( target.x, target.y, oldX, oldY );
  }
}
/**/
