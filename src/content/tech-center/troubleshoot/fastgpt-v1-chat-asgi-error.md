---
title: 解决FastGPT调用/v1/chat/completions接口时的ASGI应用异常问题
slug: /zh/troubleshoot/fastgpt-v1-chat-asgi-error
page_type: 排错/错误码
source: https://github.com/labring/FastGPT/issues/1375
source_type: GitHub issue
---

# 解决FastGPT调用/v1/chat/completions接口时的ASGI应用异常问题

## 现象
调用FastGPT的`/v1/chat/completions`接口时，服务器先返回`INFO:     172.27.0.5:33094 - "POST /v1/chat/completions HTTP/1.1" 200 OK`的正常日志，随后抛出`ERROR:    Exception in ASGI application`异常。完整报错栈包含`asyncio.exceptions.CancelledError: Cancelled by cancel scope 7f6a5de25540`，且调用涉及`sse_starlette`和`uvicorn`相关模块。

## 可能原因
该异常源于SSE连接处理时的异步取消操作。当客户端提前断开连接、请求被主动取消或超时，`sse_starlette`的`listen_for_disconnect`方法在等待接收消息时会触发`asyncio.CancelledError`，该异常未被正确捕获，进而引发ASGI应用层面的错误。

## 排查步骤
1. 提取服务器完整报错日志，确认是否包含`Exception in ASGI application`、`asyncio.exceptions.CancelledError`以及`sse_starlette`/`uvicorn`相关调用栈；
2. 检查发起调用的客户端是否存在提前断开连接、主动取消请求或请求超时的情况；
3. 确认当前环境中`sse_starlette`、`uvicorn`与FastGPT的版本兼容性，需按实际环境确认；
4. 检查FastGPT中处理`/v1/chat/completions`接口的代码逻辑，是否存在未捕获异步取消异常的分支。

## 解决与验证
1. 在FastGPT的SSE接口处理逻辑中，添加对`asyncio.CancelledError`的捕获处理，避免异常向上传播至ASGI服务器；
2. 重新部署修改后的FastGPT服务，再次调用`/v1/chat/completions`接口；
3. 确认服务器日志中不再出现该ASGI应用异常，且接口返回符合预期。

> 来源：[FastGPT GitHub issue](https://github.com/labring/FastGPT/issues/1375)
