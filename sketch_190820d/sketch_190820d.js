/*
setup=()=>{createCanvas(S=500,S)}
draw=()=>{d=new Date();background(255);circle(S/2,S/2,S/2-25);m(15,150,d.getHours()%12/12);m(10,200,d.getMinutes()/60);m(2,200,d.getSeconds()/60)}
m=(w,h,r)=>{push();translate(S/2,S/2);rotate(r*PI*2);rect(-w/2,0,w,-h);pop()}
/**/

function setup() {
  canvasSize = 500;
  createCanvas(canvasSize, canvasSize);
}

function draw() {
  date = new Date();
  background(255);
  circle(canvasSize/2,canvasSize/2,canvasSize/2-25);
  move(15, 150, date.getHours()%12/12);
  move(10, 200, date.getMinutes()/60);
  move(2 , 200, date.getSeconds()/60);
}

function move(w, h, ratio) {
  push();
  translate( canvasSize/2, canvasSize/2 );
  rotate(ratio*PI*2);
  rect(-w/2, 0, w, -h);
  pop();
}
/**/
