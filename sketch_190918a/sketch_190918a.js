/*
setup=_=>{createCanvas(S=500,S);a="text()でサイズ指定しても日本語だと改行されない問題";b=[];b[c=t=0]="";textSize(l=S/5)}
draw=_=>{clear();++t%10==0?(v=a.slice(0,1),textWidth(b[c]+v)>S?b[++c]="":0,b[c]+=v,a=a.slice(1)):0;i=c+1;while(i){text(b[i-1],0,i--*l)}}
/**/

function setup() {
  createCanvas(S=500,S);
  a = "text()でサイズ指定しても日本語だと改行されない問題";
  b = [];
  c = 0;
  b[c] = "";
  t = 0;
  textSize(l = S/5);
}

function draw() {
  clear();
  if(++t%10==0) {
    v = a.slice(0,1);
    if(textWidth(b[c]+v) > S) {
      b[++c] = "";
    }
    b[c] += v;
    a = a.slice(1);
  }
  for(i = 0; i <= c; ++i) {
    text(b[i],0,(i+1)*l);
  }
}
/**/
