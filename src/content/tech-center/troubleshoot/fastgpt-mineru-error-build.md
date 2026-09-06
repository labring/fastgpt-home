---
title: 解决FastGPT调用MinerU API报错422及适配镜像构建问题
slug: /zh/troubleshoot/fastgpt-mineru-error-build
page_type: 故障排查
source: https://github.com/labring/FastGPT/issues/7498
source_type: GitHub issue
---

# 解决FastGPT调用MinerU API报错422及适配镜像构建问题

## 现象
使用私有部署v4.14.6版本的FastGPT，调用本地部署的MinerU API时，返回报错Request failed with status code 422。用户需要基于最新版本的MinerU构建适配FastGPT的镜像，用于PDF解析调用。

## 可能原因
未构建适配FastGPT调用规范的MinerU镜像，或本地部署的MinerU版本与FastGPT的调用要求不匹配，导致接口返回422错误。

## 排查步骤
1. 确认FastGPT私有部署版本为v4.14.6，明确当前使用的MinerU版本。
2. 检查调用MinerU API的请求参数是否符合接口规范。
3. 验证本地MinerU服务是否可正常响应其他合法请求。

## 解决与验证
1. 拉取最新版本的MinerU源码或官方镜像。
2. 按照FastGPT的接口适配要求调整镜像配置，需按实际环境确认具体调整项。
3. 构建自定义MinerU镜像并部署到可用环境。
4. 在FastGPT的配置中指定使用该自定义镜像或本地部署的MinerU服务。
验证方式：发起PDF解析请求，确认不再返回Request failed with status code 422错误，且解析结果符合预期。

> 来源： [FastGPT 官方来源](https://github.com/labring/FastGPT/issues/7498)

## 适用性与版本范围

本页适用于官方来源记录的 故障排查 场景。执行变更前，需核对 FastGPT、依赖、API 与部署版本。

## 安全护栏

凭证与私密数据使用 [REDACTED_CREDENTIAL] 占位符。执行操作前需核对文档的环境与版本。

## 回滚指引

恢复变更前的技术内容权威快照、已保存配置与数据快照，再执行最小验证场景。
