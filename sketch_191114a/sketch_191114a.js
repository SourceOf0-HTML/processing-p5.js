
function setup() {
  createCanvas(windowWidth, windowHeight);
  funcIndex = 5;
  
  UI = createGraphics(width, height);
  TXT = createGraphics(width, height);
  
  clearButton = txtButtonRect("clear canvas : OFF", width-260, height*0.01, 250, 50);
  resetButton = txtButtonRect("reset property", width-200, height*0.9, 190, 50);
  
  buttons = [];
  for(let i = 0; i < 6; ++i) {
    buttons.push(txtButtonRect("draw" + (i+1), 10, height*0.4 + i * height*0.08, 100, height*0.05));
  }
  buttons[funcIndex].isPush = true;
  
  let i = 0;
  let slider;
  sliders = [];
  
  slider = sliderRect("size", 1, 100, false, width-height*0.31, height*0.15 + i++ * height*0.15, height*0.3, height*0.08);
  sliders.push(slider);
  size = 25;
  slider.setVal(size);

  slider = sliderRect("spring", 0.001, 1, false, width-height*0.31, height*0.15 + i++ * height*0.15, height*0.3, height*0.08);
  sliders.push(slider);
  spring = 0.5;
  slider.setVal(spring);
  
  slider = sliderRect("friction", 0.001, 1, false, width-height*0.31, height*0.15 + i++ * height*0.15, height*0.3, height*0.08);
  sliders.push(slider);
  friction = 0.5;
  slider.setVal(friction);
  
  slider = sliderRect("splitNum", 1, 20, true, width-height*0.31, height*0.15 + i++ * height*0.15, height*0.3, height*0.08);
  sliders.push(slider);
  splitNum = 10;
  slider.setVal(splitNum);
  
  slider = sliderRect("diff", 0, 20, false, width-height*0.31, height*0.15 + i++ * height*0.15, height*0.3, height*0.08);
  sliders.push(slider);
  diff = size/8;
  slider.setVal(diff);
  
  x = y = vx = vy = v = r = 0;
  f = false;
}

function draw() {
  UI.clear();
  
  let i = 0;
  size = sliders[i++].getVal();
  spring = sliders[i++].getVal();
  friction = sliders[i++].getVal();
  splitNum = sliders[i++].getVal();
  diff = sliders[i++].getVal();

  if(clearButton.isPush) { clear(); }
  
  switch(funcIndex) {
    case 0: draw1(); break;
    case 1: draw2(); break;
    case 2: draw3(); break;
    case 3: draw4(); break;
    case 4: draw5(); break;
    case 5: draw6(); break;
  }
  
  clearButton.draw();
  resetButton.draw();
  
  buttons.forEach((button, i)=>{
    button.draw();
  });
  
  sliders.forEach((slider,i)=>{
    slider.draw();
  });
  
  image(UI,0,0);
}


function draw1() {
  drawTxt("draw1:Only mouse coordinates");
  /*
    Parameters used
      size : Brush size
  */
  if(mouseIsPressed) {
    strokeWeight( 3 );
    circle( mouseX, mouseY, size );
  }
}

function draw2() {
  drawTxt("draw2:Move by spring motion");
  /*
    Smoother movement than using mouse coordinates
  */
  /*
    Parameters used
      size : Brush size
      spring : Spring constant(Larger value means stronger spring)
      friction : Friction(Smaller value means, the more slippery)
  */
  
  if(mouseIsPressed) {
    
    if(!f) {
      // Initialize coordinates
      f = true;
      x = mouseX;
      y = mouseY;
    }
    
    // Calculate velocity
    /* 
      MEMO : Use hook's law to make spring motion
        DistanceX = (X1 - X0)
        SpringConstant = (value between 0 and 1)
        AccelerationX = DistanceX * SpringConstant
        VelocityX = ( VelocityX + AccelerationX ) * Friction
    */
    vx += ( mouseX - x ) * spring;
    vy += ( mouseY - y ) * spring;
    vx *= friction;
    vy *= friction;
    
    x += vx;
    y += vy;
    
    // Draw at the calculated coordinates
    strokeWeight( 3 );
    circle( x, y, size );  // AMEND: mouseX, mouseY -> x, y
    
  } else if(f) {
    // Reset state
    vx = vy = 0;
    f = false;
  }
}

