function setup() {
  createCanvas(windowWidth, windowHeight*0.99);
  WHITE = 160;
  BLACK = 0;
  GRAY = 120;
  
  tickSpan = 4;
  noteWidth = 20;
  
  H = height/2;
  timeLinePos = H/6;
  timeLineX = timeLinePos;
  timeLineNum = 0;
  
  initController();
  initKeys();
  
  envelope = new p5.Envelope();
  envelope.setADSR(0.001, 0.25, 0.01, 0.25);
  envelope.setRange(0.2, 0);

  osc = new p5.TriOsc();
  osc.amp(envelope);
  osc.start();
}

function draw() {
  clear();
  let nowTimeLineNum = ceil((timeLineX - timeLinePos) / noteWidth);
  keys.forEach(T=>{
    T.show();
    if(startButton.isOn) {
      for(let i = timeLineNum; i < nowTimeLineNum; ++i) {
        if(T.timeline[i].isOn) setSound(T.note);
      }
    }
    T.timeline.forEach(t=>{
      t.show();
    });
  });
  timeLineNum = nowTimeLineNum;
  
  push();
  textSize(width/50);
  fill(0);
  noStroke();
  text("tick span:" + tickSpan, width/11, H/9);
  pop();

  controllers.forEach(T=>{
    T.show();
  });
  
  strokeWeight(H*0.01);
  line(timeLineX, H*0.15, timeLineX, H*1.97);
  strokeWeight(1);

  if(startButton.isOn) {
    timeLineX += (noteWidth/tickSpan) * (noteWidth/frameRate());
    if(timeLineX>width) {
      loopButton.isOn ? (timeLineX=timeLinePos):(startButton.isOn=false); 
    }
  }
}

function mousePressed() {
  let target,key,index;
  keys.forEach(T=>{
    if(T.isHit(mouseX,mouseY)) key = T;
    T.isOn = false;
    T.timeline.forEach((t,i)=>{
      if(t.isHit(mouseX,mouseY)) {
        target = t;
        index = i;
        setSound(T.note);
      }
    });
  });
  if(target) { 
    keys.forEach(T=>{
      if(T.timeline[index] != target) T.timeline[index].isOn = false;
    });
    target.isOn = !target.isOn;
  }
  
  if(key) {
    setSound(key.note);
    key.setResponse();
  }
  
  controllers.forEach(T=>{
    if(T.isHit(mouseX,mouseY)) T.isOn = !T.isOn;
    if(T.isOn) T.push();
  });
}

function setSound(note) {
  freqValue = midiToFreq(note);
  osc.freq(freqValue);
  envelope.play(osc, 0, 0.1);
}

function initController() {
  let controllerSize = H/10;
  let controllerX = width/2 - controllerSize*2.2;
  let controllerY = height*0.02;
  controllers = [];
  controllers.push(timelineButton = Object.assign(swichRect(WHITE,0,controllerY+controllerSize,width-timeLinePos,H/24),{
    show:function() {
    },
    push:function() {
      timelineButton.isOn = false;
      timeLineX = max(mouseX,timeLinePos);
    },
  }));
  controllers.push(tickDecButton = Object.assign(swichRect(WHITE,width*0.05,controllerY,controllerSize,controllerSize),{
    show:function() {
      this.setPushColor();
      triangle(this.x + this.w*0.8, this.y + this.h*0.2, this.x + this.w*0.8, this.y + this.h*0.8, this.x + this.w*0.2, this.y + this.h*0.5);
    },
    push:function() {
      tickDecButton.setResponse();
      if(tickSpan > 1) --tickSpan;
      tickDecButton.isDisable = (tickSpan <= 1);
    },
  }));
  controllers.push(tickAddButton = Object.assign(swichRect(WHITE,width*0.22,controllerY,controllerSize,controllerSize),{
    show:function() {
      this.setPushColor();
      triangle(this.x + this.w*0.2, this.y + this.h*0.2, this.x + this.w*0.2, this.y + this.h*0.8, this.x + this.w*0.8, this.y + this.h*0.5);
    },
    push:function() {
      tickAddButton.setResponse();
      ++tickSpan;
      tickDecButton.isDisable = (tickSpan <= 1);
    },
  }));
  controllers.push(startButton = Object.assign(swichRect(WHITE,controllerX,controllerY,controllerSize,controllerSize),{
    show:function() {
      this.drawRect();
      fill(BLACK);
      triangle(this.x + this.w*0.2, this.y + this.h*0.2, this.x + this.w*0.2, this.y + this.h*0.8, this.x + this.w*0.8, this.y + this.h*0.5);
    },
    push:function() {
      if(timeLineX>width) timeLineX = timeLinePos; 
    },
  }));
  controllerX += controllerSize * 1.1;
  controllers.push(pauseButton = Object.assign(swichRect(WHITE,controllerX,controllerY,controllerSize,controllerSize),{
    show:function() {
      this.drawRect();
      fill(BLACK);
      rect(this.x + this.w*0.2, this.y + this.h*0.2, this.w*0.2, this.h*0.6);
      rect(this.x + this.w*0.6, this.y + this.h*0.2, this.w*0.2, this.h*0.6);
    },
    push:function() {
      startButton.isOn = false;
      pauseButton.setResponse();
    },
  }));
  controllerX += controllerSize * 1.1;
  controllers.push(stopButton = Object.assign(swichRect(WHITE,controllerX,controllerY,controllerSize,controllerSize),{
    show:function() {
      this.drawRect();
      fill(BLACK);
      rect(this.x + this.w*0.225, this.y + this.h*0.225, this.w*0.55, this.h*0.55);
    },
    push:function() {
      startButton.isOn = false;
      timeLineX = timeLinePos;
      stopButton.setResponse();
    },
  }));
  controllerX += controllerSize * 1.1;
  controllers.push(loopButton = Object.assign(swichRect(WHITE,controllerX,controllerY,controllerSize,controllerSize),{
    show:function() {
      this.drawRect();
      fill(0);
      strokeWeight(this.w*0.15);
      triangle(this.x + this.w*0.81, this.y + this.h*0.55, this.x + this.w*0.65, this.y + this.h*0.6, this.x + this.w*0.82, this.y + this.h*0.72);
      noFill();
      arc(this.x + this.w/2, this.y + this.h/2, this.w*0.6, this.h*0.6, TAU*0.1, TAU*0.9);
      strokeWeight(1);
    },
  }));
  controllerX += controllerSize * 1.1;
  controllers.push(resetButton = Object.assign(swichRect(WHITE,controllerX,controllerY,controllerSize*2,controllerSize),{
    show:function() {
      this.drawRect();
      fill(0);
      push();
      textStyle(BOLD);
      textSize(this.w/4);
      textAlign(CENTER,CENTER);
      text("RESET",this.x + this.w/2,this.y + this.h/2);
      pop();
    },
    push:function() {
      keys.forEach(T=>{
        T.timeline.forEach(t=>{
          t.isOn = false;
        });
      });
      resetButton.setResponse();
    },
  }));
}

