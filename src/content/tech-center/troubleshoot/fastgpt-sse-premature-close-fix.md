---
title: 解决FastGPT API调用时SSE连接60秒内过早关闭的问题
slug: /zh/troubleshoot/fastgpt-sse-premature-close-fix
page_type: 排错/错误码
source: https://github.com/labring/FastGPT/issues/978
source_type: GitHub issue
---

# 解决FastGPT API调用时SSE连接60秒内过早关闭的问题

## 现象
通过API接口调用FastGPT的对话流水时，FastGPT运行日志会重复输出`sse error: Premature close`报错，且可观察到SSE连接在60秒后自动断开。单条报错详情包含明确的错误栈信息：`Error: Premature close`，异常源于`IncomingMessage.<anonymous> (/app/projects/app/.next/server/chunks/43326.js:9:72087)`，调用栈涉及Node.js的events、streams及进程调度相关模块。

## 可能原因
根据日志报错内容与观察到的60秒断开规律，问题的核心诱因是FastGPT内置的SSE连接默认超时阈值为60秒。当API调用的整体处理时长超过该阈值时，服务端会主动终止SSE连接，从而触发`Premature close`报错。

## 排查步骤
1.  登录FastGPT的部署环境，查看服务运行日志，确认是否存在`sse error: Premature close`报错，且报错的时间间隔符合60秒左右的规律。
2.  梳理当前发起的API调用业务流程，确认是否存在长文本生成、复杂知识库检索、多轮对话拼接等可能导致处理时长超过60秒的环节。
3.  查找FastGPT的配置文件，定位与SSE连接超时相关的配置项，需按实际部署环境确认配置文件的具体路径与参数名称。

## 解决与验证
1.  找到与SSE连接超时相关的配置项，将其默认的60秒阈值调整为大于60秒的自定义时长，例如120秒、300秒等，具体数值需根据实际业务的最长处理时长确定。
2.  重启FastGPT的服务进程，使新的配置参数生效。
3.  再次发起与之前相同的长时间API调用，观察服务日志是否不再出现`sse error: Premature close`报错，且SSE连接不再在60秒时自动断开，即可确认问题已解决。

> 来源：[FastGPT GitHub issue](https://github.com/labring/FastGPT/issues/978)
