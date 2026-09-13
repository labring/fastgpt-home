---
title: 解决FastGPT中Moonshot模型引用参数超限的报错问题
slug: /zh/troubleshoot/fastgpt-moonshot-ref-param-error
page_type: 排错/错误码
source: https://github.com/labring/FastGPT/issues/1667
source_type: GitHub issue
---

# 解决FastGPT中Moonshot模型引用参数超限的报错问题

## 现象
使用FastGPT 4.7版本，通过OneAPI连接Moonshot模型时，将知识库引用参数设置超过2000会直接报错。设置参数为2000以下时，部分场景可正常运行，部分场景仍会出错。当提示词要求调用更多知识库内容（如总结10条）时，会触发response相关报错。

## 可能原因
一是OneAPI的流式（stream）模式无法捕获调用错误，导致异常无法被及时识别；二是FastGPT的知识库引用参数存在校验限制，超过2000时直接触发报错；三是提示词触发的知识库调用量超出当前配置的参数阈值，引发报错。

## 排查步骤
1. 确认FastGPT版本为4.7，确认模型连接方式为OneAPI连接Moonshot模型。
2. 若使用OneAPI连接，将调用模式切换为非stream模式，重新进行调试。
3. 调整知识库引用参数，分别测试2000以下和2000以上的场景，记录报错情况。
4. 对比不同复杂度的提示词（如总结3条与总结10条），验证调用量对报错的影响。

## 解决与验证
使用非stream模式进行调试，可捕获更多调用错误。将知识库引用参数调整至2000以下，可规避直接报错的问题。当出现response报错时，可通过debug模式排查具体错误原因。结合模型实际支持的token上限，适配FastGPT的参数配置，可提升知识库调用的稳定性。

> 来源: [FastGPT GitHub issue #1667](https://github.com/labring/FastGPT/issues/1667)
