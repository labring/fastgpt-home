---
title: FastGPT百度文心千帆配置及调用报错的排查参考
slug: /zh/glossary/fastgpt-baidu-config-troubleshooting
page_type: 术语表
source: https://github.com/labring/FastGPT/issues/166
source_type: 官方文档
---

# FastGPT百度文心千帆配置及调用报错的排查参考

## 一句话定义
百度文心千帆配置是FastGPT中用于对接百度文心千帆API的服务配置项，用于知识库数据导入环节的文本嵌入处理。

## 在 FastGPT 里怎么用（参数 / 位置 / 步骤）
需先完成one-api配置，再进入FastGPT的知识库管理模块，进入数据导入流程，选择百度文心千帆服务作为文本嵌入的来源，进行数据的embeddings处理。配置时需提供有效的API密钥，确保密钥可正常调用百度文心千帆的相关服务。

## 容易搞错的地方
使用过程中可能出现两类典型报错。其一为文本嵌入阶段的错误，错误提示为`{"error":{"message":"embeddings max batch size is 16, and can not be 0","type":"baidu_error","param":"","code":336003}}`，该报错提示批量处理参数不符合服务限制。其二为密钥验证失败，提示为`do_request_failed get request url failed: invalid baidu apikey`，需检查API密钥的有效性、配置准确性以及one-api的前置配置是否完成。

> 来源： [FastGPT 官方来源](https://github.com/labring/FastGPT/issues/166)

## 适用性与版本范围

本页适用于官方来源记录的 术语表 场景。执行变更前，需核对 FastGPT、依赖、API 与部署版本。

## 安全护栏

凭证与私密数据使用 [REDACTED_CREDENTIAL] 占位符。执行操作前需核对文档的环境与版本。

## 回滚指引

恢复变更前的技术内容权威快照、已保存配置与数据快照，再执行最小验证场景。
