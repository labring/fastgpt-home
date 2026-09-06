---
title: 解决FastGPT使用marker_pdf解析多页复杂PDF返回504超时问题
slug: /zh/troubleshoot/fastgpt-marker-pdf-timeout-fix
page_type: 故障排查
source: https://github.com/labring/FastGPT/issues/4418
source_type: GitHub issue
---

# 解决FastGPT使用marker_pdf解析多页复杂PDF返回504超时问题

## 现象
使用FastGPT 4.9.0私有部署版本，接入marker_pdf解析50多页复杂PDF时，因服务器显存为16G，解析过程耗时3至5分钟，最终请求返回504超时错误。

## 可能原因
长耗时的PDF解析任务超出了系统预设的请求超时阈值，导致请求被中断并返回504超时错误。服务器显存资源有限，解析复杂PDF时占用较多资源，进一步延长了处理时长，加剧了超时问题的发生。

## 排查步骤
1. 记录解析50多页复杂PDF的实际耗时，确认是否达到3至5分钟。
2. 检查FastGPT系统的请求超时配置参数，确认预设阈值是否低于实际解析耗时。
3. 查看服务器显存使用情况，确认解析过程是否占用大量显存资源。

## 解决与验证
1. 调整FastGPT系统的请求超时阈值，使其高于实际解析所需的3至5分钟时长。
2. 重新发起解析50多页复杂PDF的请求，验证是否不再返回504超时错误，可正常完成解析。
3. 若服务器显存资源不足以支撑快速解析，需按实际环境确认优化资源占用的可行方案。

> 来源： [FastGPT 官方来源](https://github.com/labring/FastGPT/issues/4418)

## 适用性与版本范围

本页适用于官方来源记录的 故障排查 场景。执行变更前，需核对 FastGPT、依赖、API 与部署版本。

## 安全护栏

凭证与私密数据使用 [REDACTED_CREDENTIAL] 占位符。执行操作前需核对文档的环境与版本。

## 回滚指引

恢复变更前的技术内容权威快照、已保存配置与数据快照，再执行最小验证场景。
