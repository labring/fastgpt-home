---
title: 解决m3e-large-api Docker部署加载模型失败的问题
slug: /zh/troubleshoot/m3e-large-api-docker-model-error
page_type: 排错/错误码
source: https://github.com/labring/FastGPT/issues/741
source_type: GitHub issue
---

# 解决m3e-large-api Docker部署加载模型失败的问题

## 现象
使用`docker run -p 6008:6008 --name=m3e-large-api stawky/m3e-large-api`命令启动容器，容器显示启动成功，但内部抛出报错：
```
No sentence-transformers model found with name ./moka-ai_m3e-large. Creating a new one with MEAN pooling.
本次加载模型的设备为CPU.
```
随后出现服务启动崩溃，报错栈顶为uvicorn服务启动失败的相关日志。

## 可能原因
从报错文本分析，核心问题是容器内无法找到指定路径的sentence-transformers模型文件。该镜像默认尝试加载`./moka-ai_m3e-large`模型，但该模型目录未存在于容器的当前工作目录中，导致模型加载失败，进而引发服务启动崩溃。

## 排查步骤
1.  进入运行异常的容器内部，执行文件列表命令，确认当前目录是否存在`moka-ai_m3e-large`模型目录
2.  核对原始启动命令，确认是否遗漏了本地模型目录的挂载配置
3.  在容器内执行`pwd`命令，确认当前工作目录与模型文件预期存放路径是否匹配
4.  确认所用镜像是否自带该模型文件，若未自带则需手动挂载本地模型

## 解决与验证
解决方法：
1.  提前将对应模型文件下载至本地指定目录
2.  修改启动命令，添加挂载卷参数，将本地模型目录映射到容器内的`./moka-ai_m3e-large`路径，示例命令：`docker run -p 6008:6008 -v /本地模型目录绝对路径:/app/moka-ai_m3e-large --name=m3e-large-api stawky/m3e-large-api`，请将`/本地模型目录绝对路径`替换为实际的本地模型存放路径
3.  重新启动容器，等待日志加载完成，确认无`No sentence-transformers model found`报错信息
4.  通过测试6008端口的方式，确认服务正常运行

> 来源：[FastGPT GitHub issue](https://github.com/labring/FastGPT/issues/741)
