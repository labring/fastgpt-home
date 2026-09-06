---
title: FastGPT使用Helm方式部署的相关说明与注意事项
slug: /zh/glossary/fastgpt-helm-deployment-guide
page_type: 术语表
source: https://github.com/labring/FastGPT/issues/1013
source_type: 官方文档
---

# FastGPT使用Helm方式部署的相关说明与注意事项

## 一句话定义
Helm是FastGPT在Kubernetes环境下的部署工具，可通过Helm Chart完成FastGPT的部署配置与安装流程，简化Kubernetes环境下的FastGPT部署操作。

## 在FastGPT里怎么用
若需通过Helm方式部署FastGPT，可使用镜像地址docker.io/surenpi/fastgpt:0.1.0。部署前需确认已升级到FastGPT最新版本，且已完整查阅项目README与官方文档确认部署需求。若需提交自定义Helm Chart，可向项目仓库提交相关代码，经维护者评估认可后可合并至项目中。目前已有相关部署实践通过该镜像完成Helm部署，可参考相关流程完成操作。

## 容易搞错的地方
使用Helm安装FastGPT时，若部署环境缺少pluginTemplates目录，会触发主容器直接退出的问题，该问题对应的镜像版本为docker.io/surenpi/fastgpt:0.1.0。部署过程中需提前确认该目录存在，避免出现文件缺失引发的进程异常。若遇到主容器退出的情况，可优先检查pluginTemplates目录是否完整。

> 来源： [FastGPT 官方来源](https://github.com/labring/FastGPT/issues/1013)

## 适用性与版本范围

本页适用于官方来源记录的 术语表 场景。执行变更前，需核对 FastGPT、依赖、API 与部署版本。

## 安全护栏

凭证与私密数据使用 [REDACTED_CREDENTIAL] 占位符。执行操作前需核对文档的环境与版本。

## 回滚指引

恢复变更前的技术内容权威快照、已保存配置与数据快照，再执行最小验证场景。
