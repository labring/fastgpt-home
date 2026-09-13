---
title: 解决FastGPT高级编排知识库搜索不支持HTTPS网址入参的问题
slug: /zh/troubleshoot/fastgpt-advanced-orchestration-url-input
page_type: 排错/错误码
source: https://github.com/labring/FastGPT/issues/782
source_type: GitHub issue
---

# 解决FastGPT高级编排知识库搜索不支持HTTPS网址入参的问题

## 现象
在FastGPT高级编排场景中，使用知识库搜索功能时，无法将HTTPS网址作为入参传入。无法在调用谷歌搜索插件后，将搜索结果自动传入知识库以创建网页知识库，进而通过向量数据库完成内容分析并输出答案。

## 可能原因
当前FastGPT高级编排的知识库搜索功能未配置支持HTTPS网址作为入参，无法直接对接外部搜索插件的结果生成网页知识库。相关限制细节需按实际环境确认。

## 排查步骤
1. 确认已将FastGPT升级至最新版本。
2. 进入高级编排配置页面，尝试输入HTTPS网址作为知识库搜索的入参。
3. 验证是否无法正常触发知识库创建流程或完成向量分析。

## 解决与验证
目前该功能暂未在当前FastGPT版本中实现。如需使用该能力，需等待后续版本更新，或按实际开发需求进行自定义配置。具体的调整方案需按实际环境确认。

> 来源: [FastGPT GitHub issue #782](https://github.com/labring/FastGPT/issues/782)
