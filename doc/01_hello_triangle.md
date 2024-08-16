# 渲染管线
    在渲染管线中，大致可以理解为以下两个步骤
    - 将3D坐标转化为2D坐标（MVP变换）
    - 将2D坐标转化为屏幕上的像素（光栅化）
# VBO VAO EBO
    VBO和VAO用来存储顶点信息，将顶点信息发送至顶点着色器
    简单来说，VBO提供顶点数据，VAO告诉顶点着色器这些数据有什么作用（解析）

    一个完整的OpenGL程序相当于一个容器，我们在用到VAO、VBO时，需要先绑定(Bind操作)、再使用，没有经过绑定的VAO/VBO是不起作用的

    例如02_hello_triangle/main.cpp中，顶点数据像这样定义

    ``` cpp
     float vertices[] = {
        -0.5f, -0.5f, 0.0f,
        0.5f, -0.5f, 0.0f,
        0.0f, 0.5f, 0.0f};
    ```
    并将数据发送给顶点着色器

    但顶点着色器并不知道其实际含义，对它来说，这仅仅是一个float类型的数组而已，这时就需要VAO来解释其作用，如下

    ``` cpp
    //告诉VAO该如何解释VBO(详细的注释在源码处)
    glVertexAttribPointer(0, 3, GL_FLOAT, GL_FALSE, 3 * sizeof(float), (void *)0);
    glEnableVertexAttribArray(0);
    glBindBuffer(GL_ARRAY_BUFFER,0);
    glBindVertexArray(0);
    ```

# Shader Program