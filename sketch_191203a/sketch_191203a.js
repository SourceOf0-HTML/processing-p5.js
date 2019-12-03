function preload(){
  sh = loadShader('shader.vert', 'shader.frag');
}

function setup() {
  createCanvas(300, 300);
  g = createGraphics(width, height, WEBGL);
  g.noStroke();
}

function draw() {
  p = pixelDensity();
  sh.setUniform("smp", g);
  sh.setUniform("time", millis() / 10000.0);
  sh.setUniform("mouse", [mouseX*p, mouseY*p]);
  sh.setUniform("resolution", [width*p, height*p]);
  
  g.shader(sh);
  g.rect(0, 0, width, height);
  image(g, 0, 0);
}
