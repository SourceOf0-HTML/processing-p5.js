precision mediump float;

uniform sampler2D smp; // 元画面
uniform float time; // 時間
uniform vec2 mouse; // マウス位置
uniform vec2 resolution; // 解像度

const float PI  = 3.141592653589793;
const float TAU = PI * 2.0;
const float D_PI = PI * 0.25;
vec4 t = vec4(1.0, 2.0 / 3.0, 1.0 / 3.0, 3.0);

vec2 reverseY(vec2 v) {
  return vec2(v.x, resolution.y-v.y);
}

vec2 ratioV(vec2 v) {
  return vec2(v.x/resolution.x, v.y/resolution.y);
}

vec4 avelage(vec2 v) {
  vec4 ret = vec4(0.0, 0.0, 0.0, -0.5);
  for( float angle = 0.0; angle < TAU; angle += D_PI) {
    float a = angle;
    vec2 del = vec2(cos(a), sin(a)) * 3.0;
    ret += texture2D(smp, ratioV(v + del* 2.0)) * 0.08;
    a += 0.1;
    del = vec2(cos(a), sin(a)) * 3.0;
    ret += texture2D(smp, ratioV(v + del* 3.0)) * 0.06;
    a += 0.1;
    del = vec2(cos(a), sin(a)) * 3.0;
    ret += texture2D(smp, ratioV(v + del* 4.0)) * 0.04;
    a += 0.1;
    del = vec2(cos(a), sin(a)) * 3.0;
    ret += texture2D(smp, ratioV(v + del* 5.0)) * 0.03;
  }
  if(ret.w < 0.0) ret.w = 0.0;
  return ret;
}

vec3 hsv(float h, float s, float v) {
  vec3 p = abs(fract(vec3(h) + t.xyz) * 6.0 - vec3(t.w));
  return v * mix(vec3(t.x), clamp(p - vec3(t.x), 0.0, 1.0), s);
}

void main() {
  vec2 pos = ratioV(gl_FragCoord.xy * 2.0 - resolution);
  vec2 mousePos = ratioV(reverseY(mouse) * 2.0 - resolution);
  
  float h = abs(mod(time * 15.0, 360.0) / 360.0);
  //vec4 smpColor = texture2D(smp, ratioV(reverseY(gl_FragCoord.xy)));
  vec4 smpColor = avelage(reverseY(gl_FragCoord.xy));
  if(length(smpColor) > 0.2){
    float f = 0.1 / length(pos - mousePos);
    vec3 tmp = (hsv(h, 1.0, 1.0) + f) * smpColor.rgb;
    gl_FragColor = vec4(tmp, 1.0);
  } else {
    vec3 tmp = mix(hsv(h, 1.0, 0.5), smpColor.rgb, 0.5);
    gl_FragColor = vec4(tmp, 1.0);
  }
}
