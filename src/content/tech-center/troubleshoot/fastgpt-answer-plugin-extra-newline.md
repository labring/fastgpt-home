---
title: 解决FastGPT指定回复插件API调用时内容前多余换行符问题
slug: /zh/troubleshoot/fastgpt-answer-plugin-extra-newline
page_type: 故障排查
source: https://github.com/labring/FastGPT/issues/2309
source_type: GitHub issue
---

# 解决FastGPT指定回复插件API调用时内容前多余换行符问题

## 现象
使用FastGPT的指定回复插件时，在API调用场景下，回复内容前会多出一个换行符，与预期效果不符。该插件的核心代码位于packages/service/core/workflow/dispatchV1/tools/answer.ts的第35行，原代码返回的内容格式为`{ [NodeOutputKeyEnum.answerText]: \n${formatText} }`，即硬编码了前置换行符。

## 可能原因
该问题的直接原因为指定回复插件的代码中硬编码了前置换行符，导致API调用时自动为回复内容添加了额外的换行。根据issue反馈，公有云和私有部署版本均可能出现该问题，具体版本配置需按实际环境确认，无额外已知触发条件。

## 排查步骤
1. 定位到代码文件packages/service/core/workflow/dispatchV1/tools/answer.ts的第35行。
2. 查看该行代码的返回内容，确认是否存在硬编码的前置换行符`\n`。
3. 发起FastGPT的API调用，获取指定回复插件的输出结果，对比实际返回的回复内容与预期效果，验证是否存在多余的前置换行符。

## 解决与验证
解决该问题的操作是修改第35行的代码，移除前置的`\n`，将返回内容调整为`{ [NodeOutputKeyEnum.answerText]: formatText }`。完成代码修改后，重新部署服务或发起API调用，验证回复内容前不再出现多余的换行符，确认符合预期效果。

> 来源： [FastGPT 官方来源](https://github.com/labring/FastGPT/issues/2309)

## 适用性与版本范围

本页适用于官方来源记录的 故障排查 场景。执行变更前，需核对 FastGPT、依赖、API 与部署版本。

## 安全护栏

凭证与私密数据使用 [REDACTED_CREDENTIAL] 占位符。执行操作前需核对文档的环境与版本。

## 回滚指引

恢复变更前的技术内容权威快照、已保存配置与数据快照，再执行最小验证场景。
