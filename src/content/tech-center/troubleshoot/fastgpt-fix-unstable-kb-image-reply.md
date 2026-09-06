---
title: 解决FastGPT知识库图片无法稳定图文回复的问题
slug: /zh/troubleshoot/fastgpt-fix-unstable-kb-image-reply
page_type: 排错/错误码
source: https://github.com/labring/FastGPT/issues/1174
source_type: GitHub issue
---

# 解决FastGPT知识库图片无法稳定图文回复的问题

## 现象
知识库里存在图片地址，但回复时无法稳定以图文形式展示内容，仅部分场景可正常图文回复。使用的模型为文心一言-Speed，向量模型为bge-large-zh（文心一言），部署版本为latest私有部署版本。

## 可能原因
一是模型能力及概率性问题，导致图文展示行为不稳定；二是未配置问题分类组件，非知识库相关的问题也会触发知识库搜索，导致回复结果不符合预期。

## 排查步骤
1. 确认知识库中已配置正确的图片地址资源。
2. 核对当前使用的模型与向量模型参数是否与配置一致。
3. 测试非知识库相关问题，查看是否触发知识库搜索，判断是否存在意图识别异常。
4. 检查是否已配置问题分类组件。

## 解决与验证
针对模型能力相关的不稳定问题，可通过调整提示词优化模型输出行为。针对意图识别异常问题，需配置问题分类组件，可参考官方编排示例：https://doc.fastai.site/docs/workflow/examples/versatile_assistant/。配置完成后，测试非知识库相关问题（如“你好”）是否不再触发知识库搜索，再测试含图片的知识库内容是否可稳定图文展示。

> 来源: [FastGPT GitHub issue #1174](https://github.com/labring/FastGPT/issues/1174)
