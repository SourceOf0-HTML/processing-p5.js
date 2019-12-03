precision mediump float;
varying vec2 vTexCoord;

uniform sampler2D smp; // prev scene
uniform float time; //時間
uniform vec2 mouse; //マウス位置
uniform vec2 resolution; //解像度

vec3 hsv(float h, float s, float v){
  vec4 t = vec4(1.0, 2.0 / 3.0, 1.0 / 3.0, 3.0);
  vec3 p = abs(fract(vec3(h) + t.xyz) * 6.0 - vec3(t.w));
  return v * mix(vec3(t.x), clamp(p - vec3(t.x), 0.0, 1.0), s);
}

void main() {
  vec2 pos = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
  vec2 mousePos = (mouse * 2.0 - resolution) / min(resolution.x, resolution.y);
  
  float ratio = 1.0 - length(pos - mousePos) * 2.0;
  gl_FragColor = vec4(ratio, ratio, ratio, 1.0);
}
