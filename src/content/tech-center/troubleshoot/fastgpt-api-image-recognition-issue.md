---
title: 解决FastGPT首次API传入图文无法识别的问题
slug: /zh/troubleshoot/fastgpt-api-image-recognition-issue
page_type: 故障排查
source: https://github.com/labring/FastGPT/issues/4414
source_type: GitHub issue
---

# 解决FastGPT首次API传入图文无法识别的问题

## 现象
通过API传入包含一张图片与一句配套问题的请求时，FastGPT无法识别图片内容。再次发起针对该图片的询问，例如询问图片中包含的内容时，可正常识别图片信息。当前使用v4.9.3私有部署版本，且调用使用的API Key可正常使用。

## 可能原因
未明确官方归因，需结合部署环境与调用链路排查，相关参数与配置需按实际环境确认。

## 排查步骤
1. 确认当前FastGPT版本为v4.9.3私有部署版本，且调用使用的API Key可正常使用。
2. 复现问题，记录首次图文请求与后续询问请求的完整调用参数。
3. 检查API调用的参数格式，确认符合官方文档要求。
4. 查看FastGPT服务日志，定位图片解析环节的异常信息。

## 解决与验证
可通过再次发起针对同一张图片的询问请求，验证是否可正常识别图片内容。若需优化首次调用的识别效果，需结合排查结果调整调用逻辑或部署配置，相关操作需按实际环境确认。

> 来源： [FastGPT 官方来源](https://github.com/labring/FastGPT/issues/4414)

## 适用性与版本范围

本页适用于官方来源记录的 故障排查 场景。执行变更前，需核对 FastGPT、依赖、API 与部署版本。

## 安全护栏

凭证与私密数据使用 [REDACTED_CREDENTIAL] 占位符。执行操作前需核对文档的环境与版本。

## 回滚指引

恢复变更前的技术内容权威快照、已保存配置与数据快照，再执行最小验证场景。
