#version 330 core
layout(location = 0) in vec3 aPos;
layout(location = 1) in vec3 aColor;

//定义偏移量
uniform float offsetX;

out vec3 ourPos;

void main() {
    //为偏移量赋值
    gl_Position = vec4(aPos.x + offsetX, aPos.y, aPos.z, 1.0);
    ourPos = aPos;
}