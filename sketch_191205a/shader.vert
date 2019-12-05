attribute vec3 aPosition;

void main() {
  vec4 positionVec4 = vec4(aPosition, 1.0);
  positionVec4.xy = positionVec4.xy * 2.0 - 1.0;
  
  // 頂点シェーダーに頂点情報を送信
  gl_Position = positionVec4;
}
