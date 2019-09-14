
function setup() {
  createCanvas(windowWidth, windowHeight);
  half_width = width/2;
  half_height = height/2;
  SIZE = width > height ? width : height;
  HALF_SIZE = SIZE/2;
  STROKE_RADIUS = SIZE/2;
  SPHERE_SIZE = SIZE*8;
  INTERFACE_RADIUS = SIZE*0.45;
  INTERFACE_HEIGHT = INTERFACE_RADIUS < height ? INTERFACE_RADIUS : height;
  INTERFACE_WIDTH = INTERFACE_RADIUS < width ? INTERFACE_RADIUS : width;
  TACHOMETER_RADIUS = INTERFACE_RADIUS*0.15;
    
  g = createGraphics(width, height, WEBGL);
  c = g.createCamera();
  p = createVector();
  v = 0;
  interfaceColor = color(0, 100, 0);

  u = createGraphics(width, height);
  
  mask = createGraphics(width, height);
  mask.fill(0);
  mask.circle(width/2, height/2, INTERFACE_RADIUS/2);
  maskImg = mask.get();

  g.colorMode(HSL);
  blendMode(ADD);
  t = 0;
}

function draw() {
  clear();
  
  
  // -- update state -- //
  
  // get mouse pos
  m = createVector(half_width - mouseX, mouseY - half_height);
  
  if(mouseIsPressed) {
    // move forword
    v += HALF_SIZE/300;
  }
  // add velocity
  p.add(createVector(m.x/HALF_SIZE, m.y/HALF_SIZE, 1 - m.mag()/HALF_SIZE).mult(v));
  v *= 0.95;
  
  
  // -- update 3D view -- //
  
  g.background(200, 80, 60);
  
  // set camera pos & angle
  cameraAngle = atan2(SIZE - m.y, m.x);
  c.camera(p.x, p.y, p.z, p.x + m.x, p.y + m.y, p.z + HALF_SIZE, cos(cameraAngle), sin(cameraAngle), 0);
  
  // set light
  g.ambientLight(220, 80, 25);
  g.pointLight(200, 30, 50, p.x, p.y, p.z);
  
  // set under sphere
  g.push();
  g.noStroke();
  g.ambientMaterial(100, 15, 15);
  g.translate(p.x, SPHERE_SIZE + SIZE, p.z + SIZE);
  g.sphere(SPHERE_SIZE, 24, 24);
  g.pop();
  t += 10;
  
  // set 3D stroke
  strokeDistance = SIZE*2;
  for(z = p.z; z < p.z + strokeDistance; z += 4) {
    s = 1 - (z-p.z)/strokeDistance;
    g.strokeWeight(s*50);
    g.stroke(100*s + 150, 100, 50);
    g.point( sin( z/(STROKE_RADIUS*6) * TAU ) * STROKE_RADIUS, sin( z/(STROKE_RADIUS*8) * TAU ) * STROKE_RADIUS, z);
  }
  
  // show 3D
  image(g, 0, 0);
  
  
  // -- update 2D interfaces -- //
  
  u.clear();
  u.stroke(interfaceColor);
  u.strokeWeight(3);
  u.noFill();
  
  // set camera height
  widthDistance = HALF_SIZE/3;
  heightDistance = HALF_SIZE/10;
  offsetY = ~~(p.y/(heightDistance*5)) * heightDistance*5;
  lineBaseSize = HALF_SIZE/20;
  u.push();
  u.translate(half_width, half_height);
  u.strokeWeight(1.5);
  u.rotate(cameraAngle - HALF_PI);
  u.line(-widthDistance + lineBaseSize/2, -INTERFACE_RADIUS, -widthDistance + lineBaseSize/2, INTERFACE_RADIUS);
  u.line( widthDistance - lineBaseSize/2, -INTERFACE_RADIUS,  widthDistance - lineBaseSize/2, INTERFACE_RADIUS);
  u.strokeWeight(3);
  for(i = -10; i < 10; ++i) {
    sizeRatio = i%5 ? 1 : 2;
    lineSize = lineBaseSize * sizeRatio;
    posY = -p.y + offsetY + i*heightDistance;
    u.line(-widthDistance + lineSize, posY, -widthDistance           , posY);
    u.line( widthDistance           , posY,  widthDistance - lineSize, posY);
    if(sizeRatio!=1) {
      u.push();
      u.fill(interfaceColor);
      u.noStroke();
      u.textSize(fontSize=HALF_SIZE/30);
      u.textAlign(LEFT, CENTER);
      u.text(~~(-i*heightDistance-offsetY), widthDistance + fontSize/2, posY);
      u.pop();
    }
  }
  u.pop();
  
  // set camera direction
  widthDistance = HALF_SIZE/10;
  offsetX = ~~(p.x/(widthDistance*5)) * widthDistance*5;
  lineBaseSize = HALF_SIZE/30;
  u.push();
  u.translate(half_width, half_height - INTERFACE_HEIGHT*0.3);
  for(i = -10; i < 10; ++i) {
    sizeRatio = i%5 ? 1 : 1.5;
    lineSize = lineBaseSize * sizeRatio;
    posX = p.x - offsetX + i*widthDistance;
    u.line(posX, 0, posX, lineSize * sizeRatio);
    if(sizeRatio!=1) {
      u.push();
      u.fill(interfaceColor);
      u.noStroke();
      u.textSize(fontSize=HALF_SIZE/30);
      u.textAlign(CENTER, BOTTOM);
      u.text(~~(-i*widthDistance+offsetX), posX, -fontSize/3);
      u.pop();
    }
  }
  u.pop();
  
  
  // set tachometer
  u.push();
  u.noFill();
  u.stroke(interfaceColor);
  u.translate(half_width, half_height - INTERFACE_HEIGHT/2 + INTERFACE_HEIGHT*0.95);
  u.circle(0, 0, TACHOMETER_RADIUS);
  u.push();
  u.rotate(PI);
  for(i = 0; i < 31; ++i) {
    sizeRatio = i%5 ? 0.95 : 0.9;
    u.line(TACHOMETER_RADIUS*sizeRatio, 0, TACHOMETER_RADIUS, 0);
    u.rotate(PI/30);
  }
  u.pop();
  u.push();
  u.noStroke();
  u.fill(interfaceColor);
  u.rotate((v/100)*PI);
  u.quad(0, TACHOMETER_RADIUS/20, TACHOMETER_RADIUS/20, 0, 0, -TACHOMETER_RADIUS/20, -TACHOMETER_RADIUS, 0);
  u.pop();
  u.pop();
  
  
  // set text
  u.noStroke();
  u.fill(interfaceColor);
  u.textSize(fontSize=HALF_SIZE/20);
  
  u.textAlign(CENTER, TOP);
  u.text(~~p.x, half_width, half_height - INTERFACE_HEIGHT*0.25 + fontSize);
  
  u.textAlign(RIGHT, CENTER);
  u.text(~~-p.y, half_width + INTERFACE_WIDTH*0.3 - fontSize, half_height + INTERFACE_RADIUS/4);
  
  u.textAlign(LEFT, CENTER);
  u.text(degrees(cameraAngle - HALF_PI).toFixed(3), half_width - INTERFACE_WIDTH*0.3 + fontSize, half_height + INTERFACE_RADIUS/4);
  
  u.textAlign(CENTER, BOTTOM);
  u.text(v.toFixed(3), half_width, half_height + INTERFACE_HEIGHT*0.45 - fontSize);
  
  
  u.textSize(fontSize/=2);
  
  u.textAlign(CENTER, TOP);
  u.text("X", half_width, half_height - INTERFACE_HEIGHT*0.25 + fontSize);
  
  u.textAlign(RIGHT, CENTER);
  u.text("Y", half_width + INTERFACE_WIDTH*0.3 - fontSize, half_height + INTERFACE_RADIUS/4);
  
  u.textAlign(LEFT, CENTER);
  u.text("R", half_width - INTERFACE_WIDTH*0.3 + fontSize, half_height + INTERFACE_RADIUS/4);
  
  u.textAlign(CENTER, BOTTOM);
  u.text("V", half_width, half_height + INTERFACE_HEIGHT*0.45 - fontSize/2);
  
  img = u.get();
  img.mask(maskImg);
  image(img, 0, 0);
}
/**/
