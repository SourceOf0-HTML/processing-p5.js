/*
setup=_=>{V=createVector;createCanvas(S=500,S);P=1.618033988749895}
draw=_=>{n=[];o=c(d(V(-S/2),V(S/2,S*tan(TAU/5)),V(S*1.5),1));i=8;while(i--){o.some(t=>{c(t).some(T=>{n.push(T)})});o=n;n=[]}o.some(t=>v(t))}
g=(a,b)=>V(a.x+(b.x-a.x)*(P-1),a.y+(b.y-a.y)*(P-1))
d=(a,b,c,k)=>({a,b,c,k})
c=T=>T.k?[d(p=g(T.b,T.a),T.c,T.a,1),d(T.c,p,T.b,0)]:[d(p=g(T.a,T.c),q=g(T.a,T.b),T.a,0),d(q,p,T.b,1),d(T.c,p,T.b,0)];
v=T=>{fill(T.k?200:255);triangle(T.a.x,T.a.y,T.b.x,T.b.y,T.c.x,T.c.y)}
/**/

function setup() {
  createCanvas(S=500,S);
  Phi=1.618033988749895;
}

function draw() {
  n = [];
  o = cut(d(createVector(-S*0.5),createVector(S/2,S*tan(TAU/5)),createVector(S*1.5),1));
  i=8;
  while(i--){
    o.some(t=>{cut(t).some(T=>{n.push(T)})});
    o=n;
    n=[];
  }
  o.some(t=>view(t));
}

g=(a,b)=>createVector(a.x+(b.x-a.x)*(Phi-1), a.y+(b.y-a.y)*(Phi-1));
d=(a,b,c,k)=>({a,b,c,k});
cut=T=>{
  if(T.k) {
    p = g(T.b,T.a);
    return [d(p, T.c, T.a, 1), d(T.c, p, T.b, 0)];
  } else {
    p = g(T.a,T.c);
    q = g(T.a,T.b);
    return [d(p, q, T.a, 0), d(q, p, T.b, 1), d(T.c, p,T. b, 0)];
  }
}
view=T=>{
  fill(T.k?200:255);
  triangle(T.a.x,T.a.y, T.b.x,T.b.y, T.c.x,T.c.y);
}
/**/
