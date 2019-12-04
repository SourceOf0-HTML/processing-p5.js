function preload(){
  sh = loadShader('shader.vert', 'shader.frag');
}

function setup() {
  createCanvas(300, 300);
  r = createGraphics(width, height, WEBGL);
  r.noStroke();
  g = createGraphics(width, height, WEBGL);
  g.noStroke();
  
  v = createVector(1, 1, 0.5);
  time = 0;
}

function draw() {
  clear();
  
  let size = min(width, height)/3;
  r.clear();
  r.ambientLight(10, 10, 10);
  r.pointLight(255, 255, 255, 0, 0, size);
  r.ambientMaterial(100, 100, 100, 255);
  r.box( size );
  
  p = pixelDensity();
  sh.setUniform("smp", r);
  sh.setUniform("time", time);
  sh.setUniform("mouse", [mouseX*p, mouseY*p]);
  sh.setUniform("resolution", [width*p, height*p]);
  
  g.shader(sh);
  g.rect(0, 0, width, height);
  image(g, 0, 0);

  r.rotate(0.005,v);
  time = millis() / 10000;
}
