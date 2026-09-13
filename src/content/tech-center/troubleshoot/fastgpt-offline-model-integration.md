---
title: 解决FastGPT集成开源离线私有LLM与embedding模型的部署问题
slug: /zh/troubleshoot/fastgpt-offline-model-integration
page_type: 排错/错误码
source: https://github.com/labring/FastGPT/issues/387
source_type: GitHub issue
---

# 解决FastGPT集成开源离线私有LLM与embedding模型的部署问题

## 现象
在FastGPT中尝试集成更多开源离线私有LLM模型和embedding模型，并通过docker镜像部署时，无法实现预期的模型集成效果。按照现有流程配置后，模型无法正常加载或调用，业务流程无法正常运行。

## 可能原因
FastGPT本身不单独提供开源离线私有LLM模型与embedding模型的集成适配服务。用户未明确FastGPT的模型集成规则，误以为FastGPT内置了更多开源离线模型的集成支持，导致提交的需求或配置不符合官方要求。

## 排查步骤
1. 确认当前使用的FastGPT版本已升级至最新正式版本，确保不存在版本兼容问题。
2. 查阅FastGPT官方文档中关于模型集成的说明内容，确认官方支持的模型类型与集成方式。
3. 检查部署配置中与模型集成相关的参数设置，核对是否符合官方文档要求。
4. 确认提交流程是否符合FastGPT仓库的issue提交规范。

## 解决与验证
该类模型集成相关的需求或问题，不应在FastGPT仓库提交。需将需求描述、应用场景等相关信息，提交至对应适配工具的官方仓库。提交时需遵循对应仓库的提交流程，明确说明需要支持的模型类型、部署方式等内容。验证方式为等待对应仓库的维护者反馈，确认需求是否被受理或获取到对应的解决方案。

> 来源: [FastGPT GitHub issue #387](https://github.com/labring/FastGPT/issues/387)
