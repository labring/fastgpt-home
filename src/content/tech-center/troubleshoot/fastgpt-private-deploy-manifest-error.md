---
title: 解决FastGPT私有部署镜像拉取时manifest未知报错问题
slug: /zh/troubleshoot/fastgpt-private-deploy-manifest-error
page_type: 故障排查
source: https://github.com/labring/FastGPT/issues/4495
source_type: GitHub issue
---

# 解决FastGPT私有部署镜像拉取时manifest未知报错问题

## 现象
部署FastGPT私有版本时，拉取registry.cn-hangzhou.aliyuncs.com/fastgpt/fastgpt-sandbox:v4.9.4镜像出现报错，具体报错文本为：manifest for registry.cn-hangzhou.aliyuncs.com/fastgpt/fastgpt-sandbox:v4.9.4 not found: manifest unknown: manifest unknown。

## 可能原因
该问题可能由镜像版本未在指定仓库发布、镜像仓库访问异常、本地镜像缓存异常导致，具体需按实际环境确认。

## 排查步骤
1. 核对目标镜像版本v4.9.4与对应仓库中实际发布的版本是否一致。
2. 检查当前环境网络是否可以正常连通registry.cn-hangzhou.aliyuncs.com镜像仓库。
3. 清理本地Docker镜像缓存后重新尝试拉取操作。
4. 确认部署配置文件中使用的镜像地址与官方发布地址是否匹配。

## 解决与验证
若镜像版本未在仓库发布，更换为仓库中存在的有效版本。若为网络或仓库访问问题，排查网络连通性或调整镜像源配置。清理缓存后执行docker pull registry.cn-hangzhou.aliyuncs.com/fastgpt/fastgpt-sandbox:v4.9.4命令，确认镜像拉取成功后，即可继续后续部署流程。

> 来源： [FastGPT 官方来源](https://github.com/labring/FastGPT/issues/4495)

## 适用性与版本范围

本页适用于官方来源记录的 故障排查 场景。执行变更前，需核对 FastGPT、依赖、API 与部署版本。

## 安全护栏

凭证与私密数据使用 [REDACTED_CREDENTIAL] 占位符。执行操作前需核对文档的环境与版本。

## 回滚指引

恢复变更前的技术内容权威快照、已保存配置与数据快照，再执行最小验证场景。
