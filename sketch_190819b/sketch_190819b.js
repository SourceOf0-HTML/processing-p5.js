/*
setup=()=>{S=500;l=100;s=10;F=.98;createCanvas(S,S);background(0);mousePressed(0,0)}
draw=()=>{background(0,10);j=0;while(++j<l){T=p[j];a=T.x;b=T.y;u=T.u*=F;v=T.v*=F;T.x+=u;T.y+=v+1;d=T.d*=F;w=d*5;i=0;
while(i++<5){o=50/i;push();blendMode(ADD);stroke(o+(1-d)*100,o+50,o+d*250,o);strokeWeight(w*=1.5);line(T.x,T.y,a,b);pop()}}}
mousePressed=(e,h=1)=>{p=[];i=0;while(++i<l){p[i]={mX:m=mouseX,mY:n=mouseY,x:m,y:n,u:random(-s,s),v:random(-s,s),d:random(h*.5,h)}}}
/**/

function setup() {
  createCanvas( 500, 500 );
  background( 0 );
  mousePressed( 0, 0 );
}

function draw() {
  background( 0, 10 );
  j = 0;
  while(++j<num) {
    target = pos[j];
    target.aX *= .98;
    target.aY *= .98;
  
    oldX = target.x;
    oldY = target.y;
    target.x += target.aX;
    target.y += target.aY + 1;
    
    target.d *= .98;
    w = target.d*5;
    i = 0;
    
    while(i++<5) {
      base = 50/i;
      push();
      blendMode(ADD);
      stroke( base + (1-target.d)*100, base+50, base + target.d*250, base );
      strokeWeight( w*=1.5 );
      line( target.x, target.y, oldX, oldY );
      pop();
    }
  }
}

function mousePressed(e, setD=1) {
  pos = [];
  num = 100;
  speed = 10;
  m = mouseX;
  n = mouseY;
  i = 0;
  while(++i<num) {
    pos[i] = {
      x: m,
      y: n,
      aX: random(-speed, speed),
      aY: random(-speed, speed),
      d: random(setD*.5, setD)
    }
  }
}
/**/
