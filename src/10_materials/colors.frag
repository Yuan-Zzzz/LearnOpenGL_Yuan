#version 330 core
//材质结构体
struct Material {
    vec3 ambient;
    vec3 diffuse;
    vec3 specular;
    float shininess;
}; 

//光照结构体
struct Light {
    vec3 position;
    vec3 ambient;
    vec3 diffuse;
    vec3 specular;
};
out vec4 FragColor;

uniform Material material;
uniform Light light;

uniform vec3 objectColor;
uniform vec3 viewPos;

in vec3 Normal;
in vec3 FragPos;

void main()
{
    //---------------------------------计算环境光照---------------------------------------
    vec3 ambient = material.ambient * light.ambient;

    //---------------------------------计算漫反射---------------------------------------
    //计算法向量方向
    vec3 norm = normalize(Normal);
    //计算光线方向
    vec3 lightDir = normalize(light.position - FragPos);
    //根据光线与法向量夹角计算漫反射强度
    float diff = max(dot(norm, lightDir), 0.0);
    //计算漫反射光照
    vec3 diffuse = (diff * material.diffuse) * light.diffuse;
    //---------------------------------计算高光反射---------------------------------------
    //计算反射方向
    vec3 viewDir = normalize(viewPos - FragPos);
    //计算反射光线方向
    vec3 reflectDir = reflect(-lightDir, norm);
    //计算高光强度 反射方向与视线方向夹角越小 高光越强
    float spec = pow(max(dot(viewDir, reflectDir), 0.0), material.shininess);
    //计算高光光照
    vec3 specular = material.specular * spec * light.specular;

    //----------------------------------计算光照结果---------------------------------------
    vec3 result = (ambient + diffuse + specular) * objectColor;
    //输出颜色
    FragColor = vec4(result, 1.0);
}