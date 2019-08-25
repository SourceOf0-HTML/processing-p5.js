
setup=_=>{R=random;V=createVector;createCanvas(S=500,S);s(d={l:5})}
draw=_=>{background(0,50);stroke(255);m(d,mouseX,mouseY,0)}
s=(D,n=0)=>{
  D.d=[];
  for(let i=0;i<D.l;i++){
    D.d[i]={c:0,l:10};
    if(!n){
      s(D.d[i],n+1)
    }
  }
}
m=(D,x,y,n)=>{
  D.i=0;
  D.d.some(T=>{
    if(!D.i){
      if(++T.c==1) {
        i(T,x,y,0),++D.i;
      } else {
        if(!n)m(T,T.p.x,T.p.y,1);
        T.p.add(T.v.mult(.95)),circle(T.p.x,T.p.y,1);
      }
        if(T.v.mag()<.5){
          T.c=0;
          if(!n)T.d.some(I=>{i(I,T.p.x,T.p.y,1)});
        }
    }
  })
}
i=(T,x,y,n)=>{
  T.p=V(x,y),T.v=V(R((1-n)*4,(1-n)*8+2)).rotate(R(PI*2));
}
/**/
