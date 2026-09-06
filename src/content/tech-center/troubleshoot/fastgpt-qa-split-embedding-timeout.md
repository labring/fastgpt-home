---
title: 解决FastGPT导入文档QA拆分时的嵌入请求超时问题
slug: /zh/troubleshoot/fastgpt-qa-split-embedding-timeout
page_type: 排错/错误码
source: https://github.com/labring/FastGPT/issues/598
source_type: GitHub issue
---

# 解决FastGPT导入文档QA拆分时的嵌入请求超时问题

## 现象
使用私有部署版本的FastGPT时，在导入文档并执行QA拆分操作的过程中，会出现大量嵌入相关报错。控制台输出的报错信息为：
```
fastgpt    | Embedding Error e$ [Error]: Request timed out.
fastgpt    |     at tx.makeRequest (/app/projects/app/.next/server/chunks/5092.js:23:79559)
fastgpt    |     at process.processTicksAndRejections (node:internal/process/task_queues:95:5)
fastgpt    |     at async b (/app/projects/app/.next/server/chunks/9847.js:81:4178)
fastgpt    |     at async Y (/app/projects/app/.next/server/chunks/9847.js:83:1514)
fastgpt    |     at async Promise.all (index 0)
fastgpt    |     at async R (/app/projects/app/.next/server/chunks/9847.js:82:161)
fastgpt    |     at async h (/app/projects/app/.next/server/chunks/9847.js:93:2538) {
fastgpt    |   status: undefined,
fastgpt    |   headers: undefined,
fastgpt    |   error: undefined,
fastgpt    |   code: undefined,
fastgpt    |   param: undefined,
fastgpt    |   type: undefined
fastgpt    | }
```
报错中未包含明确的错误状态码、错误类型等额外信息，仅提示请求超时。

## 可能原因
根据报错信息，问题核心为嵌入请求超时。可能的原因包括：嵌入服务的请求超时阈值设置过低，无法适配批量处理的需求；嵌入服务所在环境的网络连接不稳定；待处理文档拆分后的文本量超出嵌入服务的单次处理上限，导致请求无法按时完成。

## 排查步骤
1.  查看FastGPT控制台的完整报错日志，确认是否为同一类型的嵌入请求超时错误。
2.  检查嵌入服务的运行状态，确认服务是否正常启动且无负载过高的情况。
3.  测试单独向嵌入服务发送单条文本的嵌入请求，验证请求是否能在正常时间内完成。
4.  核对FastGPT配置中的嵌入服务超时时间参数，确认其设置是否合理。
5.  检查部署环境的网络连接，确认FastGPT服务与嵌入服务之间的网络是否存在波动或阻断。

## 解决与验证
1.  调整FastGPT配置中的嵌入服务超时时间，适当延长阈值以适配批量处理需求。
2.  如果嵌入服务负载过高，可尝试优化嵌入服务的资源配置，或减少同时发起的嵌入请求数量。
3.  若待处理文本过长，可调整文档拆分的参数，将文本拆分为更短的片段后再执行嵌入操作。
4.  修复网络连接问题，确保FastGPT与嵌入服务之间的网络稳定通畅。
完成上述操作后，重新执行文档导入与QA拆分操作，确认不再出现嵌入请求超时报错。

> 来源：[FastGPT GitHub issue](https://github.com/labring/FastGPT/issues/598)
