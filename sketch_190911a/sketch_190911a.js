
setup=_=>{createCanvas(500,500);o=new p5.SawOsc();o.amp(0);o.start();t="";c=f=0}
draw=_=>{background(10);c%=30;c++==0?f=!f:0;fill(0,255,0);textSize(30);text(t+(f?"":"_"),0,30)}
keyPressed=_=>{C=keyCode;K=key;C==8?(p(60),t=t.slice(0,-1)):C==13?t+="\n":K.length==1?(!/\s/.exec(K)?p(69):0,t+=K):0}
p=v=>{o.freq(midiToFreq(v));o.amp(.8);o.amp(0,.03,.03)}
/**/
/*
setup=_=>{o=new p5.SawOsc();o.amp(0);o.start();t=""}
draw=_=>{clear();fill(0);text(t,0,9)}
keyPressed=_=>{C=keyCode;K=key;C==8?(p(261),t=t.slice(0,-1)):C==13?t+="\n":K.length==1?(!/\s/.exec(K)?p(440):0,t+=K):0}
p=v=>{o.freq(v);o.amp(.8);o.amp(0,.03,.03)}
/**/
/*
function setup() {
  createCanvas(S=500,S);
  t = "";

  osc = new p5.SawOsc();
  osc.amp(0);
  osc.start();

  D = 30;
  c = 0;
  f = 0;
}

function draw() {
  background(10);

  if(c++ == 0) {
    f = !f;
  }
  c %= D;
  b = f ? "" : "_";
  
  fill(0,255,0);
  textSize(30);
  text(t + b, 0, 30);
}

function keyPressed() {
  if(keyCode == 8) { // Backspace
    setSound(60);
    t = t.slice(0,-1);
  } else if(keyCode == 13) {  // Enter
    t += "\n";
  } else if(key.length == 1) {
    if(!/\s/.exec(key)) {  // Not Space character
      setSound(69);
    }
    t += key;
  }
}

function setSound(v) {
  osc.freq(midiToFreq(v));
  osc.amp(0.8);
  osc.amp(0,0.03,0.03);
}
/**/
