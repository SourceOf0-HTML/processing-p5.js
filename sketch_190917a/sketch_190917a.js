/*
setup=_=>createCanvas(S=500,S),D=10,m=n=x=y=u=v=r=f=0
draw=_=>{R=r;if(mouseIsPressed){m=mouseX;n=mouseY;!f?(f=1,x=m,y=n):0;u+=(m-x)/2;v+=(n-y)/2;u/=2;v/=2;r=25-sqrt(u*u+v*v)*.7;i=D;while(--i)strokeWeight(R+=(r-R)/D),line(x,y,x+=u/D,y+=v/D)}else if(f){u=v=f=0}}
/**/

function setup() {
  createCanvas(S=500,S);
  distance = 10;
  spring = 0.5;
  friction = 0.5;
  mX = mY = x = y = ax = ay = r = f = 0;
}

function draw() {
  oldR = r;
  if(mouseIsPressed) {
    mX = mouseX;
    mY = mouseY;
    if(!f) {
      f = 1;
      x = mX;
      y = mY;
    }
    ax += ( mX - x ) * spring;
    ay += ( mY - y ) * spring;
    ax *= friction;
    ay *= friction;
    r = 25 - sqrt( ax*ax + ay*ay ) * 0.7;
  
    for( i = 0; i < distance; ++i ) {
      oldX = x;
      oldY = y;
      x += ax / distance;
      y += ay / distance;
      oldR += ( r - oldR ) / distance;
      strokeWeight( oldR );
      line( x, y, oldX, oldY );
    }
  } else if(f) {
    ax = ay = f = 0;
  }
}
/**/
