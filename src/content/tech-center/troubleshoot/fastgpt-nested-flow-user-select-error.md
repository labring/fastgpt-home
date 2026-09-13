---
title: 解决FastGPT嵌套流程中用户选择节点运行异常问题
slug: /zh/troubleshoot/fastgpt-nested-flow-user-select-error
page_type: 排错/错误码
source: https://github.com/labring/FastGPT/issues/3879
source_type: GitHub issue
---

# 解决FastGPT嵌套流程中用户选择节点运行异常问题

## 现象
FastGPT 4.8.22版本中，当A流程调用B流程时，流程运行至B流程的用户选择节点后，无论用户进行何种选择，流程都会直接结束。另有用户反馈，在最新版4.9.3中该问题仍未解决，部分场景下首次对话不生效，再次发起相同提问后异常才会消失。

## 可能原因
当前公开线程未提供明确的底层异常根源，具体触发原因需结合实际部署环境、日志信息进一步确认。

## 排查步骤
1. 核对当前部署的FastGPT版本，确认是否为v4.9.5-alpha之前的版本。
2. 梳理嵌套流程的调用链路，确认A流程调用B流程的配置符合标准规范。
3. 复现异常场景，完整记录流程运行过程中的日志信息。

## 解决与验证
升级至v4.9.5-alpha版本可解决该异常问题。验证方式为：完成版本升级并重新部署后，运行嵌套流程，触发B流程的用户选择节点，确认用户选择操作可正常推进流程，不会直接结束。针对首次对话不生效的异常场景，升级后也可同步验证修复效果。

> 来源: [FastGPT GitHub issue #3879](https://github.com/labring/FastGPT/issues/3879)
