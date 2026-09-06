---
title: 解决FastGPT大模型对接提示词自定义与日志记录问题
slug: /zh/troubleshoot/fastgpt-prompt-customization-log
page_type: 排错/错误码
source: https://github.com/labring/FastGPT/issues/1036
source_type: GitHub issue
---

# 解决FastGPT大模型对接提示词自定义与日志记录问题

## 现象
在FastGPT中对接大模型时，无法查看全量的提示词日志，无法自定义完整的提示词内容，无法手动添加system类型的消息。进行提示词工程时，仅能使用封装后的简单user角色提示词，不便开展针对性优化。无法通过可视化编辑替代原有Python脚本编写的提示词工程代码。

## 可能原因
FastGPT对大模型对接的提示词传参进行了封装处理，仅保留简单的user角色提示词，未开放全量提示词编辑与日志记录能力。工作流中的“提示词”默认映射为system prompt，但无法手动添加user、assistant类型的消息。

## 排查步骤
1. 确认当前FastGPT版本是否为最新正式版本
2. 进入现有提示词配置界面，检查是否支持添加system、user、assistant类型的消息
3. 查找提示词日志的查看入口，确认是否仅能看到封装后的提示词内容
4. 尝试在工作流中配置提示词，确认是否仅能使用预设的system prompt映射规则

## 解决与验证
目前FastGPT暂未开放完整的提示词全量编辑与日志记录功能。如需实现自定义提示词与日志记录，可通过工作流中的提示词配置项关联system prompt，并结合代码沙箱等扩展能力进行适配。具体实现方式需按实际环境确认，需关注官方功能更新以获取原生支持。

> 来源: [FastGPT GitHub issue #1036](https://github.com/labring/FastGPT/issues/1036)
