---
title: 解决FastGPT中HTTP调用SD后拼接Markdown的1M限制报错问题
slug: /zh/troubleshoot/fastgpt-sd-base64-1m-error
page_type: 故障排查
source: https://github.com/labring/FastGPT/issues/1427
source_type: GitHub issue
---

# 解决FastGPT中HTTP调用SD后拼接Markdown的1M限制报错问题

## 现象
使用HTTP请求节点调用stable diffusion接口，返回base64编码的图片，再使用文本加工节点拼接Markdown以展示图片。当图片尺寸为512*512时，触发body超过1M的限制报错；图片尺寸较小时，拼接流程可正常执行。

## 可能原因
base64编码的图片数据会占用较多存储空间，512*512尺寸的图片对应的base64数据可能达到或超过当前流程的1M内容长度限制，从而触发报错。

## 排查步骤
1.  统计HTTP调用返回的base64图片数据的实际长度。
2.  计算文本加工拼接后的完整内容总长度。
3.  确认1M限制的相关配置位置与调整方式（需按实际环境确认）。

## 解决与验证
可通过减小生成图片的尺寸，降低base64数据的体积，重新执行流程验证报错是否消除。或调整对应内容长度限制的配置（需按实际环境确认），验证拼接流程可正常处理512*512尺寸的图片数据。

> 来源： [FastGPT 官方来源](https://github.com/labring/FastGPT/issues/1427)

## 适用性与版本范围

本页适用于官方来源记录的 故障排查 场景。执行变更前，需核对 FastGPT、依赖、API 与部署版本。

## 安全护栏

凭证与私密数据使用 [REDACTED_CREDENTIAL] 占位符。执行操作前需核对文档的环境与版本。

## 回滚指引

恢复变更前的技术内容权威快照、已保存配置与数据快照，再执行最小验证场景。
