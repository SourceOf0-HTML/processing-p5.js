function preload(){
  sh = loadShader('shader.vert', 'shader.frag');
}

function setup() {
  createCanvas(300, 300);
  g = createGraphics(width, height, WEBGL);
  g.noStroke();
}

function draw() {
  sh.setUniform("smp", g);
  sh.setUniform("time", millis() / 10000.0);
  sh.setUniform("mouse", [mouseX, mouseY]);
  sh.setUniform("resolution", [width, height]);
  
  g.shader(sh);
  g.rect(0, 0, width, height);
  image(g, 0, 0);
}