function initKeys() {
  let note = 60-12;
  keys = [];
  for(let i = 0; i < 3; ++i) {
    let keyW = timeLinePos;
    let keyH = H/12;
    let offset = height - keyH*1.8 - keyH * 7 * i;
    let num = 0;
    keys.push(keyRect(note   , WHITE, 0, offset - keyH * num++, keyW, keyH));
    keys.push(keyRect(note+ 2, WHITE, 0, offset - keyH * num++, keyW, keyH));
    keys.push(keyRect(note+ 4, WHITE, 0, offset - keyH * num++, keyW, keyH));
    keys.push(keyRect(note+ 5, WHITE, 0, offset - keyH * num++, keyW, keyH));
    keys.push(keyRect(note+ 7, WHITE, 0, offset - keyH * num++, keyW, keyH));
    keys.push(keyRect(note+ 9, WHITE, 0, offset - keyH * num++, keyW, keyH));
    keys.push(keyRect(note+11, WHITE, 0, offset - keyH * num++, keyW, keyH));
    offset += keyH*0.2;
    num = 0.5;
    keyW /= 2;
    keys.push(keyRect(note+ 1, BLACK, 0, offset - keyH * num++ + keyH*0.1, keyW, keyH*0.6));
    keys.push(keyRect(note+ 3, BLACK, 0, offset - keyH * num++ - keyH*0.1, keyW, keyH*0.6));
    num++;
    keys.push(keyRect(note+ 6, BLACK, 0, offset - keyH * num++ + keyH*0.1, keyW, keyH*0.6));
    keys.push(keyRect(note+ 8, BLACK, 0, offset - keyH * num++, keyW, keyH*0.6));
    keys.push(keyRect(note+10, BLACK, 0, offset - keyH * num++ - keyH*0.1, keyW, keyH*0.6));
    note += 12;
  }
}

initTimeline=(x,y,w,h)=>{
  let timeline = [];
  for(let i = x; i < width; i += w) {
    timeline.push(swichRect(timeline.length%4?GRAY:GRAY*0.7,i,y,w,h));
  }
  return timeline;
}

keyRect=(note,c,x,y,w,h)=>Object.assign(swichRect(c,x,y,w,h),{
  note,
  timeline:initTimeline(timeLinePos,y,noteWidth,h),
});

swichRect=(c,x,y,w,h)=>({
  c,
  a:255,
  x,y,
  w,h,
  isOn:false,
  isDisable:false,
  responseCount:0,
  isHit:function(targetX,targetY) {
    return !this.isDisable && this.collision(targetX,targetY);
  },
  show:function() {
    this.drawRect();
  },
  push:function() {
    // do nothing.
  },
  drawRect:function() {
    this.setPushColor();
    rect(this.x, this.y, this.w, this.h);
  },
  setResponse:function() {
    this.isOn = false;
    this.responseCount = 10;
  },
  setPushColor:function() {
    let setA = this.isDisable ? this.a/3 : this.a;
    if(this.responseCount > 0) --this.responseCount;
    fill((this.isOn || this.responseCount > 0) ? this.c : this.c + 90, setA);
    stroke(0, setA);
  },
  collision:function(targetX,targetY) {
    return targetX > this.x && targetX < this.x+this.w && targetY > this.y && targetY < this.y+this.h;
  },
});
