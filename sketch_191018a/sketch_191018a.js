/*
setup=_=>{createCanvas(S=500,S);o=new p5.SinOsc();o.amp(e=new p5.Envelope());e.setADSR(.001,.3,.01,.3);o.start();t=v=s=0;f=r}
draw=_=>{clear();++t;!(t%60)?(n(!(t%240)?(v=60,f=c,72):(v=9,f=r,60)),s=0):0;s+=v*=.85;strokeWeight(v*3);translate(H=S/2,H);rotate(v/5);f()}
n=h=>{o.freq(midiToFreq(h));e.play(o)}
c=_=>circle(0,0,s)
r=_=>square(-s,-s,s*2)
/**/
/*
setup=_=>{createCanvas(S=500,S,WEBGL);o=new p5.SinOsc();o.amp(e=new p5.Envelope());e.setADSR(.001,.3);o.start();t=v=s=0}
draw=_=>{clear();++t%60?s+=v*=.85:(o.freq(t%240?(v=9,261):(v=30,523)),e.play(o),s=0);strokeWeight(v*3);rotate(v/9);box(s)}
/**/

function setup() {
  createCanvas(S=500, S);
  H = S/2;
  t = 0;
  
  envelope = new p5.Envelope();
  envelope.setADSR(0.001, 0.3, 0.01, 0.3);

  osc = new p5.SinOsc();
  osc.amp(envelope);
  osc.start();
  
  v = 0;
  s = 0;
  f = r;
}

function draw() {
  clear();
  ++t;
  if(t%240==0) {
    setSound(72);
    v = 60;
    s = 0;
    f = c;
  } else if(t%60==0) {
    setSound(60);
    v = 9;
    s = 0;
    f = r;
  }
  s+=v*=0.85;
  strokeWeight(v*3);
  translate(H, H);
  rotate(v/5);
  f();
}

function setSound(note) {
  osc.freq(midiToFreq(note));
  envelope.play(osc);
}
c=_=>{circle(0, 0, s)}
r=_=>{square(-s, -s, s*2)}
/**/
