---
title: FastGPT自定义代码执行与会话清除回调功能排障指南
slug: /zh/troubleshoot/fastgpt-custom-code-session-callback
page_type: 排错/错误码
source: https://github.com/labring/FastGPT/issues/1065
source_type: GitHub issue
---

# FastGPT自定义代码执行与会话清除回调功能排障指南

## 现象
用户需要在AI编排页面使用JS执行模块，处理自定义判断、字符处理、随机数等自定义逻辑；同时需要为通过webdis接入redis管理的会话状态，添加删除会话（clear）功能的回调。另有用户反馈请求body被限制为JSON格式，无法适配非JSON类型的自定义请求。

## 可能原因
官方未内置JS执行模块与会话清除回调功能；自定义代码执行存在安全风险，需额外实现环境隔离、资源占用限制与网络隔离；FastGPT默认请求格式限制为JSON，无法直接处理非JSON类型的自定义请求。

## 排查步骤
1. 确认是否需要使用自定义代码执行或会话清除回调功能。
2. 检查当前FastGPT版本是否已内置对应功能，需按实际环境确认。
3. 查看请求是否被限制为JSON格式，确认请求头与body的格式配置。

## 解决与验证
可通过搭建独立Node服务实现自定义代码执行：使用eval执行代码并返回结果，在FastGPT中调用该服务。该方案需自行实现环境隔离，避免恶意代码获取系统权限，同时限制代码占用的最大内存和CPU，实现网络隔离防止恶意请求占用带宽。会话清除回调功能需基于webdis接入的redis会话状态管理，结合删除会话逻辑自行实现。若需绕过JSON格式限制，可通过独立服务中转请求。验证时，调用自定义代码服务返回预期结果，会话清除回调触发后状态正常更新即可。

> 来源: [FastGPT GitHub issue #1065](https://github.com/labring/FastGPT/issues/1065)
