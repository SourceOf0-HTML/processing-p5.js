
function setup() {
  createCanvas(S=500, S);
  L = 100;
  
  gIn = createGraphics(L, L);
  gOut = createGraphics(L, L);
  gSource = createGraphics(L, L);
  gResult = createGraphics(L, L);
  
  for(let y = 0; y < L; ++y ) {
    let ratioH = y/L;
    let colorRatio = ratioH * 255;
    for(let x = 0; x < L; ++x ) {
      let ratio = noise(x/L, ratioH);
      let sourceColor = color(ratio * 255);
      gSource.set(x, y, sourceColor);
      gIn.set(x, y, colorRatio);
    }
  }
  gSource.updatePixels();
  gIn.updatePixels();
  
  fill(0);
  textSize(L/5);
  
  margin = 5;
  t = 0;
  f = 0;
}

function draw() {
  clear();
  
  for(let y = 0; y < L; ++y ) {
    let ratioH = y/L;
    let colorRatio = ratioH * 255;
    let outColor = color(`hsl(${~~(ratioH*90+noise(y)*90+t)}, 100%, 50%)`);
    for(let x = 0; x < L; ++x ) {
      gOut.set(x, y, outColor);
    }
  }
  gOut.updatePixels();
  
  for(let y = 0; y < L; ++y ) {
    let ratioH = y / L;
    for(let x = 0; x < L; ++x ) {
      let ratio = noise(x/L, ratioH);
      gResult.set(x, y, gOut.get(0, ratio*L));
    }
  }
  gResult.updatePixels();
  
  image(gIn, 100, 100);
  text("IN", 100, 100 - margin);
  image(gOut, S - L - 100, 100);
  text("OUT", S - L - 100, 100 - margin);
  image(gSource, 100, 300);
  text("SOURCE", 100, 300 - margin);
  image(gResult, S - L - 100, 300);
  text("RESULT", S - L - 100, 300 - margin);
  
  f += 0.01;
  t = (sin(f) + 1)*90;
}
/**/
