---
title: 解决FastGPT调用时输入长度超出[1,2048]的报错问题
slug: /zh/troubleshoot/fastgpt-input-length-error
page_type: 排错/错误码
source: https://github.com/labring/FastGPT/issues/1912
source_type: GitHub issue
---

# 解决FastGPT调用时输入长度超出[1,2048]的报错问题

## 现象
调用FastGPT时返回400错误，报错文本为`Inference error: Range of input length should be [1, 2048]`，日志中会出现类似`[Error] 2024-07-02 08:30:50 400 Inference error: Range of input length should be [1, 2048]`的记录，同时伴随`Embedding Error`相关报错，附带具体请求ID，如`2024070208305054674516722308854`，部分场景下会输出完整的错误堆栈信息。

## 可能原因
报错明确指出输入长度需在[1, 2048]范围内，因此核心触发原因为输入文本不符合该长度要求。可能的场景包括：输入文本为空（长度小于1），或者输入文本的token数量超过2048；也可能是FastGPT与所调用模型的输入长度配置不匹配，未正确适配模型的限制。

## 排查步骤
1.  检查当前调用的输入文本内容，确认是否为空，或是否存在超长的文本片段。
2.  查阅所使用模型的官方文档，确认该模型允许的输入长度范围是否为[1, 2048]。
3.  核对FastGPT中配置的对应模型参数，确认是否设置了匹配该模型的输入长度限制。
4.  查看完整的日志信息，通过报错附带的请求ID定位具体的调用场景，辅助排查。

## 解决与验证
### 解决方法
1.  若输入文本为空，补充有效内容，确保输入长度≥1。
2.  若输入文本过长，对文本进行截断或分段处理，确保单段输入的token数不超过2048。
3.  调整FastGPT的模型配置，将输入长度限制设置为与所调用模型匹配的范围，需按实际环境确认具体配置路径。
### 验证方式
修改配置或调整输入后，重新发起调用，确认不再出现`Inference error: Range of input length should be [1, 2048]`的报错，且请求成功返回预期结果。

> 来源：[FastGPT GitHub issue](https://github.com/labring/FastGPT/issues/1912)
