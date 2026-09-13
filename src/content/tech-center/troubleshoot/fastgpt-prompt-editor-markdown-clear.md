---
title: 解决FastGPT V4.12.4版Prompt编辑器输入空格后Markdown标记清除问题
slug: /zh/troubleshoot/fastgpt-prompt-editor-markdown-clear
page_type: 故障排查
source: https://github.com/labring/FastGPT/issues/5659
source_type: GitHub issue
---

# 解决FastGPT V4.12.4版Prompt编辑器输入空格后Markdown标记清除问题

## 现象
FastGPT V4.12.4私有部署版本的Prompt编辑器，在键盘输入Markdown语法内容时，输入空格后Markdown标记会被自动清除；复制的Markdown内容粘贴至编辑器后，不会出现该问题。

## 可能原因
需按实际环境确认，暂未明确具体技术根源。

## 排查步骤
1. 确认当前FastGPT版本为V4.12.4私有部署版本。
2. 在Prompt编辑器中手动输入Markdown语法内容，观察输入空格后的标记状态。
3. 复制合法的Markdown内容粘贴至编辑器，验证是否出现相同的标记清除问题。
4. 检查编辑器相关配置，确认是否存在自动格式化类设置。

## 解决与验证
临时解决方案为复制合法Markdown内容粘贴至编辑器，替代手动输入。验证方式为：手动输入Markdown语法内容并输入空格，确认Markdown标记未被自动清除。

> 来源： [FastGPT 官方来源](https://github.com/labring/FastGPT/issues/5659)

## 适用性与版本范围

本页适用于官方来源记录的 故障排查 场景。执行变更前，需核对 FastGPT、依赖、API 与部署版本。

## 安全护栏

凭证与私密数据使用 [REDACTED_CREDENTIAL] 占位符。执行操作前需核对文档的环境与版本。

## 回滚指引

恢复变更前的技术内容权威快照、已保存配置与数据快照，再执行最小验证场景。
