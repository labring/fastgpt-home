---
title: 解决FastGPT调用Xinference重排序接口报错的排查与修复方案
slug: /zh/troubleshoot/fastgpt-xinference-rerank-error-troubleshooting
page_type: 排错/错误码
source: https://github.com/labring/FastGPT/issues/1316
source_type: GitHub issue
---

# 解决FastGPT调用Xinference重排序接口报错的排查与修复方案

## 现象
在FastGPT中配置Xinference重排序接口后，使用bce重排序模型时出现报错，使用bge重排序模型则可正常运行。直接通过curl工具调用Xinference的rerank接口，可以正常返回结果。结合用户提供的配置截图与测试结果，可排除网络连接、接口地址配置错误等基础问题。

## 可能原因
由于直接调用Xinference rerank接口可正常返回结果，且bge重排序模型在FastGPT中可正常运行，说明Xinference服务本身与FastGPT的基础调用链路均无问题。报错仅出现在FastGPT调用bce重排序模型的场景中，大概率是FastGPT的接口调用参数配置未适配bce重排序模型的接口要求，与bge模型的参数要求存在差异。

## 排查步骤
1.  确认FastGPT中Xinference rerank接口的配置参数，对比bge和bce模型的配置差异，重点检查请求参数的格式、字段名称、参数值类型等内容。
2.  复制FastGPT中配置的Xinference rerank接口地址，结合FastGPT的调用逻辑，使用curl工具构造与FastGPT发起的请求一致的参数，发起调用验证是否可以复现报错。
3.  对比直接调用Xinference接口的请求参数与FastGPT发起的请求参数，逐一核对字段名称、参数格式等细节，找出导致报错的差异点。

## 解决与验证
根据排查出的参数差异，调整FastGPT中Xinference rerank接口的配置参数，使其匹配bce重排序模型的接口要求。保存配置后，在FastGPT中发起重排序调用，验证报错是否消失。再次使用curl工具调用调整后的接口，确认返回结果正常，且与直接调用的结果一致，确保功能恢复正常。

> 来源：[FastGPT GitHub issue](https://github.com/labring/FastGPT/issues/1316)
