precision mediump float;

uniform sampler2D smp; // 元画面
uniform vec3 color; // 色
uniform vec2 mouse; // マウス位置
uniform vec2 resolution; // 解像度

vec2 reverseY(vec2 v) {
  return vec2(v.x, resolution.y-v.y);
}

vec2 ratioV(vec2 v) {
  return vec2(v.x/resolution.x, v.y/resolution.y);
}

vec4 posterization(vec4 color) {
  float d = 1.0/2.0;
  return floor(color / d) * d;
}

void main() {
  vec2 pos = ratioV(gl_FragCoord.xy * 2.0 - resolution);
  vec2 mousePos = ratioV(reverseY(mouse) * 2.0 - resolution);
  
  vec4 smpColor = texture2D(smp, ratioV(reverseY(gl_FragCoord.xy)));
  if(length(smpColor) > 0.0){
    float f = 0.1 / length(pos - mousePos);
    vec4 tmp = vec4(color, 1.0) * posterization(smpColor + f);
    gl_FragColor = tmp;
  } else {
    gl_FragColor = vec4(0.0, 0.0, 0.0, 0.0);
  }
}
