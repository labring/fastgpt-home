---
title: 解决FastGPT私有部署版4.8.3自定义输出无结果的问题
slug: /zh/troubleshoot/fastgpt-sandbox-v483-output-failure
page_type: 排错/错误码
source: https://github.com/labring/FastGPT/issues/1659
source_type: GitHub issue
---

# 解决FastGPT私有部署版4.8.3自定义输出无结果的问题

## 现象
在FastGPT私有部署版本4.8.3中，测试类似`function main(){return {result:123}}`的简单自定义输出函数时，无法获取到自定义输出的结果。用户通过将docker-compose.yaml配置中的sandbox镜像版本从v4.8.3修改为v4.8.2后，该功能恢复正常。

## 可能原因
sandbox服务负责执行用户编写的自定义代码逻辑，当前使用的v4.8.3版本sandbox镜像存在功能异常，导致自定义代码执行后无法正确返回预期结果，进而引发自定义输出无结果的问题。

## 排查步骤
1. 登录FastGPT的部署服务器，打开docker-compose.yaml配置文件，查找sandbox服务的image配置项，确认当前使用的镜像标签版本。
2. 在FastGPT应用流程中添加自定义输出节点，编写如`function main(){return {result:123}}`的测试代码，运行流程验证是否无法获取预期结果。
3. 若当前sandbox镜像版本为v4.8.3，将其修改为v4.8.2。
4. 执行docker-compose up -d sandbox命令重启sandbox服务，重新测试自定义输出功能。

## 解决与验证
修改docker-compose.yaml中的sandbox镜像配置，将`ghcr.io/labring/fastgpt-sandbox:v4.8.3`替换为`ghcr.io/labring/fastgpt-sandbox:v4.8.2`，保存配置后重启相关容器。重新运行包含自定义输出的流程，即可正常获取到预期的输出结果，例如示例中的`result:123`。

> 来源：[FastGPT GitHub issue](https://github.com/labring/FastGPT/issues/1659)
