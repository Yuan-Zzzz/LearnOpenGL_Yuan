# 着色器
着色器是运行在GPU上的程序，在渲染管线中的特定部分运行
# GLSL
GLSL是一种类似C语言的着色器编程语言

一个典型的GLSL着色器有以下结构

``` cpp
#version version_number //声明版本
in type in_variable_name; //输入变量
in type in_variable_name;//输入变量

out type out_variable_name;//输出变量

uniform type uniform_name;//另一种在CPU上传递数据到GPU上的着色器的方式

//着色器入口
int main()
{
  // 处理输入并进行一些图形操作
  ...
  // 输出处理过的结果到输出变量
  out_variable_name = weird_stuff_we_processed;
}
```
# uniform
Uniform是另一种从我们的应用程序在CPU上传递数据到GPU上的着色器的方式

Uniform是**全局**的，意味着uniform变量必须在每个着色器程序对象中都是独一无二的

# 报错记录
ERROR::SHADER::FILE_NOT_SUCCESFULLY_READ
ERROR::PROGRAM_LINKING_ERROR of type: PROGRAM
Vertex info
-----------
(0) : error C5145: must write to gl_Position

**原因：路径输入不正确**
- 原代码：
``` cpp
Shader shader("shader.frag","shader.vert")
```
- 修改后的代码：
``` cpp
Shader shader("./scr/03_shaders/shader.frag","./scr/03_shaders/shader.frag")
```

