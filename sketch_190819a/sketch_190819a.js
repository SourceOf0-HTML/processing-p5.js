/*
setup=()=>{m=n=x=y=u=v=0,s=0.08,f=0.8;createCanvas(L=500,L);background(C=255)}
draw=()=>{u+=(m-x)*s,v+=(n-y)*s,u*=f,v*=f,a=x,b=y;strokeWeight(abs(u+v)/3+1);line(x+=u,y+=v,a,b)}
mousePressed=()=>{x=m=mouseX,y=n=mouseY}
mouseDragged=()=>{m=mouseX,n=mouseY}
/**/

function setup() {
  mX = mY = x = y = ax = ay = 0;
  spring = 0.08;
  friction = 0.8;
  createCanvas( 500, 500 );
  background( 255 );
}

function draw() {
  ax += ( mX - x ) * spring;
  ay += ( mY - y ) * spring;
  ax *= friction;
  ay *= friction;
  
  oldX = x;
  oldY = y;
  x += ax;
  y += ay;
  strokeWeight( abs( ax + ay ) / 3 + 1 );
  line( x, y, oldX, oldY );
}

function mousePressed() {
  mX = x = mouseX;
  mY = y = mouseY;
}

function mouseDragged() {
  mX = mouseX;
  mY = mouseY;
}
