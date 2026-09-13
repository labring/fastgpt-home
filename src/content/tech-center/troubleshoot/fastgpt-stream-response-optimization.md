---
title: 解决FastGPT对话接口stream=true时无间隔流式返回问题
slug: /zh/troubleshoot/fastgpt-stream-response-optimization
page_type: 排错/错误码
source: https://github.com/labring/FastGPT/issues/1064
source_type: GitHub issue
---

# 解决FastGPT对话接口stream=true时无间隔流式返回问题

## 现象
对话接口请求参数配置detail=false、stream=true时，返回内容为流式格式，但每条返回数据的时间间隔极端，页面展示时无法感知流式效果，呈现为一次性展示全部结果的状态。

## 可能原因
服务器端会第一时间返回流式数据，问题源于客户端未对返回的流式数据做合理的帧率优化处理，导致视觉上无法感知分段展示效果。

## 排查步骤
1. 确认对话接口请求参数中配置了detail=false与stream=true。
2. 检查客户端对接FastGPT对话接口的实现逻辑。
3. 对比FastGPT官方fetch接口的处理流程。

## 解决与验证
参考FastGPT官方fetch接口实现帧率优化，调整客户端对返回的流式数据的处理逻辑，合理控制数据展示的时间间隔。完成调整后，验证页面可正常分段展示流式返回结果。

> 来源: [FastGPT GitHub issue #1064](https://github.com/labring/FastGPT/issues/1064)
