---
title: 解决FastGPT指定版本Docker镜像拉取失败问题
slug: /zh/troubleshoot/fastgpt-docker-image-pull-failed
page_type: 排错/错误码
source: https://github.com/labring/FastGPT/issues/2294
source_type: GitHub issue
---

# 解决FastGPT指定版本Docker镜像拉取失败问题

## 现象
执行Docker镜像拉取命令时出现失败报错，包含两种典型报错文本：
1.  `Error response from daemon: invalid reference format`
2.  `Error response from daemon: manifest for registry.cn-hangzhou.aliyuncs.com/fastgpt/fastgpt:V4.8.9-alpha not found: manifest unknown: manifest unknown`
涉及的镜像标签包含`V4.8.9-alpha`和`v4.8.9-alpha`。

## 可能原因
1.  目标版本的FastGPT镜像尚未完成构建，仓库中无对应镜像清单。
2.  镜像标签的大小写与仓库实际存储的标签不一致，导致无法匹配到对应镜像。
3.  镜像引用格式存在错误，触发无效引用格式报错。

## 排查步骤
1.  查看对应GitHub Actions的构建状态，确认目标镜像是否已构建完成。
2.  核对拉取命令中的镜像标签大小写，确保与仓库中实际存在的标签完全一致。
3.  检查镜像地址的格式是否符合Docker官方镜像引用规范，避免出现格式错误。

## 解决与验证
1.  等待目标镜像构建完成后，再执行拉取操作。
2.  使用与仓库完全匹配的镜像标签构造拉取命令，例如使用`v4.8.9-alpha`或确认后的正确标签。
3.  执行验证命令：`docker pull registry.cn-hangzhou.aliyuncs.com/fastgpt/fastgpt:匹配的标签`，无报错则表示拉取成功。

> 来源: [FastGPT GitHub issue #2294](https://github.com/labring/FastGPT/issues/2294)
