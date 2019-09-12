
function setup() {
  createCanvas(S=500, S);
  H = S/2;
  
  num = 8;
  osc = [];
  envelope = [];
  for(i = 0; i < num; ++i) {
    osc[i] = new p5.SinOsc();
    envelope[i] = new p5.Envelope();
    envelope[i].setADSR(0.001, 0.5, 0.1, 0.5);
    envelope[i].setRange(1, 0);
  }
  i = 0;
  envelope[i++].setRange(0.65, 0);
  envelope[i++].setRange(1.0, 0);
  envelope[i++].setRange(0.7, 0);
  envelope[i++].setRange(0.42, 0);
  envelope[i++].setRange(0.5, 0);
  envelope[i++].setRange(0.38, 0);
  envelope[i++].setRange(0.3, 0);
  envelope[i++].setRange(0.12, 0);
  
  scaleArray = [60, 62, 64, 65, 67, 69, 71, 72];
  note = 0;
  
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
    midiValue = scaleArray[note];
    freqValue = midiToFreq(midiValue);
    i = 0;
    osc[i++].freq(freqValue * 440/440);
    osc[i++].freq(freqValue * 880/440);
    osc[i++].freq(freqValue * 1320/440);
    osc[i++].freq(freqValue * 1760/440);
    osc[i++].freq(freqValue * 2200/440);
    osc[i++].freq(freqValue * 2640/440);
    osc[i++].freq(freqValue * 3080/440);
    osc[i++].freq(freqValue * 3520/440);
    for(i = 0; i < num; ++i) {
      if(!t) {
        osc[i].start();
      }
      envelope[i].play(osc[i], 0, 0.1);
    }
    note = (note + 1) % scaleArray.length;
    ++t;
  }, 1000);
}
/**/
