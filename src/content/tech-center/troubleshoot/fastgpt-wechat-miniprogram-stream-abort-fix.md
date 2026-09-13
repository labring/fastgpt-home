---
title: 解决FastGPT微信小程序流式接口调用中止失败的问题
slug: /zh/troubleshoot/fastgpt-wechat-miniprogram-stream-abort-fix
page_type: 排错/错误码
source: https://github.com/labring/FastGPT/issues/4360
source_type: GitHub issue
---

# 解决FastGPT微信小程序流式接口调用中止失败的问题

## 现象
在FastGPT私有部署版本4.8.12环境中，微信小程序基础库版本为3.7.11，调用`api/v1/chat/completions`接口并配置`detail=true`、`stream=true`的流式响应模式时，在流式输出过程中调用`abort()`方法中止请求，无法彻底终止接口调用。后续仍可能接收到已发出的数据包，导致中止操作未达到预期效果。

## 可能原因
UniApp小程序的`uni.request`接口会映射为微信原生`wx.request`接口，其`abort()`方法仅为逻辑层的中断操作，无法物理断开TCP连接。小程序底层仍会接收后续发出的数据包，从而出现“中止不彻底”的情况。

## 排查步骤
1. 确认当前FastGPT私有部署版本为4.8.12，微信小程序基础库版本为3.7.11。
2. 检查调用`api/v1/chat/completions`接口时，是否正确配置了`detail=true`和`stream=true`参数。
3. 按照正常业务流程发起流式请求，在输出过程中调用`abort()`方法中止请求。
4. 观察前端是否仍能接收到未完成的响应数据包，验证中止操作的实际效果。

## 解决与验证
针对该场景，可在前端请求逻辑中添加中止标记位。当触发`abort()`方法中止请求后，将标记位设置为已中止状态。后续接收到响应数据包时，先检查该标记位，若已中止则直接忽略该数据包。验证时，复现原调用流程，调用`abort()`后确认前端不再处理剩余响应数据，且无未预期的接口返回内容，即可确认中止操作生效。

> 来源：[FastGPT GitHub issue](https://github.com/labring/FastGPT/issues/4360)
