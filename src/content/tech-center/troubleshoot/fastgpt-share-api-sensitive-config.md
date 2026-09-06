---
title: 解决FastGPT前端分享页面接口暴露敏感配置信息的问题
slug: /zh/troubleshoot/fastgpt-share-api-sensitive-config
page_type: 排错/错误码
source: https://github.com/labring/FastGPT/issues/2638
source_type: GitHub issue
---

# 解决FastGPT前端分享页面接口暴露敏感配置信息的问题

## 现象
FastGPT应用前端分享页面调用的接口返回数据，会暴露应用配置、平台模型配置等敏感内容，且相关页面会展示这些数据。涉及的接口包括api/common/system/getInitData，以及api/core/chat/outLink/init，后者返回的data->app节点包含敏感配置信息，部分场景下该数据会直接展示在分享页面中。

## 可能原因
上述两个接口默认返回前端渲染所需的全部信息，未对敏感配置内容进行过滤处理，直接将相关配置信息返回至前端页面，导致敏感内容暴露。

## 排查步骤
1. 确认前端分享页面调用的接口为api/common/system/getInitData或api/core/chat/outLink/init。
2. 查看接口返回的完整数据，确认是否存在应用配置、模型配置等敏感信息。
3. 核对页面渲染逻辑，确认是否依赖该接口的全部返回数据，避免因数据缺失导致页面无法正常渲染。

## 解决与验证
当前接口返回的数据为前端渲染必需的公开信息，若存在未过滤的敏感配置信息，可申请添加对应过滤逻辑。若需使用模型别名展示，平台已支持别名配置，页面会展示别名，且不影响实际调用的模型名称。若现有配置无法满足保密需求，需按实际环境确认适配方案。

> 来源: [FastGPT GitHub issue #2638](https://github.com/labring/FastGPT/issues/2638)
