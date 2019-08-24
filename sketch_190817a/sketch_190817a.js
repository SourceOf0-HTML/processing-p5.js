/*
function setup(){createCanvas(500,500),p=[],n=442;for(i=0;i<n;++i){p[i]={x:(i%21)*25,y:floor(i/21)*25}}}
function draw(){background(200);for(i=0;i<n;++i){x=p[i].x,y=p[i].y;push(),translate(x,y),rotate(atan2(mouseY-y,mouseX-x)),triangle(10,0,0,5,0,-5),pop()}}
/**/

function setup() {
  canvasSize = 500;
  createCanvas(canvasSize, canvasSize);
  pos = [];
  num = 21;
  distance = canvasSize / num;
  count = num * num;
  size = 10;
  for( i = 0; i < count; ++i ) {
    pos[i] = {
      x: ( i % num ) * distance + distance / 2,
      y: floor( i / num ) * distance + distance / 2,
    }
  }
}

function draw() {
  background(200);
  for( i = 0; i < count; ++i ) {
    x = pos[i].x;
    y = pos[i].y;
    angle = atan2( mouseY - y, mouseX - x );
    push();
    translate( x, y );
    rotate( angle );
    triangle( size, 0, 0, size/2, 0 ,-size/2 ),
    pop();
  }
}
/**/
