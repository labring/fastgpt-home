---
title: 解决FastGPT部署运行中出现sse error bad_response_status_code 500报错问题
slug: /zh/troubleshoot/fastgpt-sse-bad-status-code
page_type: 排错/错误码
source: https://github.com/labring/FastGPT/issues/1063
source_type: GitHub issue
---

# 解决FastGPT部署运行中出现sse error bad_response_status_code 500报错问题

## 现象
在FastGPT运行过程中，控制台会输出如下格式的错误日志：
```
[ERROR] 2024-03-26 00:37:22 sse error: bad_response_status_code  (request id: 2024032600371937190689128646579)
{
  message: '500  (request id: 2024032600371937190689128646579)',
  stack: 'Error: 500  (request id: 2024032600371937190689128646579)\n' +
    '    at eL.generate (/app/projects/app/.next/server/chunks/53204.js:21:70210)\n' +
    '    at ax.makeStatusError (/app/projects/app/.next/server/chunks/53204.js:21:81454)\n' +
    '    at ax.makeRequest (/app/projects/app/.next/server/chunks/53204.js:21:82188)\n' +
    '    at process.processTicksAndRejections (node:internal/process/task_queues:95:5)\n' +
    '    at async u (/app/projects/app/.next/server/chunks/31119.js:85:200)\n' +
    '    at async /app/projects/app/.next/server/chunks/31119.js:87:255\n' +
    '    at async i (/app/projects/app/.next/server/chunks/31119.js:87:216)\n' +
    '    at async Object.d [as datasetSearchNode] (/app/projects/app/.next/server/chunks/1492.js:85:3561)\n' +
    '    at async I (/app/projects/app/.next/server/chunks/1492.js:85:7125)\n' +
    '    at async Promise.all (index 0)\n' +
    '    at async Promise.all (index 0)\n' +
    '    at async O (/app/projects/app/.next/server/chunks/1492.js:85:8195)\n' +
    '    at async l (/app/projects/app/.next/server/pages/api/core/chat/chatTest.js:1:2751)'
}
```
该错误伴随500内部服务错误，错误栈显示调用链路涉及generate、makeRequest、datasetSearchNode等函数，最终指向/api/core/chat/chatTest.js接口，且存在并行任务（Promise.all）执行环节。
## 可能原因
基于报错日志和调用栈信息，可梳理出以下潜在原因：
1.  SSE请求的上游接口返回了500内部错误，导致请求异常终止；
2.  调用链路中的generate、datasetSearchNode等函数执行时出现未捕获的异常；
3.  并行任务处理（Promise.all）过程中，某一个子任务失败未被正确捕获，引发整体报错；
4.  接口依赖的模块或文件加载异常，导致代码执行中断。
## 排查步骤
1.  提取报错中的request id：2024032600371937190689128646579，定位到对应的/api/core/chat/chatTest.js接口调用场景。
2.  查看该接口的入参配置，确认是否存在参数缺失、格式错误或权限异常。
3.  检查调用栈中涉及的eL.generate、datasetSearchNode等函数的执行环境，确认依赖模块是否正常加载。
4.  模拟触发该接口的请求，复现500错误，观察实时日志输出的详细错误信息。
5.  检查并行任务（Promise.all）的处理逻辑，确认是否添加了异常捕获机制，是否存在任务超时情况。
## 解决与验证
根据排查结果定位具体问题后，执行对应修复操作：
1.  若上游接口返回500错误，需修复上游接口的业务逻辑或异常处理流程；
2.  若函数执行异常，需修正对应代码的错误处理逻辑，补充异常捕获；
3.  若并行任务未添加异常捕获，需为每个子任务添加try-catch逻辑，避免整体任务失败。
修复完成后，重新触发原请求，确认sse error: bad_response_status_code和500错误不再出现，对应request id的请求成功完成。

> 来源：[FastGPT GitHub issue](https://github.com/labring/FastGPT/issues/1063)
