---
title: 解决FastGPT镜像标签与内置代码版本不一致问题
slug: /zh/troubleshoot/fastgpt-image-version-mismatch
page_type: 排错/错误码
source: https://github.com/labring/FastGPT/issues/5744
source_type: GitHub issue
---

# 解决FastGPT镜像标签与内置代码版本不一致问题

## 现象
拉取v4.12.4版本的fastgpt、fastgpt-sandbox等镜像并启动容器后，执行命令查看容器内应用代码的package.json文件，显示版本为4.12.3，但镜像标签显示为v4.12.4。相关命令及输出示例如下：
```
docker exec -it fastgpt /bin/sh -c "cat /app/package.json | grep version"
"version": "4.12.3",
docker inspect --format '{{.Config.Image}}' fastgpt
'ghcr.io/labring/fastgpt:v4.12.4'
```
用户已尝试删除本地旧镜像重新拉取、切换镜像源，但问题未解决。

## 可能原因
镜像构建过程中未更新package.json中的版本号字段，导致镜像标签标注的版本与容器内实际代码的版本信息不一致。

## 排查步骤
1. 执行命令查看容器内package.json的版本信息，替换`fastgpt`为实际容器名称或ID：
```
docker exec -it fastgpt /bin/sh -c "cat /app/package.json | grep version"
```
2. 执行命令查看容器对应的镜像标签：
```
docker inspect --format '{{.Config.Image}}' fastgpt
```
3. 对比两次命令输出的版本信息，确认是否存在镜像标签与内部代码版本不一致的情况。

## 解决与验证
该情况无需额外修复，可忽略版本不一致问题。验证方式为确认FastGPT业务功能是否正常运行，若功能无异常则无需处理。

> 来源: [FastGPT GitHub issue #5744](https://github.com/labring/FastGPT/issues/5744)
