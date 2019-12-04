precision mediump float;

uniform sampler2D smp; // 元画面
uniform vec3 color; // 色
uniform vec2 mouse; // マウス位置
uniform vec2 resolution; // 解像度

const float PI  = 3.141592653589793;
const float TAU = PI * 2.0;
const float D_PI = PI * 0.08;
vec4 t = vec4(1.0, 2.0 / 3.0, 1.0 / 3.0, 3.0);

vec2 reverseY(vec2 v) {
  return vec2(v.x, resolution.y-v.y);
}

vec2 ratioV(vec2 v) {
  return vec2(v.x/resolution.x, v.y/resolution.y);
}

vec4 avelage(vec2 v) {
  vec4 ret = vec4(0.0, 0.0, 0.0, 0.0);
  float distance = length(texture2D(smp, ratioV(v))) * 30.0;
  for( float angle = 0.0; angle < TAU; angle += D_PI) {
    float a = angle;
    vec2 del = vec2(cos(a), sin(a)) * distance;
    ret += texture2D(smp, ratioV(v + del)) * 0.1;
    a += 0.1;
    del = vec2(cos(a), sin(a)) * 2.0;
    ret += texture2D(smp, ratioV(v + del* 2.0)) * 0.05;
  }
  if(ret.w < 0.0) ret.w = 0.0;
  return ret;
}

void main() {
  vec2 pos = ratioV(gl_FragCoord.xy * 2.0 - resolution);
  vec2 mousePos = ratioV(reverseY(mouse) * 2.0 - resolution);
  
  vec4 smpColor = avelage(reverseY(gl_FragCoord.xy));
  if(length(smpColor) > 0.0){
    float f = 0.1 / length(pos - mousePos);
    vec4 tmp = vec4(color + f, 1.0) * smpColor;
    gl_FragColor = tmp;
  } else {
    gl_FragColor = vec4(0.0, 0.0, 0.0, 0.0);
  }
}
