---
title: 解决FastGPT知识库分割符无法识别Word连续回车分块的问题
slug: /zh/troubleshoot/fastgpt-word-newline-split
page_type: 故障排查
source: https://github.com/labring/FastGPT/issues/4218
source_type: GitHub issue
---

# 解决FastGPT知识库分割符无法识别Word连续回车分块的问题

## 现象
在FastGPT知识库创建流程中，上传Word文档后，使用系统默认分割规则，或配置\n\n、\r\n、(\r?\n|\r){2}、(\r?\n|\r){3}作为自定义分割符，均无法通过连续两次回车实现文档分块。

## 可能原因
需按实际环境确认，当前配置的分割符未生效可能与系统分割规则的换行符匹配逻辑，或实际文本的换行格式有关。

## 排查步骤
1. 进入FastGPT知识库创建流程，上传待处理的Word文档。
2. 进入分割规则配置环节，依次测试系统默认分割、\n\n、\r\n、(\r?\n|\r){2}、(\r?\n|\r){3}作为分割符。
3. 查看最终生成的分块结果，确认是否通过连续两次回车实现预期分块。

## 解决与验证
若需实现Word文档连续两次回车分块，可尝试调整分割符配置，或等待功能迭代优化。验证时可上传包含连续两次回车的Word文档，检查分块是否符合预期。

> 来源： [FastGPT 官方来源](https://github.com/labring/FastGPT/issues/4218)

## 适用性与版本范围

本页适用于官方来源记录的 故障排查 场景。执行变更前，需核对 FastGPT、依赖、API 与部署版本。

## 安全护栏

凭证与私密数据使用 [REDACTED_CREDENTIAL] 占位符。执行操作前需核对文档的环境与版本。

## 回滚指引

恢复变更前的技术内容权威快照、已保存配置与数据快照，再执行最小验证场景。
