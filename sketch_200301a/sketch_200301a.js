function preload() {
  img = loadImage("helloworld.png");
}

function setup() {
  imgWidth = img.width;
  imgHeight = img.height;
  
  createCanvas(imgWidth, imgHeight);
  image(img, 0, 0, width, height);
  
  str = "";
  data = [];
  imageIndex = width * height;
  
  start = -1;
  loadPixels();
  for(i = 0; i < imageIndex; ++i) {
    index = i*4;
    if(pixels[index] + pixels[index+1] + pixels[index+2] != 0) {
      // white
      if(start >= 0) {
        data.push({index:start, count:(i - start)});
        start = -1;
      }
      continue;
    }
    // black
    if(start < 0) {
      start = i;
    }
  }
  
  val = new Uint16Array(data.length);
  data.forEach((d, i)=>{
    val[i] = ((d.index << 4) | d.count);
  });
  
  str = String.fromCharCode.apply("", val);
  console.log(data);
  console.log(val);
  console.log(str);
  
  ratio = 10;
  resizeCanvas(width*ratio, height*ratio);
  
  clear();
  loadPixels();
  /*
  data.forEach(d=>{
    for(offset = d.count; offset > 0; --offset) {
      i = (d.index + offset);
      x = (i%imgWidth)*10;
      y = Math.floor(i/imgWidth)*10;
      
      for(a = ratio-1; a >= 0; --a) {
        for(b = ratio-1; b >= 0; --b) {
          index = ((x + a) + (y + b) * height) * 4;
          pixels[index] = pixels[index+1] = pixels[index+2] = 0;
          pixels[index+3] = 255;
        }
      }
    }
  });
  */
  
  for(i = 0; i < str.length; ++i) {
    d = str.charCodeAt(i);
    index = d >> 4;
    count = d - (index << 4);
    console.log(d, index, count);
    
    for(offset = count; offset > 0; --offset) {
      inIndex = (index + offset);
      x = (inIndex%imgWidth)*ratio;
      y = Math.floor(inIndex/imgWidth)*ratio;
      
      for(a = ratio-1; a >= 0; --a) {
        for(b = ratio-1; b >= 0; --b) {
          outIndex = ((x + a) + (y + b) * height) * 4;
          pixels[outIndex] = pixels[outIndex+1] = pixels[outIndex+2] = 0;
          pixels[outIndex+3] = 255;
        }
      }
    }
  }
  updatePixels();
}
