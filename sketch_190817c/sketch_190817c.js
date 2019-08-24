/*
function setup(){S=500,M=255,a=b=0;createCanvas(S,S);background(M)}
function draw(){x=mouseX,y=mouseY;stroke(0,0,255);strokeWeight(10);line(x,y,a,b);a=x,b=y;push();noStroke();blendMode(ADD);fill([M,M,M,5]);rect(0,0,S,S);fill([100,0,0,10]);rect(0,0,S,S);pop()}
*/


function setup() {
  oldX = oldY = 0;
  canvasSize = 500;
  createCanvas( canvasSize, canvasSize );
  background( 255 );
}

function draw() {
  x = mouseX;
  y = mouseY;
  stroke( 0, 0, 255 );
  strokeWeight( 10 );
  line( x, y, oldX, oldY );
  oldX = x;
  oldY = y;
  push();
  noStroke();
  blendMode( ADD );
  fill( 255, 5 );
  rect(0, 0, canvasSize, canvasSize);
  fill( [100, 0, 0, 10] );
  rect(0, 0, canvasSize, canvasSize);
  pop();
}
