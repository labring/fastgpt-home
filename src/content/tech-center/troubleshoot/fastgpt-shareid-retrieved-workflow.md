---
title: 解决FastGPT分享链接中shareId参数无法在流程编排获取的问题
slug: /zh/troubleshoot/fastgpt-shareid-retrieved-workflow
page_type: 故障排查
source: https://github.com/labring/FastGPT/issues/2476
source_type: GitHub issue
---

# 解决FastGPT分享链接中shareId参数无法在流程编排获取的问题

## 现象
FastGPT公有云版本中，分享链接携带的shareId参数，无法通过{{shareId}}模板变量在流程编排中获取。其他自定义参数可正常通过对应模板变量获取。

## 可能原因
仅shareId参数出现无法获取的异常，其他自定义参数调用正常，具体原因需按实际环境确认。

## 排查步骤
1.  确认目标分享链接中包含shareId参数
2.  核对流程编排中调用的变量名称为shareId，确认无拼写错误
3.  测试其他自定义参数的调用效果，确认流程编排的变量解析功能正常运行
4.  确认当前使用的FastGPT版本为公有云版本，与问题场景环境一致

## 解决与验证
若无法通过{{shareId}}直接获取参数值，可通过解析当前请求链接的方式提取shareId。验证时，使用携带shareId的分享链接访问系统，确认流程编排中可正确获取到对应参数值。

> 来源： [FastGPT 官方来源](https://github.com/labring/FastGPT/issues/2476)

## 适用性与版本范围

本页适用于官方来源记录的 故障排查 场景。执行变更前，需核对 FastGPT、依赖、API 与部署版本。

## 安全护栏

凭证与私密数据使用 [REDACTED_CREDENTIAL] 占位符。执行操作前需核对文档的环境与版本。

## 回滚指引

恢复变更前的技术内容权威快照、已保存配置与数据快照，再执行最小验证场景。