function draw3() {
  drawTxt("draw3:Change size according to velocity");
  /*
    When you move quickly, it gets thinner
  */
  /*
    Parameters used
      size : Brush size
      spring : Spring constant(Larger value means stronger spring)
      friction : Friction(Smaller value means, the more slippery)
  */
  
  if(mouseIsPressed) {
    if(!f) {
      f = true;
      x = mouseX;
      y = mouseY;
    }
    vx += ( mouseX - x ) * spring;
    vy += ( mouseY - y ) * spring;
    vx *= friction;
    vy *= friction;
    
    v += sqrt( vx*vx + vy*vy ) - v;  // ADD
    v *= 0.6;  // ADD
    
    r = size - v;  // ADD
    
    x += vx;
    y += vy;
    
    if(r < 1) { r = 1; }  // ADD (Set the minimum value of r to 1)
    strokeWeight( 3 );
    circle( x, y, r );  // AMEND: size -> r
    
  } else if(f) {
    vx = vy = 0;
    f = false;
  }
}

function draw4() {
  drawTxt("draw4:Connect coordinates with lines");
  /*
    Save the previous coordinates and draw a line to the new coordinates
  */
  /*
    Parameters used
      size : Brush size
      spring : Spring constant(Larger value means stronger spring)
      friction : Friction(Smaller value means, the more slippery)
  */
  
  if(mouseIsPressed) {
    if(!f) {
      f = true;
      x = mouseX;
      y = mouseY;
    }
    vx += ( mouseX - x ) * spring;
    vy += ( mouseY - y ) * spring;
    vx *= friction;
    vy *= friction;
    
    v += sqrt( vx*vx + vy*vy ) - v;
    v *= 0.6;
    
    r = size - v;
    
    oldX = x;  // ADD
    oldY = y;  // ADD
    x += vx;
    y += vy;
    
    if(r < 1) { r = 1; }
    strokeWeight( r );  // AMEND: 3 -> r
    line( x, y, oldX, oldY );  // AMEND: circle( x, y, r ) -> line( x, y, oldX, oldY )
    
  } else if(f) {
    ax = ay = 0;
    f = false;
  }
}

function draw5() {
  drawTxt("draw5:Split and smooth lines");
  /*
    Process step by step from the previous coordinates to the new coordinates
  */
  /*
    Parameters used
      size : Brush size
      spring : Spring constant(Larger value means stronger spring)
      friction : Friction(Smaller value means, the more slippery)
      splitNum : Number of divisions from old coordinates to new coordinates
  */
  
  if(mouseIsPressed) {
    if(!f) {
      f = true;
      x = mouseX;
      y = mouseY;
    }
    vx += ( mouseX - x ) * spring;
    vy += ( mouseY - y ) * spring;
    vx *= friction;
    vy *= friction;
    
    v += sqrt( vx*vx + vy*vy ) - v;
    v *= 0.6;
    
    oldR = r;  // ADD
    r = size - v;
    
    for( let i = 0; i < splitNum; ++i ) {  // ADD
      oldX = x;
      oldY = y;
      x += vx/splitNum;  // AMEND: vx -> vx/splitNum
      y += vy/splitNum;  // AMEND: vy -> vy/splitNum
      oldR += (r-oldR)/splitNum;  // ADD
      if(oldR < 1) { oldR = 1; }  // AMEND: r -> oldR
      strokeWeight( oldR );  // AMEND: r -> oldR
      line( x, y, oldX, oldY );
    }  // ADD
    
  } else if(f) {
    vx = vy = 0;
    f = false;
  }
}

