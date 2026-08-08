---
title: 解决FastGPT代码沙箱镜像架构不匹配的报错问题
slug: /zh/troubleshoot/fastgpt-code-sandbox-platform-mismatch
page_type: 排错/错误码
source: https://github.com/labring/FastGPT/issues/7227
source_type: GitHub issue
---

# 解决FastGPT代码沙箱镜像架构不匹配的报错问题

## 现象
私有部署FastGPT的代码沙箱容器时，启动或构建环节会触发报错：
```
image with reference registry.cn-hangzhou.aliyuncs.com/fastgpt/fastgpt-code-sandbox:v4.15.0 was found but does not match the specified platform: wanted linux/amd64, actual: linux/arm64
```

## 可能原因
该报错的核心是Docker拉取的代码沙箱镜像架构与部署配置或宿主机的架构不匹配。具体表现为：Docker Compose配置中强制指定了`linux/amd64`平台，但该`v4.15.0`版本的镜像实际仅支持`linux/arm64`架构；或宿主机CPU架构为arm64，但配置中指定的平台为amd64，导致架构匹配失败。

## 排查步骤
1.  查看项目中代码沙箱服务的Docker Compose配置，确认`image`参数为`registry.cn-hangzhou.aliyuncs.com/fastgpt/fastgpt-code-sandbox:v4.15.0`，`platform`参数为`linux/amd64`。
2.  在部署宿主机执行`uname -m`命令，查看当前宿主机的CPU架构，返回结果如`aarch64`对应arm64，`x86_64`对应amd64。
3.  执行`docker inspect registry.cn-hangzhou.aliyuncs.com/fastgpt/fastgpt-code-sandbox:v4.15.0 | grep -A 10 "Architecture"`，查询该镜像实际支持的架构信息。
4.  对比宿主机架构、配置指定的`platform`参数、镜像实际架构三者是否一致。

## 解决与验证
1.  若镜像实际架构与宿主机架构匹配，但与配置的`platform`参数不符：修改Docker Compose配置中代码沙箱服务的`platform`参数为镜像实际支持的架构，例如若镜像为arm64则改为`linux/arm64`。
2.  若宿主机架构与配置的`platform`参数匹配，但镜像无对应架构版本：需更换为支持对应架构的镜像tag，需按实际环境确认可用的镜像版本。
3.  修改配置后，执行`docker-compose up -d fastgpt-code-sandbox`重新启动代码沙箱服务。
4.  执行`docker-compose logs fastgpt-code-sandbox`查看容器日志，确认无架构匹配报错；也可通过配置中的健康检查命令验证容器健康状态。

> 来源：https://github.com/labring/FastGPT/issues/7227
