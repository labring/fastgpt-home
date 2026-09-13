---
title: 解决FastGPT工作流中问题优化节点导致的输出异常问题
slug: /zh/troubleshoot/fastgpt-workflow-optimize-node-troubleshooting
page_type: 排错/错误码
source: https://github.com/labring/FastGPT/issues/3842
source_type: GitHub issue
---

# 解决FastGPT工作流中问题优化节点导致的输出异常问题

## 现象
用户在FastGPT工作流中添加问题优化节点以实现多轮对话功能，使用该节点后，经常无法获取大模型生成的答案，因此希望找到仅拼接上下文的工具，将上下文直接提交给大模型进行解析。

## 可能原因
问题优化节点存在默认提示词与使用限制，且返回结果为数组格式，该格式可能与后续大模型节点的输入要求不匹配，进而导致大模型无法正常生成答案。

## 排查步骤
1.  查看当前工作流配置，确认是否添加了问题优化节点
2.  导出工作流运行日志，检查问题优化节点的返回结果格式
3.  对比未使用问题优化节点时的工作流运行结果，确认异常是否由该节点引发

## 解决与验证
不宜使用问题优化节点，改用AI会话节点实现问题查询重写，即可实现多轮对话功能。验证方式为：部署修改后的工作流，发起多轮对话测试，确认大模型可正常生成符合预期的答案。

> 来源: [FastGPT GitHub issue #3842](https://github.com/labring/FastGPT/issues/3842)