function draw6() {
  drawTxt("draw6:Superimpose lines");
  /*
    Draw multiple lines with different positions and thicknesses, 
    and make it look like a brush
  */
  /*
    Parameters used
      size : Brush size
      spring : Spring constant(Larger value means stronger spring)
      friction : Friction(Smaller value means, the more slippery)
      splitNum : Number of divisions from old coordinates to new coordinates
      diff : Misalignment of different lines
  */
  
  if(mouseIsPressed) {
    if(!f) {
      f = true;
      x = mouseX;
      y = mouseY;
    }
    vx += ( mouseX - x ) * spring;
    vy += ( mouseY - y ) * spring;
    vx *= friction;
    vy *= friction;
    
    v += sqrt( vx*vx + vy*vy ) - v;
    v *= 0.6;
    
    oldR = r;
    r = size - v;
    
    for( let i = 0; i < splitNum; ++i ) {
      oldX = x;
      oldY = y;
      x += vx / splitNum;
      y += vy / splitNum;
      oldR += ( r - oldR ) / splitNum;
      if(oldR < 1) { oldR = 1; }
      strokeWeight( oldR+diff );  // AMEND: oldR -> oldR+diff
      line( x, y, oldX, oldY );
      strokeWeight( oldR );  // ADD
      line( x+diff*2, y+diff*2, oldX+diff*2, oldY+diff*2 );  // ADD
      line( x-diff, y-diff, oldX-diff, oldY-diff );  // ADD
    }
    
  } else if(f) {
    vx = vy = 0;
    f = false;
  }
}


/* -----UI----- */

collisionRect=(x,y,w,h,l=2)=>({
  x,y,
  w,h,
  lineSize:l,
  isPush:false,
  isHit:function() {
    return mouseIsPressed && this.collision();
  },
  _draw:function() {
    UI.strokeWeight(this.lineSize);
    UI.fill(this.isPush ? 150 : 255);
    UI.rect(this.x + this.lineSize, this.y + this.lineSize, this.w, this.h, 10);
  },
  draw:function() {
    this._draw();
  },
  collision:function() {
    return mouseX > this.x && mouseX < this.x+this.w && mouseY > this.y && mouseY < this.y+this.h;
  },
});

txtButtonRect=(txt,x,y,w,h)=>Object.assign(collisionRect(x,y,w,h),{
  txt,
  draw:function() {
    this._draw();
    UI.fill(0);
    UI.textAlign(LEFT, CENTER);
    UI.textSize(this.h * 0.5);
    UI.text(this.txt, this.x + 10, this.y + this.h/2 + this.lineSize);
  },
});

sliderRect=(name,val1,val2,isInt,x,y,w,h)=>Object.assign(collisionRect(x+w/2,y+h*0.4,w/20,h/2),{
  isValid:true,
  barX:x,
  barY:y,
  barH:h,
  barW:w/2,
  scope:w/2-w/10,
  isInt,
  name,
  val1,
  val2,
  draw:function() {
    UI.strokeWeight(0);
    UI.fill(this.isValid?255:100);
    UI.rect(this.barX, this.barY, this.barW*2, this.barH);
    UI.strokeWeight(this.lineSize);
    UI.fill(0);
    UI.rect(this.barX + this.barW + this.w/2, this.y + this.h/2, this.barW - this.w*2, this.lineSize*2);
    this._draw();
    UI.fill(0);
    UI.textSize(this.h*0.7);
    UI.textAlign(LEFT, TOP);
    UI.text(this.val1, this.barX + this.barW - this.w, this.barY);
    UI.text(this.name, this.barX + 4, this.barY);
    UI.textAlign(RIGHT, TOP);
    UI.text(this.val2, this.barX + this.barW*2 - 4, this.barY);
    UI.textAlign(CENTER, TOP);
    UI.text(this.getVal().toFixed(3), this.barX + this.barW/2, this.barY + this.barH/2);
  },
  getVal:function() {
    let val = (this.x-this.barX-this.barW)/this.scope*(this.val2-this.val1) + this.val1;
    return this.isInt?round(val):val;
  },
  setVal:function(val) {
    if(this.isInt) { val = round(val); }
    this.x = this.barX + this.barW + norm(val, this.val1, this.val2)*this.scope;
  },
  move:function() {
    this.x = max(this.barX + this.barW, min(this.barX + this.barW*2 - this.w*2, mouseX - this.w/2));
  },
  setSize(x,y,w,h) {
    let val = this.getVal();
    this.y = y+h*0.4;
    this.w = w/20;
    this.h = h/2;
    this.scope = w/2-w/10;
    this.barX = x;
    this.barY = y;
    this.barH = h;
    this.barW = w/2;
    this.setVal(val);
  },
});


