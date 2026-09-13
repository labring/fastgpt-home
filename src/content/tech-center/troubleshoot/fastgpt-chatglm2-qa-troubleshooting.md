---
title: 解决FastGPT中ChatGLM2生成QA的参数配置与效果问题
slug: /zh/troubleshoot/fastgpt-chatglm2-qa-troubleshooting
page_type: 排错/错误码
source: https://github.com/labring/FastGPT/issues/197
source_type: GitHub issue
---

# 解决FastGPT中ChatGLM2生成QA的参数配置与效果问题

## 现象
使用ChatGLM2-6B-32K模型生成QA时，出现两类问题。一是无法在生成QA前选择模型、指定分段长度、指定生成问题数量，也无法自定义生成QA的prompt。二是输入的prompt中的system消息被忽略，生成的QA对质量不高。
## 可能原因
ChatGLM2模型本身对生成QA的参数适配存在局限，无法支持prompt中的system消息。生成QA的分段长度默认按模型最大长度的45%自动匹配，未提供明确的手动调整配置入口。
## 排查步骤
1. 确认当前生成QA所使用的模型为ChatGLM2系列。
2. 查看生成QA的配置界面，检查是否存在分段长度、问题数量、自定义生成prompt的设置选项。
3. 验证输入的system消息是否在生成流程中被正确传递。
## 解决与验证
1. 分段长度默认取模型最大长度的45%，需按实际环境确认是否存在手动调整的配置项。
2. ChatGLM2无法支持prompt中的system消息，生成的QA对质量不足以满足生产环境需求，可更换其他适配的模型。
3. 自定义生成QA的prompt功能，需按实际环境确认是否存在对应配置入口。
> 来源: [FastGPT GitHub issue #197](https://github.com/labring/FastGPT/issues/197)
