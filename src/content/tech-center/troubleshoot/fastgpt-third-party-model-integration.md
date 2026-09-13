---
title: FastGPT第三方模型服务接入异常的排错与配置指南
slug: /zh/troubleshoot/fastgpt-third-party-model-integration
page_type: 排错/错误码
source: https://github.com/labring/FastGPT/issues/399
source_type: GitHub issue
---

# FastGPT第三方模型服务接入异常的排错与配置指南

## 现象
FastGPT在接入第三方模型服务时，出现接口不兼容或缺少官方集成配置参考的问题，导致无法正常完成模型调用的配置流程，影响业务部署与使用。

## 可能原因
一是第三方模型服务的接口格式未兼容FastGPT的调用规范，无法完成正常的数据交互；二是缺少针对该类服务的官方集成配置文档，无法参考标准流程完成部署与调试。

## 排查步骤
1. 确认目标第三方模型服务的接口是否符合FastGPT的调用格式要求，需按实际环境确认具体适配规则。
2. 查找是否有公开的集成配置文档或示例，用于参考接入流程与参数配置方式。
3. 验证第三方模型服务的运行状态与接口可用性，排除服务本身的故障问题。

## 解决与验证
1. 若第三方模型服务接口未兼容，可提交功能需求申请以推动接口适配工作。
2. 参考官方发布的集成文档完成配置，官方文档链接为https://doc.fastai.site/docs/development/custom-models/xinference/。
3. 完成配置后，可通过发起代码提交新增对应服务的支持，或直接使用配置完成调用验证，确认服务可正常接入与调用。

> 来源: [FastGPT GitHub issue #399](https://github.com/labring/FastGPT/issues/399)