drawTxt=(txt)=>{
  let size = width/txt.length;
  let marginX = 10;
  let marginY = 5;
  TXT.clear();
  TXT.textAlign(LEFT, TOP);
  TXT.textSize(width/txt.length);
  TXT.rect(0, 0, TXT.textWidth(txt) + marginX*2, size + marginY*2);
  TXT.text(txt, marginX, marginY);
  UI.image(TXT, 0, 0);
};

function windowResized() {
  UI.resizeCanvas(windowWidth, windowHeight);
  UI.clear();
  TXT.resizeCanvas(windowWidth, windowHeight);
  TXT.clear();
  resizeCanvas(windowWidth, windowHeight);
  clear();
  
  clearButton.x = width-260;
  clearButton.y = height*0.01;
  
  resetButton.x = width-200;
  resetButton.y = height*0.9;
  
  buttons.forEach((button, i)=>{
    button.h = height*0.05;
    button.y = height*0.4 + i * height*0.08;
  });
  sliders.forEach((slider, i)=>{
    slider.setSize(width-height*0.31, height*0.15 + i * height*0.15, height*0.3, height*0.08);
  });
}

function mousePressed() {
  if(clearButton.isHit()) {
    clearButton.isPush = !clearButton.isPush;
    clearButton.txt = "clear canvas : " + (clearButton.isPush?"ON":"OFF");
  }
  
  if(resetButton.isHit()) {
    let i = 0;
    size = 25;
    sliders[i++].setVal(size);
    
    spring = 0.5;
    sliders[i++].setVal(spring);
    
    friction = 0.5;
    sliders[i++].setVal(friction);
    
    splitNum = 10;
    sliders[i++].setVal(splitNum);
    
    diff = size/8;
    sliders[i++].setVal(diff);
  }
  
  let index = -1;
  buttons.forEach((button, i)=>{
    button = buttons[i];
    if(button.isHit()) { index = i; }
  });
  
  if(index >= 0) {
    buttons[funcIndex].isPush = false;
    funcIndex = index;
    let i = 0;
    switch(funcIndex) {
      case 0:
        sliders[i++].isValid = true;
        sliders[i++].isValid = false;
        sliders[i++].isValid = false;
        sliders[i++].isValid = false;
        sliders[i++].isValid = false;
        break;
      case 1:
      case 2:
      case 3:
        sliders[i++].isValid = true;
        sliders[i++].isValid = true;
        sliders[i++].isValid = true;
        sliders[i++].isValid = false;
        sliders[i++].isValid = false;
        break;
      case 4:
        sliders[i++].isValid = true;
        sliders[i++].isValid = true;
        sliders[i++].isValid = true;
        sliders[i++].isValid = true;
        sliders[i++].isValid = false;
        break;
      case 5:
        sliders[i++].isValid = true;
        sliders[i++].isValid = true;
        sliders[i++].isValid = true;
        sliders[i++].isValid = true;
        sliders[i++].isValid = true;
        break;
    }
    buttons[funcIndex].isPush = true;
    clear();
  }
  
  sliders.forEach(slider=>{
    slider.isPush = slider.isPush || slider.isHit();
  });
}

function mouseDragged() {
  sliders.forEach(slider=>{
    if(slider.isPush) {
      slider.move();
    }
  });
}

function mouseReleased() {
  sliders.forEach(slider=>{
    slider.isPush = false;
  });
}
