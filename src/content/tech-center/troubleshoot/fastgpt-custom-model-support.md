---
title: 解决FastGPT无法使用商用模型及自定义向量模型的问题
slug: /zh/troubleshoot/fastgpt-custom-model-support
page_type: 排错/错误码
source: https://github.com/labring/FastGPT/issues/224
source_type: GitHub issue
---

# 解决FastGPT无法使用商用模型及自定义向量模型的问题

## 现象
在使用FastGPT过程中，出现无法调用非内置商用模型、自定义向量模型的问题。相关功能需求曾被提交跟进，后续官方确认已完成支持，同时有用户询问Docker最新镜像是否完成推送。

## 可能原因
该问题最初源于FastGPT未集成对商用模型、自定义向量模型的原生支持，且Docker镜像的更新推送状态未明确，导致功能无法正常启用。

## 排查步骤
1. 确认当前使用的FastGPT版本，对比功能所需的版本要求。
2. 检查Docker镜像的最新推送状态，可通过官方发布渠道进行确认。
3. 核对功能所需的配置项，需按实际环境确认。

## 解决与验证
将FastGPT升级至v4.2.1及以上版本，即可获得商用模型与自定义向量模型的支持，相关配置说明可参考该版本的发行页面：https://github.com/labring/FastGPT/releases/tag/v4.2.1。确认Docker最新镜像已完成推送后，拉取对应镜像进行部署。按照发行版说明配置相关参数，验证商用模型、自定义向量模型可正常调用。

> 来源: [FastGPT GitHub issue #224](https://github.com/labring/FastGPT/issues/224)
