---
title: 说明FastGPT创建应用时LLM自动生成初始流程的相关情况
slug: /zh/troubleshoot/fastgpt-app-llm-auto-flow
page_type: 排错/错误码
source: https://github.com/labring/FastGPT/issues/1520
source_type: GitHub issue
---

# 说明FastGPT创建应用时LLM自动生成初始流程的相关情况

## 现象
用户在FastGPT中创建应用时，希望通过LLM自动生成初始流程配置，未找到对应功能入口。

## 可能原因
FastGPT暂未上线创建应用时自动生成初始流程的功能。该功能相关请求因长时间无活动被自动归档，暂未纳入开发规划。

## 排查步骤
1. 查阅FastGPT官方文档，确认创建应用的现有功能范围。
2. 查看对应功能诉求的归档状态，确认是否有更新动态。
3. 需按实际环境确认是否可通过自定义方式实现类似效果。

## 解决与验证
当前FastGPT仅支持生成prompt，过程展示效果类似生成工作流。如需实现类似自动生成流程的效果，可先通过LLM生成prompt，再结合现有流程配置工具完成应用搭建。若需推进自动生成初始流程的功能开发，需重新发起相关请求并补充对应信息。

> 来源: [FastGPT GitHub issue #1520](https://github.com/labring/FastGPT/issues/1520)
