/*
setup=_=>{createCanvas(S=500,S);H=S/2;P=TAU;m=new p5.AudioIn();m.start();m.connect();new p5.Reverb().process(m);f=new p5.FFT();colorMode(HSB)}
draw=_=>{clear();w=f.waveform();for(i=0;i<w.length;++i){r=i/w.length;stroke(sin(r*P)*40+210,100,100);p=createVector(w[i]*S+H/2).rotate(r*P-PI/2);circle(p.x+H,p.y+H,1)}}
/**/

setup=_=>{createCanvas(S=500,S);H=S/2;m=new p5.AudioIn();m.start();m.connect();new p5.Reverb().process(m);f=new p5.FFT()}
draw=_=>{clear();w=f.waveform();l=w.length;for(i=0;i<l;++i){r=i/l;p=createVector(w[i]*S+H/2).rotate(r*TAU-PI/2);circle(p.x+H,p.y+H,1)}}
/**/
/*
function setup() {
  createCanvas(S=500,S);
  H = S/2;
  
  mic = new p5.AudioIn();
  mic.start();
  mic.connect();
  
  reverb = new p5.Reverb();
  reverb.process(mic);
  
  fft = new p5.FFT();
  
  colorMode(HSB);
}

function draw() {
  clear();
  waveform = fft.waveform();
  for(i = 0; i< waveform.length; ++i) {
    ratio = i/waveform.length;
    stroke(sin(ratio*TAU)*40 + 210, 100, 100);
    pos = createVector(waveform[i]*S + H/2).rotate(ratio*TAU - PI/2);
    circle(pos.x + H, pos.y + H, 1);
  }
}
/**/
