---
title: 配置并测试FastGPT的Marker PDF增强解析功能使用效果
slug: /zh/deploy/fastgpt-marker-pdf-enhanced-parse
page_type: 部署与升级
source: https://doc.fastgpt.cn/zh-CN/self-host/custom-models/marker
source_type: 官方文档
---

# 配置并测试FastGPT的Marker PDF增强解析功能使用效果

## 配置前提与功能说明
Marker是FastGPT的自定义PDF增强解析功能，可实现PDF文件的增强解析，完整提取文档内容并保留图片关联信息，生成携带图片链接的内容。该功能支持在知识库上传环节与应用配置环节启用，适配不同场景的PDF处理需求。

## 标准配置与测试步骤
1.  在知识库上传PDF文件时，勾选`PDF 增强解析`选项。
2.  如需查看解析日志，需提前将LOG_LEVEL设置为info或debug。上传完成后，查看系统日志，可观测到如下日志内容：
    ```
    [Info] 2024-12-05 15:04:42 Parsing files from an external service
    [Info] 2024-12-05 15:07:08 Custom file parsing is complete, time: 1316ms
    ```
3.  解析完成后，可查看解析后的PDF内容，其中会携带图片链接。
4.  若需在应用中使用该功能，可在应用的文件上传配置里，勾选`PDF 增强解析`选项。

未将LOG_LEVEL设置为info或debug时，无法查看Marker解析的相关日志。未勾选`PDF 增强解析`选项时，无法启用Marker的增强解析功能。

## 效果验证说明
完成配置流程后，通过Marker解析的PDF文件将携带图片链接，完整保留原始文档的图片关联信息。该解析流程的耗时记录为1316ms，符合常规PDF处理的时间表现。

> 来源： [FastGPT 官方来源](https://doc.fastgpt.cn/zh-CN/self-host/custom-models/marker)
> 来源： [FastGPT 官方来源](https://doc.fastgpt.cn/zh-CN/guide/getting-started)

## 适用性与版本范围

本页适用于官方来源记录的 部署与升级 场景。执行变更前，需核对 FastGPT、依赖、API 与部署版本。

## 安全护栏

凭证与私密数据使用 [REDACTED_CREDENTIAL] 占位符。执行操作前需核对文档的环境与版本。

## 回滚指引

恢复变更前的技术内容权威快照、已保存配置与数据快照，再执行最小验证场景。
