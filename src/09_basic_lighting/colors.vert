# version 330 core
layout (location = 0) in vec3 aPos;
layout (location = 1) in vec3 aNormal;

uniform mat4 model;
uniform mat4 view;
uniform mat4 projection;

out vec3 Normal;
out vec3 FragPos;

void  main(){
    FragPos = vec3(model * vec4(aPos, 1.0));//将顶点坐标从世界坐标系转换到观察坐标系 用于片段着色器后续的光照计算
    //生成法线矩阵
    //法线矩阵是模型矩阵的逆矩阵的转置矩阵
    //因为模型矩阵包含了旋转和缩放，但是不包含平移，所以模型矩阵的逆矩阵的转置矩阵就是法线矩阵
    Normal = transpose(inverse(mat3(model))) * aNormal;

    gl_Position = projection * view * model * vec4(aPos, 1.0);
}