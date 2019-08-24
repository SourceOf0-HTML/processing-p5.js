/*
setup=_=>{createCanvas(S=500,S);P=PI;i=push;o=pop;t=translate}
draw=_=>{background(0);s=0;i();colorMode(HSB);t(p=S/2,p/2);a=atan2(mouseY-p,mouseX-p)+P;m(p/2)}
m=(l)=>{rotate(a+P/2);fill(a/P*180,s+=5,100);rect(w=l*.1,0,-w*2,l);if(l>1)i(),t(0,l/2),m(l*.9,a),o()}
/**/


function setup() {
  createCanvas(S=500, S);
}

function draw() {
  background(0);
  p = S/2;
  P = PI;
  i = 0;
  angle = atan2( mouseY - p, mouseX - p ) + P;
  
  push();
  colorMode(HSB);
  translate( p, p/2 );
  m( p/2 );
  pop();
}

function m( l ) {
  w = l*.1;
  rotate( angle+P/2 );
  fill( angle/P*180, i+=5, 100 );
  rect( -w, 0, w*2, l );
  if( l>1 ){
    push();
    translate( 0, l/2 );
    m( l*.9, angle );
    pop();
  }
}
/**/
