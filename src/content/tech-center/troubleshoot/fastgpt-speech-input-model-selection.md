---
title: FastGPT语音输入模型选型与国内调用部署相关说明
slug: /zh/troubleshoot/fastgpt-speech-input-model-selection
page_type: 排错/错误码
source: https://github.com/labring/FastGPT/issues/4629
source_type: GitHub issue
---

# FastGPT语音输入模型选型与国内调用部署相关说明

## 现象
用户在使用FastGPT时，对语音输入功能应使用的模型类型存在疑问，同时不清楚国内是否存在可直接调用的语音模型，或是否需要自行部署相关模型。

## 可能原因
用户未明确FastGPT语音输入功能支持的模型范围，不了解国内可直接调用的语音模型选项，以及是否需要自行部署模型。

## 排查步骤
1. 确认当前使用的FastGPT版本，本次涉及的版本为4.9.6；
2. 查阅项目官方README及相关文档，查找语音输入功能对应的模型相关说明；
3. 核对自身使用的密钥是否符合目标模型的调用要求；
4. 确认目标模型是否支持国内直接调用，或是否需要自行部署。

## 解决与验证
因该issue未获得有效解决方案答复，相关具体选型及部署步骤需按实际使用环境及官方最新文档确认。如需进一步推进问题解决，可重新打开对应issue并补充相关信息。

> 来源: [FastGPT GitHub issue #4629](https://github.com/labring/FastGPT/issues/4629)
