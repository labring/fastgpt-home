---
title: 解决FastGPT 4.6.4版本私有部署语音输入点击无反应问题
slug: /zh/troubleshoot/fastgpt-voice-input-working
page_type: 故障排查
source: https://github.com/labring/FastGPT/issues/687
source_type: GitHub issue
---

# 解决FastGPT 4.6.4版本私有部署语音输入点击无反应问题

## 现象
FastGPT v4.6.4私有部署版本中，点击语音输入按钮无响应，仅显示“语音输入”提示文字。使用Chrome、Safari浏览器均出现该问题，其他功能如GPT4V文件上传功能可正常使用。

## 可能原因
需结合实际部署环境与浏览器配置排查，暂无明确预设的通用原因。

## 排查步骤
1. 确认当前使用的FastGPT版本为v4.6.4，且为私有部署模式。
2. 打开浏览器开发者工具的控制台面板，查看是否存在与语音输入相关的JavaScript报错信息，确认语音API调用是否正常。
3. 更换其他浏览器或清除当前浏览器的缓存与Cookie后重试，排除浏览器本地配置或缓存导致的问题。
4. 检查部署环境的网络配置，确认是否允许语音相关资源的加载与外部API调用。

## 解决与验证
需根据排查结果定位具体问题后执行对应修复。验证方式为点击语音输入按钮，确认可正常触发语音采集流程，出现音频状态变化提示并可正常录入语音内容。

> 来源： [FastGPT 官方来源](https://github.com/labring/FastGPT/issues/687)

## 适用性与版本范围

本页适用于官方来源记录的 故障排查 场景。执行变更前，需核对 FastGPT、依赖、API 与部署版本。

## 安全护栏

凭证与私密数据使用 [REDACTED_CREDENTIAL] 占位符。执行操作前需核对文档的环境与版本。

## 回滚指引

恢复变更前的技术内容权威快照、已保存配置与数据快照，再执行最小验证场景。
