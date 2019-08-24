/*
setup=()=>{r=random;l=loadPixels;u=updatePixels;createCanvas(C=500,C);textAlign(CENTER,CENTER);textSize(64);text('BOM',C/2,C/2);P=[];D=pixelDensity();S=D*C;F=.95;l();d=pixels;n=S*S;i=0;while(i++<n){P[i]={u:r(-10,10),v:r(-10,10),x:i%S,y:int(i/S),r:d[j=i*4],g:d[j+1],b:d[j+2],a:d[j+3]}}u();t=0}
draw=()=>{if(++t>100){l();d=pixels;i=0;while(i++<n){T=P[i];T.x+=T.u*=F;T.y+=T.v*=F;if(T.x>=0&&T.x<S&&T.y>=0&&T.y<S){d[j=(int(T.x)+int(T.y)*S)*4]=T.r;d[j+1]=T.g;d[j+2]=T.b;d[j+3]=T.a}}u()}}
*/
/*
setup=()=>{r=random;u=updatePixels;text('BOM',50,50);P=[];S=pixelDensity()*100;loadPixels();d=pixels;i=0;while(i++<S*S){P[i]={u:r(-1,1),v:r(-1,1),x:i%S,y:int(i/S),a:d[i*4+3]}}u()}
draw=()=>{P.forEach(T=>{d[(int(T.x+=T.u)+int(T.y+=T.v)*S)*4+3]=T.a});u()}
/**/


function setup() {
  canvasSize = 500;
  createCanvas(canvasSize, canvasSize);
  
  textAlign(CENTER, CENTER);
  textSize(64);
  text('BOM', canvasSize/2, canvasSize/2);
  
  points = [];
  density = pixelDensity();
  w = density * canvasSize;
  h = density * canvasSize;
  loadPixels();
  p = pixels;
  num = w*h;
  for(i = 0; i < num; ++i) {
    index = i*4;
    points[i] = {
      ax: random(-10,10),
      ay: random(-10,10),
      x: i%w,
      y: int(i/w),
      r: p[ index   ],
      g: p[ index+1 ],
      b: p[ index+2 ],
      a: p[ index+3 ],
    }
  }
  updatePixels();
  t = 0;
}

function draw() {
  if(t++ > 100) {
    background(255);
    loadPixels();
    p = pixels;
    for(i = 0; i < num; ++i) {
      target = points[i];
      target.ax *= .95;
      target.ay *= .95;
      target.x += target.ax;
      target.y += target.ay;
      if(target.x >= 0 && target.x < w && target.y >= 0 && target.y < h) {
        index = (int(target.x) + int(target.y)*h) * 4;
        p[ index   ] = target.r;
        p[ index+1 ] = target.g;
        p[ index+2 ] = target.b;
        p[ index+3 ] = target.a;
      }
    }
    updatePixels();
  }
}
/**/
