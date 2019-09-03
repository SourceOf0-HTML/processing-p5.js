/*
setup=_=>{createCanvas(S=500,S);H=S/2;o=new p5.SinOsc();e=new p5.Envelope();e.setADSR(.001,.5,.1,.5);f=new p5.FFT();colorMode(HSB);n=t=0;s()}
draw=_=>{clear();w=f.waveform();l=w.length;for(i=0;i<l;)r=i/l,stroke(r*80+170,100,80),point(r*S,w[++i]*H/4+H)}
s=_=>{setInterval(_=>{!t?o.start():0;o.freq(midiToFreq([60,62,64,65,67,69,71,72][n]));e.play(o,0,.1);n=++n%8;++t},1e3)}
/**/

setup=_=>{S=99;H=S/2;o=new p5.SinOsc();e=new p5.Envelope();e.setADSR(.01,.5,.1);f=new p5.FFT();t=n=0;o.start()}
draw=_=>{t++%60==0?(o.freq(midiToFreq(60+[0,4,7,12][n++])),e.play(o,0,1),n%=4):0;clear();w=f.waveform();i=0;w.some(T=>{point(i++/w.length*S,T*H/4+H)})}
/**/
/*
function setup() {
  createCanvas(S=500, S);
  H = S/2;
  osc = new p5.SinOsc();

  scaleArray = [60, 62, 64, 65, 67, 69, 71, 72];
  note = 0;
  
  envelope = new p5.Envelope();
  envelope.setADSR(0.001, 0.5, 0.1, 0.5);
  envelope.setRange(1, 0);

  fft = new p5.FFT();
  
  colorMode(HSB);
  
  t = 0;
  setSound();
}

function draw() {
  clear();
  waveform = fft.waveform();
  for(i = 0; i< waveform.length; ++i) {
    ratio = i/waveform.length;
    stroke(ratio*80 + 170, 100, 80);
    point(ratio*S, waveform[i]*H/4 + H);
  }
}

function setSound() {
  setInterval(()=> {
    if(!t) {
      osc.start();
    }
    midiValue = scaleArray[note];
    freqValue = midiToFreq(midiValue);
    osc.freq(freqValue);
    envelope.play(osc, 0, 0.1);
    note = (note + 1) % scaleArray.length;
    ++t;
  }, 1000);
}
/**/
