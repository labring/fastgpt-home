---
title: 解决FastGPT添加qwen模型渠道测试时requestUrl读取错误问题
slug: /zh/troubleshoot/fastgpt-model-test-requesturl-error-2
page_type: 故障排查
source: https://github.com/labring/FastGPT/issues/4254
source_type: GitHub issue
---

# 解决FastGPT添加qwen模型渠道测试时requestUrl读取错误问题

## 现象
私有部署版本4.9.1的FastGPT，启动应用并添加qwen模型渠道后，点击测试按钮时，页面提示 cannot read properties of undefined（reading ‘requestUrl’）。

## 可能原因
目前无明确触发原因，需结合实际部署环境与配置细节确认。

## 排查步骤
1. 确认当前使用的密钥可正常访问对应模型服务，且密钥配置无误。
2. 检查添加qwen模型渠道时的所有配置项是否完整填写，无遗漏。
3. 查看应用运行日志，获取更详细的报错信息，定位触发点。
4. 核对当前使用的FastGPT私有部署版本为4.9.1，确认版本兼容性。

## 解决与验证
根据排查结果修复对应问题后，重新进入模型渠道配置页面，点击测试按钮，确认不再出现 cannot read properties of undefined（reading ‘requestUrl’）报错，且模型测试正常通过。

> 来源： [FastGPT 官方来源](https://github.com/labring/FastGPT/issues/4254)

## 适用性与版本范围

本页适用于官方来源记录的 故障排查 场景。执行变更前，需核对 FastGPT、依赖、API 与部署版本。

## 安全护栏

凭证与私密数据使用 [REDACTED_CREDENTIAL] 占位符。执行操作前需核对文档的环境与版本。

## 回滚指引

恢复变更前的技术内容权威快照、已保存配置与数据快照，再执行最小验证场景。
