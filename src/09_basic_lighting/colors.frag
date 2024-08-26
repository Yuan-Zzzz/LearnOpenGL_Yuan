#version 330 core
out vec4 FragColor;
  
uniform vec3 objectColor;
uniform vec3 lightColor;
uniform vec3 lightPos;

in vec3 Normal;
in vec3 FragPos;

void main()
{
    //计算环境光照
    float ambientStrength = 0.1;
    vec3 ambient = ambientStrength * lightColor;

    //计算漫反射
    vec3 norm = normalize(Normal);
    vec3 lightDir = normalize(lightPos - FragPos);
    
    //法向量与光线的夹角越大 diff越小
    float diff = max(dot(norm, lightDir), 0.0);
    vec3 diffuse = diff * lightColor;
    
    //计算光照结果
    vec3 result = (ambient+diffuse) * objectColor;   

    FragColor = vec4(result, 1.0);
}