
/*
draw=_=>{createCanvas(S=270,S);for(s in D="ࠁ࠱ࢡ࣡ऑ঄৒਑ਿற௱ఱౡಡ೑ඓෑ෱ใກັ༡རྑྱ࿔၁ၡႄ르ሃቁቢ᪒᫂᫲ᭋᱲᲢ᳒ᴢᵣᶲṊἋ′⁢ₒ⃢℣ⅲ−≂≲⋋⏲␥Ⓡ◒⚙➲⡥⣅⦒⩲⪢⭲ⱒⲂⵒ⸲⹢⼹】あ"){for(d=D.charCodeAt(s),o=d&15;o;)for(I=(d>>4)+--o,a=8;a;--a)for(b=8;b;)set(I%30*9+a,~~(I/30)*9+--b,0)}updatePixels()}
/**/

function setup() {
  createCanvas(270, 270);
  loadPixels();
  str = "ࠁ࠱ࢡ࣡ऑ঄৒਑ਿற௱ఱౡಡ೑ඓෑ෱ใກັ༡རྑྱ࿔၁ၡႄ르ሃቁቢ᪒᫂᫲ᭋᱲᲢ᳒ᴢᵣᶲṊἋ′⁢ₒ⃢℣ⅲ−≂≲⋋⏲␥Ⓡ◒⚙➲⡥⣅⦒⩲⪢⭲ⱒⲂⵒ⸲⹢⼹】あ";
  ratio = 9;
  for(i = 0; i < str.length; ++i) {
    d = str.charCodeAt(i);
    index = d >> 4;
    count = d - (index << 4);
    
    for(offset = count; offset > 0; --offset) {
      inIndex = (index + offset);
      x = (inIndex%30)*ratio;
      y = Math.floor(inIndex/30)*ratio;
      
      for(a = ratio-1; a > 0; --a) {
        for(b = ratio-1; b > 0; --b) {
          outIndex = ((x + a) + (y + b) * height) * 4;
          pixels[outIndex+3] = 255;
        }
      }
    }
  }
  updatePixels();
}
/**/
