---
title: 排查并解决FastGPT整点定时异常API调用与报错问题
slug: /zh/troubleshoot/fastgpt-scheduled-api-call-error
page_type: 排错/错误码
source: https://github.com/labring/FastGPT/issues/1772
source_type: GitHub issue
---

# 排查并解决FastGPT整点定时异常API调用与报错问题

## 现象
1. 系统每小时会向OpenAI API发起两次gpt-3.5-turbo调用，消耗的token数量固定。
2. 整点时刻出现两类日志错误：一是`Schedule trigger error`，提示`Question is empty`；二是`Http request error`，状态码400，请求`/v1/images/generations`接口时，请求数据中`prompt`字段为空，同时伴随JSON解析错误与`Invalid JSON body`报错。
3. 即使取消所有自定义定时任务，该整点异常请求仍会出现。用户的应用中仅存在一个通过HTTP插件调用dall-e-3 API的应用，且该应用未配置定时任务。

## 可能原因
该问题在添加定时任务功能的版本后出现，可能的触发点包括：1. 系统内置的默认定时任务逻辑，即使用户关闭了自定义定时任务仍会运行；2. HTTP插件的请求模板未正确渲染，导致必填参数（如prompt）为空；3. 残留的定时任务配置未被完全清除。

## 排查步骤
1. 登录FastGPT管理后台，进入定时任务管理页面，确认所有自定义定时任务已被彻底取消。
2. 检查所有使用HTTP插件的应用配置，确认请求参数中的必填字段（如prompt）存在有效内容，无空值情况。
3. 查看系统日志中的完整报错信息，定位触发异常API调用的具体模块与请求来源。
4. 核对FastGPT当前版本的定时任务相关文档，确认是否存在未关闭的系统默认定时任务。

## 解决与验证
1. 清除所有残留的定时任务配置，包括系统默认的非必要定时任务（需按实际环境确认）。
2. 修复HTTP插件的请求参数，确保`prompt`等必填字段包含有效内容，避免空值请求。
3. 等待一个整点周期，观察系统日志是否仍出现异常API调用与报错信息。
4. 确认API调用的token消耗恢复正常，无400状态码的请求错误。

> 来源：[FastGPT GitHub issue](https://github.com/labring/FastGPT/issues/1772)
