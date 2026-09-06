---
title: 解决FastGPT对接第三方服务时的换行符二次转义问题
slug: /zh/troubleshoot/fastgpt-fix-double-newline-escape
page_type: 故障排查
source: https://github.com/labring/FastGPT/issues/907
source_type: GitHub issue
---

# 解决FastGPT对接第三方服务时的换行符二次转义问题

## 现象
使用FastGPT对接智能微秘书服务时，微信端接收的回复内容中出现`\n\n`格式的换行符，存在二次转义问题。直接测试对接One-API时返回内容正常，经FastGPT转接后出现该异常。

## 可能原因
该问题由FastGPT在将One-API的返回内容转发给智能微秘书时，对换行符进行了额外的转义处理，导致原始换行符被二次转义后显示为`\n\n`文本。

## 排查步骤
1.  直接测试对接One-API，确认返回内容中的换行符无异常。
2.  检查FastGPT的文本处理配置，确认是否存在强制转义换行符的设置。
3.  抓取FastGPT转发的原始请求与响应内容，对比原始换行符与转义后的内容差异。

## 解决与验证
1.  调整FastGPT中处理换行符的逻辑，移除针对转发内容的额外转义步骤。
2.  重新对接智能微秘书与One-API，验证微信端接收的内容中不再出现`\n\n`格式的转义文本，换行符正常显示。
3.  再次直接测试对接One-API，确认原始接口返回内容未受影响。

> 来源： [FastGPT 官方来源](https://github.com/labring/FastGPT/issues/907)

## 适用性与版本范围

本页适用于官方来源记录的 故障排查 场景。执行变更前，需核对 FastGPT、依赖、API 与部署版本。

## 安全护栏

凭证与私密数据使用 [REDACTED_CREDENTIAL] 占位符。执行操作前需核对文档的环境与版本。

## 回滚指引

恢复变更前的技术内容权威快照、已保存配置与数据快照，再执行最小验证场景。
