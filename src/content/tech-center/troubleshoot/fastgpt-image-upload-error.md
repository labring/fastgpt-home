---
title: 排查并解决FastGPT图片上传或显示异常的相关问题
slug: /zh/troubleshoot/fastgpt-image-upload-error
page_type: 故障排查
source: https://github.com/labring/FastGPT/issues/813
source_type: GitHub issue
---

# 排查并解决FastGPT图片上传或显示异常的相关问题

## 现象
使用FastGPT过程中出现图片相关异常，涉及设备系统为iphone13.6，上传的图片为经微信图片编辑后的内容，附带异常截图链接：https://github.com/labring/FastGPT/assets/49868554/a282e7c2-4812-425b-8aaf-c5db130a1f09。

## 可能原因
需按实际环境确认，可能涉及图片格式异常、设备系统兼容性问题或上传流程异常。

## 排查步骤
1. 确认当前使用的设备系统版本是否为iphone13.6。
2. 检查上传的图片是否经过微信图片编辑操作。
3. 打开附带的截图链接，查看图片异常的具体表现。
4. 核对FastGPT支持的图片格式要求，需按实际环境确认。

## 解决与验证
若图片异常由微信编辑操作导致，可尝试使用未编辑的原始图片重新上传，需按实际环境验证修复效果。若问题仍存在，需结合更多环境信息进一步排查。

> 来源： [FastGPT 官方来源](https://github.com/labring/FastGPT/issues/813)

## 适用性与版本范围

本页适用于官方来源记录的 故障排查 场景。执行变更前，需核对 FastGPT、依赖、API 与部署版本。

## 安全护栏

凭证与私密数据使用 [REDACTED_CREDENTIAL] 占位符。执行操作前需核对文档的环境与版本。

## 回滚指引

恢复变更前的技术内容权威快照、已保存配置与数据快照，再执行最小验证场景。
