---
title: 解决FastGPT问题预测功能未开放对外API接口的问题
slug: /zh/troubleshoot/fastgpt-open-prediction-api
page_type: 排错/错误码
source: https://github.com/labring/FastGPT/issues/2114
source_type: GitHub issue
---

# 解决FastGPT问题预测功能未开放对外API接口的问题

## 现象
尝试通过API调用FastGPT的问题预测功能时，无法获取基于提示词与用户问题生成的最多三句预测用户问题。已知该功能已内置，但未对外暴露可用的API接口。

## 可能原因
FastGPT内置的问题预测功能仅支持前端场景使用，未开放对外API接口，无法通过代码调用该功能生成预测问题。

## 排查步骤
1. 确认已升级至FastGPT最新版本，确保功能存在；
2. 检查FastGPT官方文档与配置项，确认是否存在该功能的API接口说明；
3. 验证是否可在前端界面正常使用问题预测功能；
4. 确认是否无法通过HTTP请求调用该功能的接口。

## 解决与验证
目前FastGPT的问题预测功能未开放对外API接口，若需通过接口调用该功能，需等待官方更新开放相关接口。需按实际环境确认是否存在自定义暴露接口的可行方案。验证方式为：在前端界面测试问题预测功能是否正常运行，同时尝试调用相关API接口，确认是否返回预测的用户问题列表。

> 来源: [FastGPT GitHub issue #2114](https://github.com/labring/FastGPT/issues/2114)
