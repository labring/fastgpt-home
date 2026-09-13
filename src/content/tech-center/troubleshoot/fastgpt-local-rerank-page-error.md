---
title: 解决FastGPT调用本地Rerank返回正常但页面显示失败的问题
slug: /zh/troubleshoot/fastgpt-local-rerank-page-error
page_type: 故障排查
source: https://github.com/labring/FastGPT/issues/1803
source_type: GitHub issue
---

# 解决FastGPT调用本地Rerank返回正常但页面显示失败的问题

## 现象
FastGPT私有部署版本v4.8.4-alpha，调用本地Rerank服务时，本地服务日志显示调用成功且正常返回结果，但FastGPT前端页面显示红色叉号，无重排相关的展示信息，附带页面报错截图与本地调用成功的日志截图。

## 可能原因
该问题的具体原因需按实际部署环境确认，可能涉及本地Rerank服务的接口返回格式不符合FastGPT的解析要求、FastGPT配置的本地服务地址或参数错误，或数据在传输过程中出现异常，导致FastGPT无法正确解析返回结果。

## 排查步骤
1. 核对本地Rerank服务的调用返回结果，确认与issue中展示的成功返回格式一致；
2. 检查FastGPT后台配置的本地Rerank服务地址、相关参数是否与本地服务的部署信息匹配；
3. 查看FastGPT的后台日志，提取与Rerank调用相关的详细错误信息，定位异常环节；
4. 结合前端页面显示的红色叉号提示，进一步确认异常发生的具体位置。

## 解决与验证
若排查后确认本地Rerank服务的接口返回格式不符合FastGPT的解析规则，调整本地服务的返回格式以匹配FastGPT的要求；若FastGPT的配置参数存在错误，修正配置项后重启FastGPT服务。验证时重新触发Rerank功能，确认前端页面不再显示红色叉号，且正常展示重排相关的信息。

> 来源： [FastGPT 官方来源](https://github.com/labring/FastGPT/issues/1803)

## 适用性与版本范围

本页适用于官方来源记录的 故障排查 场景。执行变更前，需核对 FastGPT、依赖、API 与部署版本。

## 安全护栏

凭证与私密数据使用 [REDACTED_CREDENTIAL] 占位符。执行操作前需核对文档的环境与版本。

## 回滚指引

恢复变更前的技术内容权威快照、已保存配置与数据快照，再执行最小验证场景。
