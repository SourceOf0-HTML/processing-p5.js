
function setup() {
  createCanvas(S=500, S);
  H = S/2;
  
  keyW = H/6;
  keyH = H/3;
  offset = H - keyW * 4;
  
  num = 0;
  keys = [];
  keys[  num] = keyRect(60, keyW * num + offset, H, keyW, keyH);
  keys[++num] = keyRect(62, keyW * num + offset, H, keyW, keyH);
  keys[++num] = keyRect(64, keyW * num + offset, H, keyW, keyH);
  keys[++num] = keyRect(65, keyW * num + offset, H, keyW, keyH);
  keys[++num] = keyRect(67, keyW * num + offset, H, keyW, keyH);
  keys[++num] = keyRect(69, keyW * num + offset, H, keyW, keyH);
  keys[++num] = keyRect(71, keyW * num + offset, H, keyW, keyH);
  keys[++num] = keyRect(72, keyW * num + offset, H, keyW, keyH);
  
  keyOffset = 0;
  size = H/5;
  keyMinus = collisionRect(H - H/3 - size/2, H/2, size, size);
  keyPlus  = collisionRect(H + H/3 - size/2, H/2, size, size);
  
  envelope = new p5.Envelope();
  envelope.setADSR(0.001, 0.25, 0.01, 0.25);
  envelope.setRange(0.2, 0);

  fft = new p5.FFT();
  
  osc = new p5.TriOsc();
  osc.amp(envelope);
  osc.start();
}

function draw() {
  clear();
  
  fill( keyMinus.isHit() ? 100 : 200 );
  triangle(keyMinus.x, keyMinus.y + keyMinus.h/2, keyMinus.x + keyMinus.w, keyMinus.y, keyMinus.x + keyMinus.w, keyMinus.y + keyMinus.h);
  
  fill( keyPlus.isHit() ? 100 : 200 );
  triangle(keyPlus.x, keyPlus.y, keyPlus.x, keyPlus.y + keyPlus.h, keyPlus.x + keyPlus.w, keyPlus.y + keyPlus.h/2);
  
  fill(0);
  textAlign(CENTER, TOP);
  textSize(H/5);
  text(keyOffset, H, H/2);

  keys.forEach(T=>{
    if(T.show(T.isHit())) {
      setSound(T.note + keyOffset);
     }
  });
}

function mousePressed() {
  if(keyMinus.isHit()) {
    --keyOffset;
  }
  if(keyPlus.isHit()) {
    ++keyOffset;
  }
}

function setSound(note) {
  freqValue = midiToFreq(note);
  osc.freq(freqValue);
  envelope.play(osc, 0, 0.1);
}

keyRect=(note,x,y,w,h)=>(T=collisionRect(x,y,w,h),T.note=note,T);

collisionRect=(x,y,w,h)=>({
  x,y,
  w,h,
  isHit:function(){
    return mouseIsPressed && collision(this);
  },
  show:function(isPush){
    fill( isPush ? 220 : 255 );
    rect(this.x, this.y, this.w, this.h);
    return isPush;
  },
});

collision=T=>(mouseX > T.x && mouseX < T.x+T.w && mouseY > T.y && mouseY < T.y+T.h )?true:false;
