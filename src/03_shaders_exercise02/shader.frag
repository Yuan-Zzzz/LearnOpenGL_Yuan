#version 330 core
out vec4 FragColor;

uniform in vec4 ourColor; // 在OpenGL程序代码中设定这个变量

void main()
{
    FragColor = ourColor;
}