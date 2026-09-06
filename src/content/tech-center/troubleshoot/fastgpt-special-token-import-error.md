---
title: 解决FastGPT导入文档时触发特殊token报错的问题
slug: /zh/troubleshoot/fastgpt-special-token-import-error
page_type: 故障排查
source: https://github.com/labring/FastGPT/issues/270
source_type: GitHub issue
---

# 解决FastGPT导入文档时触发特殊token报错的问题

## 现象
使用私有部署版本的FastGPT导入《GPT_4，通用人工智能的火花》154页微软GPT研究报告（全中文版）.pdf时，系统生成报错日志：[ERROR]: 2023-09-07 08:04:05: response error: The text contains a special token that is not allowed: <|endofprompt|>，无法完成文档导入流程。

## 可能原因
待导入的文档文本中包含了FastGPT不允许的特殊token，本次报错中涉及的特殊token为<|endofprompt|>。系统的文本处理逻辑会校验输入文本中的token，拦截包含不被允许的特殊token的内容，避免触发后续流程异常。

## 排查步骤
1. 查看系统生成的完整报错日志，提取其中明确的不被允许的特殊token具体内容。
2. 打开待导入的文档，检索全文，定位包含该特殊token的具体段落或位置。
3. 需按实际环境确认当前FastGPT版本支持的特殊token范围，排查是否存在其他未被识别的特殊token。

## 解决与验证
对定位到的包含不允许特殊token的内容进行编辑，移除该特殊token，例如本次报错中的<|endofprompt|>。保存修改后的文档，重新执行FastGPT的文档导入操作。若导入过程未再出现同类报错，则完成修复。若仍出现报错，需重复检索与移除特殊token的步骤，直至导入成功。

> 来源： [FastGPT 官方来源](https://github.com/labring/FastGPT/issues/270)

## 适用性与版本范围

本页适用于官方来源记录的 故障排查 场景。执行变更前，需核对 FastGPT、依赖、API 与部署版本。

## 安全护栏

凭证与私密数据使用 [REDACTED_CREDENTIAL] 占位符。执行操作前需核对文档的环境与版本。

## 回滚指引

恢复变更前的技术内容权威快照、已保存配置与数据快照，再执行最小验证场景。
