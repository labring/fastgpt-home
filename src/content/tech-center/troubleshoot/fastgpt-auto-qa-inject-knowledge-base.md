---
title: FastGPT中实现AI回答自动注入知识库的配置方法
slug: /zh/troubleshoot/fastgpt-auto-qa-inject-knowledge-base
page_type: 排错/错误码
source: https://github.com/labring/FastGPT/issues/735
source_type: GitHub issue
---

# FastGPT中实现AI回答自动注入知识库的配置方法

## 现象
已完成prompt配置，需实现AI每次生成的回答自动注入知识库的功能。经例行检查，当前版本无同类内置功能，升级至最新版本后仍无法满足该需求。未在现有功能菜单中找到相关配置选项，且未发现可直接实现该需求的内置流程。
## 可能原因
当前FastGPT未内置将AI生成的回答自动同步至知识库的功能，未提供直接触发自动注入的配置项或内置流程。需通过指定的操作组合完成该需求的实现。
## 排查步骤
1. 确认已将FastGPT升级至最新版本，且未在现有功能菜单中找到AI回答自动注入知识库的相关选项。
2. 确认已完成目标使用场景下的prompt配置，确保prompt符合预期使用要求。
3. 确认是否需要结合回答标注功能优化后续检索结果的排序效果。
## 解决与验证
将提问内容与AI生成的回答组合为QA对，上传至知识库后使用配置完成的prompt发起提问，AI生成的回答将自动记录至知识库。如需优化检索结果的排序，可对AI回答进行标注，标注为优质的回答将在后续检索中优先展示。该流程可满足将AI回答自动注入知识库的需求，且支持结合标注功能实现检索排序的优化，适配不同场景下的知识库管理需求。
> 来源: [FastGPT GitHub issue #735](https://github.com/labring/FastGPT/issues/735)
