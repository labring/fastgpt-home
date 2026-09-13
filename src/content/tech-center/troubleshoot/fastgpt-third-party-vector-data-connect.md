---
title: FastGPT 第三方向量库与外部数据的详细对接指南
slug: /zh/troubleshoot/fastgpt-third-party-vector-data-connect
page_type: 排错/错误码
source: https://github.com/labring/FastGPT/issues/507
source_type: GitHub issue
---

# FastGPT 第三方向量库与外部数据的详细对接指南

## 现象
用户在使用FastGPT时，希望对接第三方向量库或自建的外部数据存储，提出添加第三方向量库对接的需求，并询问外部数据对接的具体示例，未找到官方现成的第三方向量库对接配置。

## 可能原因
FastGPT未内置针对第三方向量库的原生对接插件，仅提供通用的http模块用于对接外部数据，部分用户未掌握该通用对接方法，因此发起相关咨询。

## 排查步骤
1. 确认待对接的第三方向量库或外部数据是否支持http接口调用，且接口参数符合通用请求格式要求。
2. 查阅官方提供的http模块对接示例文档，梳理对接的通用流程与配置要点。
3. 进入FastGPT的工作流配置页面，确认http模块已加载并可正常使用，需按实际环境确认启用状态。

## 解决与验证
FastGPT的http模块支持对接外部数据，可通过该模块实现第三方向量库或外部数据的对接。具体可参考官方示例文档：https://doc.fastgpt.in/docs/workflow/examples/lab_appointment/。按照文档步骤配置http模块的请求地址、请求方法、请求头及请求体参数，完成配置后发起测试调用，若能正常获取第三方向量库或外部数据的返回结果，则说明对接配置成功。

> 来源: [FastGPT GitHub issue #507](https://github.com/labring/FastGPT/issues/507)
