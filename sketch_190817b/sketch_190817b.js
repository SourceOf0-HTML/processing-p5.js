/*
function setup(){x=y=r=0;createCanvas(500,500)}function draw(){background(200);a=mouseX-x,b=mouseY-y,d=sqrt(pow(a,2)+pow(b,2));if(d>10){r+=360/(d/cos(PI/2-atan2(b,a)+r)*PI)*PI/90,x+=cos(r),y+=sin(r)}push(),translate(x,y),rotate(r),triangle(10,0,0,5,0,-5),pop()}
*/

function setup() {
  x = y = angle = 0;
  size = 10;
  createCanvas( 500, 500 );
}

function draw() {
  background( 200 );
  oldX = mouseX - x;
  oldY = mouseY - y;
  distance = sqrt( oldX * oldX + oldY * oldY );
  if( distance > 10 ) {
    angle += 360 / ( distance / cos( PI / 2 - atan2( oldY, oldX ) + angle ) * PI ) * PI / 90;
    x += cos( angle );
    y += sin( angle );
  }
  push();
  translate( x, y );
  rotate( angle );
  triangle(size, 0, 0, size/2, 0, -size/2);
  pop();
}
