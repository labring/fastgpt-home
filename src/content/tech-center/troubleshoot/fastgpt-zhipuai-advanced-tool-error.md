---
title: 解决FastGPT使用智谱AI时高级编排工具调用报错问题
slug: /zh/troubleshoot/fastgpt-zhipuai-advanced-tool-error
page_type: 排错/错误码
source: https://github.com/labring/FastGPT/issues/1449
source_type: GitHub issue
---

# 解决FastGPT使用智谱AI时高级编排工具调用报错问题

## 现象
在FastGPT私有部署版本v4.8-alpha2的高级编排实验室预约流程中，使用FastAI、月之暗面等LLM可正确判断调用工具和接口，但使用智谱AI时触发报错，报错文本为Cannot read properties of undefined (reading 'value')。复现该问题的操作是：选择实验室预约工具节点，将模型选择为智谱AI后进行测试。

## 可能原因
该报错为未定义属性读取错误，结合场景推测与智谱AI的接口返回格式或FastGPT对其返回内容的处理逻辑不匹配有关，具体原因需结合代码与请求链路进一步排查。

## 排查步骤
1. 确认当前FastGPT版本为v4.8-alpha2私有部署版本，检查智谱AI的API Key是否配置正确且可正常使用。
2. 对比可正常运行的其他LLM与智谱AI的请求参数、返回格式差异。
3. 检查高级编排实验室预约流程的工具节点配置，确认参数与智谱AI的适配性。
4. 捕获智谱AI调用的完整请求与返回日志，定位未定义属性的触发位置。

## 解决与验证
目前暂无通用修复方案，需根据排查结果针对性处理。若为返回格式不匹配，需调整FastGPT对智谱AI返回内容的解析逻辑；若为参数配置错误，需修正API调用参数。验证方式为：重新配置智谱AI模型节点，执行实验室预约流程测试，确认不再触发Cannot read properties of undefined (reading 'value')报错，且可正确判断调用工具和接口。

> 来源：[FastGPT GitHub issue](https://github.com/labring/FastGPT/issues/1449)
