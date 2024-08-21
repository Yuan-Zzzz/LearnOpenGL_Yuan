#version 330 core
layout (location = 0) in vec3 aPos;
layout (location = 1) in vec3 aColor;

out vec3 ourColor;

void main()
{
    vec3 pos(aPos.x,-aPos.y,aPos.z);
    //让三角形上下颠倒:每个顶点y为原来的相反数即可
    gl_Position = vec4(aPos.x,-aPos.y,aPos.z, 1.0);
    ourColor = aColor;
}