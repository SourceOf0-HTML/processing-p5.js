precision mediump float;
varying vec2 vTexCoord;

uniform sampler2D smp; // prev scene
uniform float time; //時間
uniform vec2 mouse; //マウス位置
uniform vec2 resolution; //解像度

vec2 reverseY(vec2 v) {
  return vec2(v.x, resolution.y-v.y);
}

vec2 ratioV(vec2 v) {
  return vec2(v.x/resolution.x, v.y/resolution.y);
}


vec3 hsv(float h, float s, float v) {
  vec4 t = vec4(1.0, 2.0 / 3.0, 1.0 / 3.0, 3.0);
  vec3 p = abs(fract(vec3(h) + t.xyz) * 6.0 - vec3(t.w));
  return v * mix(vec3(t.x), clamp(p - vec3(t.x), 0.0, 1.0), s);
}

void main() {
  vec2 pos = ratioV(gl_FragCoord.xy * 2.0 - resolution);
  vec2 mousePos = ratioV(reverseY(mouse) * 2.0 - resolution);
  
  float h = abs(mod(time * 15.0, 360.0) / 360.0);
  float f = 0.2 / length(pos - mousePos);
  vec4 smpColor = texture2D(smp, ratioV(reverseY(gl_FragCoord.xy)));
  if(length(smpColor) > 0.0){
    vec3 tmp = mix(hsv(h, 1.0, 0.5) + f, smpColor.rgb, 0.975);
    gl_FragColor = vec4(tmp, 1.0);
  }else{
    gl_FragColor = vec4(0.0, 0.0, 0.0, 1.0);
  }
}
