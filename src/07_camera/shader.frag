#version 330 core
out vec4 FragColor;
in vec2 TexCoord;

uniform sampler2D texture1;
uniform sampler2D texture2;

void main() {
  //将笑脸纹理坐标的x值反转;
  FragColor = mix(texture(texture1, TexCoord), texture(texture2,TexCoord), 0.5f);
  //FragColor = texture(texture1, TexCoord);
}