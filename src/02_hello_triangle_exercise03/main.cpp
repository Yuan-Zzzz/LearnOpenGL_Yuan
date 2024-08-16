#include <glad/glad.h>
#include <GLFW/glfw3.h>

#include <iostream>
// 朴实无华的临时的硬编码GLSL源码
// 顶点着色器
const char *vertexShaderSource = "#version 330 core\n"
                                 "layout (location = 0) in vec3 aPos;\n"
                                 "void main()\n"
                                 "{\n"
                                 "   gl_Position = vec4(aPos.x, aPos.y, aPos.z, 1.0);\n"
                                 "}\0";
// 片段着色器1
const char *fragmentShaderSource = "#version 330 core\n"
                                   "out vec4 FragColor;\n"
                                   "void main()\n"
                                   "{\n"
                                   " FragColor = vec4(1.0f, 0.5f, 0.2f, 1.0f);\n"
                                   "}\0";
//片段着色器2
const char *fragmentShaderSource2 = "#version 330 core\n"
                                   "out vec4 FragColor;\n"
                                   "void main()\n"
                                   "{\n"
                                   " FragColor = vec4(0.4f, 0.3f, 0.1f, 1.0f);\n"
                                   "}\0";
void framebuffer_size_callback(GLFWwindow *window, int width, int height);
void processInput(GLFWwindow *window);

int main()
{
    // 初始化glfw
    glfwInit();
    // 配置glfw
    glfwWindowHint(GLFW_CONTEXT_VERSION_MAJOR, 3);
    glfwWindowHint(GLFW_CONTEXT_VERSION_MINOR, 3);
    glfwWindowHint(GLFW_OPENGL_PROFILE, GLFW_OPENGL_CORE_PROFILE);

    // 创建窗口
    GLFWwindow *window = glfwCreateWindow(800, 600, "LearnOpenGL", NULL, NULL);
    if (window == NULL)
    {
        std::cout << "Failed to create GLFW window" << std::endl;
        glfwTerminate();
        return -1;
    }
    glfwMakeContextCurrent(window);

    if (!gladLoadGLLoader((GLADloadproc)glfwGetProcAddress))
    {
        std::cout << "Failed to initialize GLAD" << std::endl;
        return -1;
    }
    // 告诉OpenGL视口大小（渲染窗口的尺寸）
    glViewport(0, 0, 800, 600);

    // 注册回调
    glfwSetFramebufferSizeCallback(window, framebuffer_size_callback);

    // 声明一个float数组，指定要生成得三角形的顶点
    float vertices[] = {
        -0.5f, -0.5f, 0.0f,
        0.5f, -0.5f, 0.0f,
        0.0f, 0.5f, 0.0f};

    // 声明顶点缓冲对象，在GPU上创建内存，存储顶点数据
    unsigned int VBO, VAO;
    glGenVertexArrays(1, &VAO);
    glGenBuffers(1, &VBO);
    // 顶点缓冲对象的缓冲类型是GL_ARRAY_BUFFER
    // 把新声明的顶点缓冲对象绑定到GL_ARRAY_BUFFER中
    glBindBuffer(GL_ARRAY_BUFFER, VBO);
    glBindVertexArray(VAO);
    // glBufferData是一个专门用来把用户定义的数据复制到当前绑定缓冲的函数。
    // 第一个参数是目标缓冲的类型：顶点缓冲对象当前绑定到GL_ARRAY_BUFFER目标上
    // 第二个参数指定传输数据的大小(以字节为单位)；用一个简单的sizeof计算出顶点数据大小就行
    // 第三个参数是我们希望发送的实际数据
    // 第四个参数指定了我们希望显卡如何管理给定的数据
    glBufferData(GL_ARRAY_BUFFER, sizeof(vertices), vertices, GL_STATIC_DRAW);

    // 解析顶点数据
    //告诉VAO该如何解释VBO
    //参数1为位置
    //参数2为顶点熟悉大小
    //参数3指定数据类型
    //参数4指定是否被标准化
    //参数5为步长，下个组位置数据在3个float之后，我们把步长设置为3 * sizeof(float)
    glVertexAttribPointer(0, 3, GL_FLOAT, GL_FALSE, 3 * sizeof(float), (void *)0);
    //启用顶点属性
    glEnableVertexAttribArray(0);
    //绑定VAO
    glBindBuffer(GL_ARRAY_BUFFER,0);
    glBindVertexArray(0);

    // 创建顶点着色器对象
    unsigned int vertexShader;
    vertexShader = glCreateShader(GL_VERTEX_SHADER);
    // 将着色器源码附加到着色器对象上
    glShaderSource(vertexShader, 1, &vertexShaderSource, NULL);
    // 编译着色器
    glCompileShader(vertexShader);

    // 判断顶点着色器是否编译成功，并输出错误信息
    int success;
    char infoLog[512];
    glGetShaderiv(vertexShader, GL_COMPILE_STATUS, &success);

    if (!success)
    {
        glGetShaderInfoLog(vertexShader, 512, NULL, infoLog);
        std::cout << "ERROR::SHADER::VERTEX::COMPILATION_FAILED\n"
                  << infoLog << std::endl;
    }
    // 片段着色器1
    unsigned int fragmentShader;
    fragmentShader = glCreateShader(GL_FRAGMENT_SHADER);
    glShaderSource(fragmentShader, 1, &fragmentShaderSource, NULL);
    glCompileShader(fragmentShader);
    // 片段着色器2
    unsigned int fragmentShader2;
    fragmentShader2 = glCreateShader(GL_FRAGMENT_SHADER);
    glShaderSource(fragmentShader2, 1, &fragmentShaderSource2, NULL);
    glCompileShader(fragmentShader2);

    // 创建shader程序对象，链接前面编译的两个着色器
    unsigned int shaderProgram,shaderProgram2;
    shaderProgram = glCreateProgram();
    shaderProgram2 = glCreateProgram();
    glAttachShader(shaderProgram, vertexShader);
    glAttachShader(shaderProgram, fragmentShader);
    glAttachShader(shaderProgram2,vertexShader);
    glAttachShader(shaderProgram2,fragmentShader2);
    glLinkProgram(shaderProgram);
    glLinkProgram(shaderProgram2);
    // 激活程序对象
    glUseProgram(shaderProgram);
    glUseProgram(shaderProgram2);

    // 删除着色器对象
    glDeleteShader(vertexShader);
    glDeleteShader(fragmentShader);


    // 渲染循环
    while (!glfwWindowShouldClose(window))
    {
        // 监听输入
        processInput(window);

        // 渲染指令
        glClearColor(0.2f, 0.3f, 0.3f, 1.0f);
        glClear(GL_COLOR_BUFFER_BIT);

        glUseProgram(shaderProgram2);
        glBindVertexArray(VAO);
        glDrawArrays(GL_TRIANGLES, 0, 3);

        // glUseProgram(shaderProgram2);
        // glBindVertexArray(VAO); 
        // glDrawArrays(GL_TRIANGLES, 0, 3);

        glfwSwapBuffers(window);
        glfwPollEvents();
    }

    // 释放资源
    glfwTerminate();
    return 0;

}

void framebuffer_size_callback(GLFWwindow *window, int width, int height)
{
    glViewport(0, 0, width, height);
}

void processInput(GLFWwindow *window)
{
    if (glfwGetKey(window, GLFW_KEY_ESCAPE) == GLFW_PRESS)
        glfwSetWindowShouldClose(window, true);
}