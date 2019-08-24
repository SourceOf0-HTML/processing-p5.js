function setup() {
  canvasSize = 500;
  createCanvas(canvasSize, canvasSize);
  background(150, 255, 255, 255);
  
  setColor = color(150, 255, 0, 0);
  
  loadPixels();
  density = pixelDensity();
  
  w = density * canvasSize;
  h = density * canvasSize;
  for(y = 0; y < h; ++y) {
    for(x = y%2; x < w; x += 2) {
      index = (x + y*h) * 4;
      pixels[ index   ] -= red( setColor );
      pixels[ index+1 ] -= green( setColor );
      pixels[ index+2 ] -= blue( setColor );
      pixels[ index+3 ] -= alpha( setColor );
    }
  }
  updatePixels();
}


function draw() {
  loadPixels();
  for(y = 0; y < h; ++y) {
    for(x = 0; x < w; ++x) {
      index = (x + y*h) * 4;
      pixels[ index   ] += 1;
      pixels[ index+1 ] += 1;
      pixels[ index+2 ] += 1;
    }
  }
  updatePixels();
}
