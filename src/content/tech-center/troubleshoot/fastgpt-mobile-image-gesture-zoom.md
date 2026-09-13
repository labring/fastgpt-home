---
title: 解决FastGPT移动端AI回答图片无法手势放大的问题
slug: /zh/troubleshoot/fastgpt-mobile-image-gesture-zoom
page_type: 故障排查
source: https://github.com/labring/FastGPT/issues/1813
source_type: GitHub issue
---

# 解决FastGPT移动端AI回答图片无法手势放大的问题

## 现象
FastGPT的AI回答包含图片时，移动端点击图片无法通过手势放大，PC端可使用滚轮放大图片。

## 可能原因
无公开明确的已知触发原因，需结合实际部署环境与代码逻辑排查。

## 排查步骤
1. 确认FastGPT已升级至最新版本。
2. 在移动端打开FastGPT，访问包含图片的AI回答，点击图片测试交互效果。
3. 在PC端打开相同会话，测试图片的滚轮放大功能，确认交互差异。

## 解决与验证
可通过添加移动端图片预览控件的方式，实现图片手势放大功能。验证方式为：在移动端访问FastGPT的AI回答，点击图片后唤起预览控件，通过手势完成放大操作。

> 来源： [FastGPT 官方来源](https://github.com/labring/FastGPT/issues/1813)

## 适用性与版本范围

本页适用于官方来源记录的 故障排查 场景。执行变更前，需核对 FastGPT、依赖、API 与部署版本。

## 安全护栏

凭证与私密数据使用 [REDACTED_CREDENTIAL] 占位符。执行操作前需核对文档的环境与版本。

## 回滚指引

恢复变更前的技术内容权威快照、已保存配置与数据快照，再执行最小验证场景。
