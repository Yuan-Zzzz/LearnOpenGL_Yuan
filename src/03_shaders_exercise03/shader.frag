#version 330 core
out vec4 FragColor;

uniform in vec4 ourPos; 

void main()
{
    FragColor = ourPos;
}