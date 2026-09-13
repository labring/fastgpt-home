---
title: 解决FastGPT使用vllm时工具调用参数解析错误问题
slug: /zh/troubleshoot/fastgpt-vllm-tool-call-parse-error
page_type: 排错/错误码
source: https://github.com/labring/FastGPT/issues/5497
source_type: GitHub issue
---

# 解决FastGPT使用vllm时工具调用参数解析错误问题

## 现象
当使用FastGPT调用相关服务时，生成的tool_calls结构中，function.arguments字段的值为空字符串""，将该内容传递给vllm时会触发解析错误。若将该字段设置为标准格式的"{}"，则解析流程可正常完成。

## 可能原因
该错误的直接原因为vllm的流式工具调用解析逻辑存在异常，无法正确识别空字符串格式的参数内容。

## 排查步骤
1.  提取调用过程中生成的tool_calls字段，查看function.arguments的具体内容。
2.  对比该字段为""与"{}"时的运行结果，确认错误触发的格式条件。
3.  核查vllm流式工具调用解析相关的配置项，需按实际环境确认参数是否正确。

## 解决与验证
将tool_calls中function.arguments的空字符串""替换为标准格式"{}"，可快速临时解决当前解析错误。如需从根源修复该问题，需前往vllm项目仓库查找对应的官方修复方案。验证流程为：重新发起目标调用，检查生成的tool_calls中function.arguments字段格式，确认解析错误不再出现，服务运行正常。

> 来源: [FastGPT GitHub issue #5497](https://github.com/labring/FastGPT/issues/5497)
