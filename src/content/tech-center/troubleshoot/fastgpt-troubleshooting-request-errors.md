---
title: 解决FastGPT部署运行中的请求超时、404与性能警告问题
slug: /zh/troubleshoot/fastgpt-troubleshooting-request-errors
page_type: 排错/错误码
source: https://github.com/labring/FastGPT/issues/4318
source_type: GitHub issue
---

# 解决FastGPT部署运行中的请求超时、404与性能警告问题

## 现象
从运行日志中可观察到以下内容：
1. 多个接口请求耗时过长，如`/api/common/system/getInitData`耗时达9874ms、10132ms，`/api/support/user/account/tokenLogin`耗时达10132ms；
2. 出现2个404请求：`GET /icons/icon_zh_48.png 404 in 24ms`、`GET /serviceWorker.js 404 in 15ms`；
3. 控制台弹出React警告：`Warning: forwardRef render functions accept exactly two parameters: props and ref. Did you forget to use the ref parameter?`；
4. 页面性能警告：`Warning: data for page "/account/model" is 170 kB which exceeds the threshold of 128 kB, this amount of data can reduce performance.`；
5. 接口停滞警告：`API resolved without sending a response for /api/aiproxy/api/channels/all?page=1&perPage=10, this may result in stalled requests.`；
6. 部分接口返回304状态码，整体请求链路出现阻塞。

## 可能原因
结合日志信息，可能的诱因包括：
1. 静态资源文件`/icons/icon_zh_48.png`、`/serviceWorker.js`未正确部署，导致返回404；
2. `/account/model`页面传输的数据量达到170kB，超过默认阈值128kB，影响页面性能；
3. 部分React组件使用`forwardRef`时未正确传递ref参数，触发语法警告；
4. `/api/aiproxy/api/channels/all`接口未编写响应返回逻辑，导致请求无法正常结束；
5. 接口存在重复发起的情况，或后端逻辑阻塞，导致请求耗时过长；
6. 重复调用`/api/common/system/getInitData`等接口，增加了服务负载。

## 排查步骤
1. 检查项目静态资源目录，确认`icons/icon_zh_48.png`和`serviceWorker.js`是否存在，确认部署流程是否正确上传静态资源；
2. 查看`/account/model`页面的代码逻辑，统计页面传输的数据总量，确认是否超过128kB阈值；
3. 定位触发`forwardRef`警告的组件代码，检查`forwardRef`函数是否正确接收`props`和`ref`两个参数；
4. 排查`/api/aiproxy/api/channels/all`接口的后端实现，确认是否存在未返回响应的代码分支；
5. 检查前端请求逻辑，确认是否存在重复调用接口的场景，比如组件重复挂载、状态重复触发；
6. 查看详细的接口日志，定位`/api/common/system/getInitData`、`/api/support/user/account/tokenLogin`等耗时过长接口的阻塞点。

## 解决与验证
1. 补充缺失的静态资源文件，重新执行部署流程，验证`/icons/icon_zh_48.png`和`/serviceWorker.js`的404请求是否消失；
2. 优化`/account/model`页面的数据传输逻辑，比如拆分数据、采用分页加载，将页面数据量降至128kB以下，验证性能警告是否消除；
3. 修复触发警告的`forwardRef`组件代码，确保函数正确接收`props`和`ref`参数，验证控制台警告是否消失；
4. 补全`/api/aiproxy/api/channels/all`接口的响应返回代码，确保请求可以正常结束，验证停滞警告是否消失；
5. 调整前端重复请求的逻辑，移除不必要的重复调用，降低服务负载，验证接口耗时恢复正常；
6. 重启服务后，再次发起相关请求，确认所有接口的状态码、耗时均符合预期，问题得到解决。

> 来源：[FastGPT GitHub issue](https://github.com/labring/FastGPT/issues/4318)
