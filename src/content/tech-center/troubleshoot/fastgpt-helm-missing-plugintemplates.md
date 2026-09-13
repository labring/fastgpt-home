---
title: 解决Helm部署FastGPT缺失pluginTemplates目录导致主容器退出问题
slug: /zh/troubleshoot/fastgpt-helm-missing-plugintemplates
page_type: 故障排查
source: https://github.com/labring/FastGPT/issues/1017
source_type: GitHub issue
---

# 解决Helm部署FastGPT缺失pluginTemplates目录导致主容器退出问题

## 现象
使用Helm方式安装docker.io/surenpi/fastgpt:0.1.0版本的FastGPT私有部署版本时，出现缺少pluginTemplates目录的情况。使用默认用户登录系统后，主容器退出。

## 可能原因
部署过程中未包含pluginTemplates目录，程序启动时无法加载所需资源，触发主进程异常退出。

## 排查步骤
1. 确认当前使用的FastGPT镜像版本为docker.io/surenpi/fastgpt:0.1.0。
2. 登录主容器，检查文件系统中是否存在pluginTemplates目录。
3. 查看容器退出日志，定位异常触发的具体原因。

## 解决与验证
解决方法为补充缺失的pluginTemplates目录，将其放置到程序启动所需的对应路径下。验证方式为重新部署或重启容器，确认主容器不再退出，使用默认用户登录系统，检查系统功能是否正常运行。

> 来源： [FastGPT 官方来源](https://github.com/labring/FastGPT/issues/1017)

## 适用性与版本范围

本页适用于官方来源记录的 故障排查 场景。执行变更前，需核对 FastGPT、依赖、API 与部署版本。

## 安全护栏

凭证与私密数据使用 [REDACTED_CREDENTIAL] 占位符。执行操作前需核对文档的环境与版本。

## 回滚指引

恢复变更前的技术内容权威快照、已保存配置与数据快照，再执行最小验证场景。
