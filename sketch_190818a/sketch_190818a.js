/*
function setup(){D=10,x=y=u=v=r=0,s=0.08,f=0.8;createCanvas(L=500,L);background(C=255)}
function draw(){q=r,u+=(mouseX-x)*s,v+=(mouseY-y)*s,u*=f,v*=f,r=abs(u+v)/5,i=0;while(i++<D){background(C,5);a=x,b=y;strokeWeight(q+=(r-q)/D);line(x+=u/D,y+=v/D,a,b)}}
*/

function setup() {
  distance = 10;
  x = y = ax = ay = r = 0;
  spring = 0.08;
  friction = 0.8;
  createCanvas( 500, 500 );
  background( 255 );
}

function draw() {
  oldR = r;
  ax += ( mouseX - x ) * spring;
  ay += ( mouseY - y ) * spring;
  ax *= friction;
  ay *= friction;
  r = abs( ax + ay ) / 5;
  
  for( i = 0; i < distance; i++ ) {
    background( 255, 5 );
    oldX = x;
    oldY = y;
    x += ax / distance;
    y += ay / distance;
    oldR += ( r - oldR ) / distance;
    strokeWeight( oldR );
    line( x, y, oldX, oldY );
  }
}
