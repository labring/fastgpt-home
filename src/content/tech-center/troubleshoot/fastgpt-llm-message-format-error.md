---
title: 解决FastGPT调用0-1等LLM接口时的消息格式报错问题
slug: /zh/troubleshoot/fastgpt-llm-message-format-error
page_type: 排错/错误码
source: https://github.com/labring/FastGPT/issues/1350
source_type: GitHub issue
---

# 解决FastGPT调用0-1等LLM接口时的消息格式报错问题

## 现象
使用FastGPT通过cow项目调用0-1 LLM的API接口时，问答流程会触发报错，网页版直接调用该接口可正常运行。另有反馈显示yi-200k、yi-8k模型调用时也存在异常。报错信息核心提示为`The first message should be user or system`，完整错误日志示例如下：
```
[ERROR] 2024-05-02 01:10:34 response error: The first message should be user or system (request id: 2024050209103352531655615917164) (request id: 2024050209103343983063481479080) (request id: 2024050209103339028163104224767): {"stack":"Error: 400 The first message should be user or system (request id: 2024050209103352531655615917164) (request id: 2024050209103343983063481479080) (request id: 2024050209103339028163104224767)\n    at eL.generate (/app/projects/app/.next/server/chunks/5092.js:23:67640)\n    at tx.makeStatusError (/app/projects/app/.next/server/chunks/5092.js:23:79051)\n    at tx.makeRequest (/app/projects/app/.next/server/chunks/5092.js:23:79785)\n    at process.processTicksAndRejections (node:internal/process/task_queues:95:5)\n    at async Object.k [as chatNode] (/app/projects/app/.next/server/chunks/7050.js:90:1025)\n    at async M (/app/projects/app/.next/server/chunks/7050.js:90:5284)\n    at async Promise.all (index 0)\n    at async Promise.all (index 1)\n    at async Promise.all (index 0)\n    at async b (/app/projects/app/.next/server/chunks/7050.js:90:6369)\n    at async /app/projects/app/.next/server/chunks/1282.js:1:3122"}
```

## 可能原因
报错提示第一条消息需为`user`或`system`角色，结合反馈信息，大概率是FastGPT向目标LLM接口发送的消息列表格式与目标模型的校验规则不匹配。部分模型对消息列表的首条角色有严格要求，FastGPT默认的消息传递逻辑未适配该类模型的规则。cow项目使用FastGPT标准配置API接口，可能在消息封装环节存在未匹配的细节。

## 排查步骤
1.  确认当前FastGPT版本已升级至最新版，该操作已在issue中被确认，可优先核对自身环境版本。
2.  测试调用其他通用LLM接口，确认非FastGPT整体服务异常，issue中反馈多个其他模型可正常调用。
3.  查看调用目标模型时的消息列表参数，检查首条消息的角色字段是否为`user`或`system`。
4.  核对cow项目的API封装逻辑，确认其传递的消息格式符合目标模型的要求。
5.  记录完整的报错request id与日志信息，用于后续定位。

## 解决与验证
1.  调整FastGPT中对应模型的消息传递逻辑，确保首条消息的角色为`user`或`system`。
2.  若使用cow项目调用，修改其API封装代码，统一消息列表的首条角色格式。
3.  重新发起问答请求，验证报错是否消失。
4.  测试yi-200k、yi-8k模型的调用流程，确认消息格式适配后异常是否解决。

> 来源：[FastGPT GitHub issue](https://github.com/labring/FastGPT/issues/1350)
