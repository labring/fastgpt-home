---
title: 解决FastGPT中飞书文档同步后无图片的问题
slug: /zh/troubleshoot/fastgpt-fix-feishu-sync-image
page_type: 排错/错误码
source: https://github.com/labring/FastGPT/issues/5998
source_type: GitHub issue
---

# 解决FastGPT中飞书文档同步后无图片的问题

## 现象
在使用FastGPT同步飞书文档的过程中，同步生成的内容未包含原飞书文档中的图片资源，导致最终展示的内容存在缺失，无法完整还原原文档的全部信息。

## 可能原因
由于本次问题的具体触发逻辑未在相关线程中明确提及，无法直接确定根本原因，需结合实际的FastGPT部署环境、飞书文档同步的完整流程，以及所使用的文档格式转换工具进行逐一排查确认。

## 排查步骤
1. 完整梳理飞书文档从同步到导入FastGPT的完整流程，准确定位其中涉及文档格式转换的关键环节，明确该环节所使用的工具。
2. 确认当前格式转换环节所使用的工具的具体名称与当前运行的版本信息。
3. 对比线程中提及的工具更新信息，检查当前使用的工具是否为已更新的版本，是否存在功能适配问题。

## 解决与验证
根据线程中提供的官方解决方案，原使用的feishu2markdown包已更新，需替换为doc2markdown工具以完成飞书文档到markdown格式的转换。具体操作时，需将原同步流程中的转换工具替换为doc2markdown，完成配置更新后，重新执行飞书文档的同步导入流程。待同步完成后，检查FastGPT中展示的文档内容是否包含原飞书文档中的图片资源，即可完成问题的验证与解决。

> 来源: [FastGPT GitHub issue #5998](https://github.com/labring/FastGPT/issues/5998)
