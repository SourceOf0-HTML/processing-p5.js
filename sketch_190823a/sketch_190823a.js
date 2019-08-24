/*
setup=_=>{createCanvas(S=500,S);P=PI;i=push;o=pop;t=translate;noStroke()}
draw=_=>{s=30;i();colorMode(HSB);t(p=S/2,p/=2);a=atan2(mouseY-p,mouseX-p*2)+P;m(p);o()}
m=(l)=>{rotate(a+P/2);fill(a/P*180,s+=5,100);rect(w=l*.1,0,-w*2,l);if(l>1)i(),t(0,l/2),m(l*.8,a),o()}
/**/
function setup() {
  createCanvas(S=500, S);
  noStroke();
}

function draw() {
  p = S/2;
  P = PI;
  i = 30;
  angle = atan2( mouseY - p/2, mouseX - p ) + P;
  
  push();
  colorMode(HSB);
  translate( p, p/2 );
  m( p/2, angle );
  pop();
}

function m( l ) {
  w = l * 0.1;
  rotate( angle + P/2 );
  fill( angle / P * 180, i += 5, 100 );
  rect( -w, 0, w * 2, l );
  if( l > 1 ){
    push();
    translate( 0, l/2 );
    m( l * 0.8, angle );
    pop();
  }
}
/**/
