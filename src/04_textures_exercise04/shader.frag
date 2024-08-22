#version 330 core
out vec4 FragColor;
in vec3 ourColor;
in vec2 TexCoord;

uniform sampler2D texture1;
uniform sampler2D texture2;
uniform float mixValue;

void main() {
  //将笑脸纹理坐标的x值反转;
  FragColor = mix(texture(texture1, TexCoord), texture(texture2,vec2(-TexCoord.x,TexCoord.y)), mixValue);
  //FragColor = texture(texture1, TexCoord);
}