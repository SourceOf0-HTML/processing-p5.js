/*
setup=_=>{createCanvas(S=500,S);R=20;P=10;p=[];for(y=0;y<P;++y)for(x=0;x<P;)p[x+y*P]=m(S/2-P*R/2+x++*R,y*R)}
draw=_=>{clear();M=mouseX;N=mouseY;for(Y=0;Y<P;++Y){for(X=0;X<P;++X){T=G(X,Y);Y?T.f?(T.x=M,T.y=N):(T.y+=5,s(1,1),s(),s(-1,1),s(1),s(-1,0,R),s(1,0,R),s(0,1,R),s(0,-1,R)):0;circle(T.x,T.y,2)}}}
mousePressed=_=>(T=p.find(T=>dist(T.x,T.y,M,N)<R))?T.f=1:0
mouseReleased=_=>p.some(T=>{T.f=0})
m=(x,y)=>({x,y,u:0,v:0,f:0})
C=a=>a>=0&&a<P;
G=(i,j)=>p[i+j*P];
s=(c=-1,d=-1,r=R*sqrt(2))=>{if(C(c+=X)&&C(d+=Y))A=G(X,Y),B=G(c,d),S=.01,F=.97,A.u+=(B.x-cos(e=atan2(B.y-A.y,B.x-A.x))*r-A.x)*S,A.v+=(B.y-sin(e)*r-A.y)*S,A.x+=A.u*=F,A.y+=A.v*=F,line(A.x,A.y,B.x,B.y)}
/**/

function setup() {
  createCanvas(S=500, S);
  H = S/2;
  R = 20;
  P = 10;
  pins = [];
  for(y = 0; y < P; ++y) {
    for(x = 0; x < P; ++x) {
      pins[x+y*P] = pin(H - P*R/2 + x*R, y*R);
    }
  }
}

function draw() {
  clear();
  for(y = 0; y < P; ++y) {
    for(x = 0; x < P; ++x) {
      T = getPin(x,y);
      if(y) {
        if(T.f) {
          T.x = mouseX;
          T.y = mouseY;
        } else {
          T.y += 5;
          spring(x, y, x-1, y-1, R*sqrt(2));
          spring(x, y, x+1, y+1, R*sqrt(2));
          spring(x, y, x-1, y+1, R*sqrt(2));
          spring(x, y, x+1, y-1, R*sqrt(2));
          spring(x, y, x-1, y, R);
          spring(x, y, x+1, y, R);
          spring(x, y, x, y+1, R);
          spring(x, y, x, y-1, R);
        }
      }
      circle(T.x, T.y, 2);
    }
  }
}

function mousePressed() {
  if(T = pins.find(T=>dist(T.x, T.y, mouseX, mouseY) < R)) {
    T.f = 1;
  }
}

function mouseReleased() {
  pins.forEach(T=>T.f=0);
}

pin=(x, y)=>({
  x,
  y,
  vx : 0,
  vy : 0,
  f  : 0
});
check=(a)=>(a >= 0 && a < P);
getPin=(x,y)=>pins[x+y*P];

function spring(a, b, c, d, r) {
  if(check(c) && check(d)) {
    A = getPin(a,b);
    B = getPin(c,d);
    S = 0.01;
    F = 0.97;
    angle = atan2(B.y - A.y, B.x - A.x);
    tx = B.x - cos(angle) * r;
    ty = B.y - sin(angle) * r;
    A.vx += (tx - A.x) * S;
    A.vy += (ty - A.y) * S;
    A.x += A.vx *= F;
    A.y += A.vy *= F;
    line(A.x, A.y, B.x, B.y);
  }
}
/**/
