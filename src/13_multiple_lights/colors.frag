#version 330 core
//材质结构体
struct Material {
    sampler2D diffuse;
    sampler2D specular;
    float shininess;
}; 

//定向光
struct DirLight {
    vec3 direction;
    vec3 ambient;
    vec3 diffuse;
    vec3 specular;
};

//点光源
struct PointLight {
    vec3 position;
    vec3 ambient;
    vec3 diffuse;
    vec3 specular;
    float constant; //常数项
    float linear; //一次项
    float quadratic; //二次项
};

//聚光灯
struct SpotLight {
    vec3 position;
    vec3 direction;
    vec3 ambient;
    vec3 diffuse;
    vec3 specular;
    float constant; //常数项
    float linear; //一次项
    float quadratic;// 二次项
    float cutOff;//内切光角
    float outerCutOff;//外切光角
};

vec3 CalcDirLight(DirLight light, vec3 normal, vec3 viewDir, vec3 fragPos, Material material);
vec3 CalcPointLight(PointLight light, vec3 normal, vec3 viewDir, vec3 fragPos, Material material);
vec3 CalcSpotLight(SpotLight light, vec3 normal, vec3 viewDir, vec3 fragPos, Material material);

out vec4 FragColor;

uniform Material material;
uniform DirLight light;
uniform PointLight pointLight;
uniform SpotLight spotLight;

uniform vec3 objectColor;
uniform vec3 viewPos;

in vec3 Normal;
in vec3 FragPos;
in vec2 TexCoords;
void main()
{
    vec3 norm = normalize(Normal);
    vec3 viewDir = normalize(viewPos - FragPos);

    //定向光
    vec3 result = CalcDirLight(light, norm, viewDir, FragPos, material);
    //点光源
    result += CalcPointLight(pointLight, norm, viewDir, FragPos, material);
    //聚光灯
    result += CalcSpotLight(spotLight, norm, viewDir, FragPos, material);

    //输出颜色
    FragColor = vec4(result, 1.0);
}

vec3 CalcDirLight(DirLight light, vec3 normal, vec3 viewDir, vec3 fragPos, Material material)
{
    //计算环境光照
    vec3 ambient = light.ambient * vec3(texture(material.diffuse, TexCoords));
    //计算漫反射
    vec3 norm = normalize(Normal);
    float diff = max(dot(norm, light.direction), 0.0);
    vec3 diffuse = light.diffuse * diff * vec3(texture(material.diffuse, TexCoords));
    //计算高光反射
    vec3 reflectDir = reflect(-light.direction, norm);
    float spec = pow(max(dot(viewDir, reflectDir), 0.0), material.shininess);
    vec3 specular = light.specular * spec * vec3(texture(material.specular, TexCoords));
    //返回光照结果
    return (ambient + diffuse + specular) * objectColor;
}

vec3 CalcPointLight(PointLight light, vec3 normal, vec3 viewDir, vec3 fragPos, Material material)
{
    //计算环境光照
    vec3 ambient = light.ambient * vec3(texture(material.diffuse, TexCoords));
    //计算漫反射
    vec3 norm = normalize(Normal);
    vec3 lightDir = normalize(light.position - FragPos);
    float diff = max(dot(norm, lightDir), 0.0);
    vec3 diffuse = light.diffuse * diff * vec3(texture(material.diffuse, TexCoords));
    //计算高光反射
    vec3 reflectDir = reflect(-lightDir, norm);
    float spec = pow(max(dot(viewDir, reflectDir), 0.0), material.shininess);
    vec3 specular = light.specular * spec * vec3(texture(material.specular, TexCoords));
    //计算衰减
    float distance = length(light.position - FragPos);
    float attenuation = 1.0 / (light.constant + light.linear * distance + light.quadratic * (distance * distance));
    //返回光照结果
    return (ambient + diffuse + specular) * objectColor * attenuation;
}

vec3 CalcSpotLight(SpotLight light, vec3 normal, vec3 viewDir, vec3 fragPos, Material material)
{
    //计算环境光照
    vec3 ambient = light.ambient * vec3(texture(material.diffuse, TexCoords));
    //计算漫反射
    vec3 norm = normalize(Normal);
    vec3 lightDir = normalize(light.position - FragPos);
    float diff = max(dot(norm, lightDir), 0.0);
    vec3 diffuse = light.diffuse * diff * vec3(texture(material.diffuse, TexCoords));
    //计算高光反射
    vec3 reflectDir = reflect(-lightDir, norm);
    float spec = pow(max(dot(viewDir, reflectDir), 0.0), material.shininess);
    vec3 specular = light.specular * spec * vec3(texture(material.specular, TexCoords));
    //计算衰减
    float distance = length(light.position - FragPos);
    float attenuation = 1.0 / (light.constant + light.linear * distance + light.quadratic * (distance * distance));
    //计算聚光灯内外切光角
    float theta = dot(lightDir, normalize(-light.direction));
    float epsilon = light.cutOff - light.outerCutOff;
    float intensity = clamp((theta - light.outerCutOff) / epsilon, 0.0, 1.0);
    //返回光照结果
    return (ambient + diffuse + specular) * objectColor * attenuation * intensity;
}