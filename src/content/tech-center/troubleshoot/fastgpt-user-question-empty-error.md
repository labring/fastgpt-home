---
title: 解决FastGPT应用中core.chat.error.User question empty报错问题
slug: /zh/troubleshoot/fastgpt-user-question-empty-error
page_type: 排错/错误码
source: https://github.com/labring/FastGPT/issues/713
source_type: GitHub issue
---

# 解决FastGPT应用中core.chat.error.User question empty报错问题

## 现象
使用ghcr.io/labring/fastgpt:latest镜像创建知识库与对话引导应用后，在应用内与FastGPT对话时，输入第二个问题后系统自动提示“问题补全”，随后抛出报错core.chat.error.User question empty。

## 可能原因
该报错大概率与应用编排配置有关，用户问题未正确传递到下一个模块；此外开启问题补全功能也可能触发该报错。

## 排查步骤
1. 确认当前应用使用的是高级编排模式还是简易模式。
2. 查看应用的编排内容，检查用户输入的问题是否正确传递至后续模块。
3. 检查是否开启了问题补全相关功能。

## 解决与验证
若开启了问题补全功能，可在应用的高级编排中关闭该功能。调整应用编排配置，确保用户问题正确传递到下一个模块。若此前从简易模式切换至高级编排模式，需重新确认编排逻辑。调整完成后，在应用内输入多个问题进行验证，确认不再触发core.chat.error.User question empty报错。

> 来源: [FastGPT GitHub issue #713](https://github.com/labring/FastGPT/issues/713)
