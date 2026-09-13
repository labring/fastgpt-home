---
title: 解决FastGPT部署Ollama时的LLM模型响应为空报错
slug: /zh/troubleshoot/fastgpt-ollama-empty-response-fix
page_type: 排错/错误码
source: https://github.com/labring/FastGPT/issues/4058
source_type: GitHub issue
---

# 解决FastGPT部署Ollama时的LLM模型响应为空报错

## 现象
私有部署FastGPT 4.9.0版本，已确认使用的密钥可正常使用。本地部署OLLAMA并完成LLM、嵌入模型的配置且通过测试后，新建对话应用时出现chat:LLM_Model_Response_Empty报错。

## 可能原因
当前版本不支持OLLAMA模型接入；程序中存在写死的V1参数，影响模型调用流程。

## 排查步骤
1. 确认FastGPT私有部署版本为4.9.0，且本地OLLAMA的LLM、嵌入模型配置已完成并通过测试。
2. 检查程序代码中是否存在写死的V1相关参数内容。
3. 需按实际环境确认其他相关配置项是否符合要求。

## 解决与验证
修改程序代码，删除其中写死的V1相关内容。完成修改后重新部署或重启FastGPT服务，新建对话应用，验证chat:LLM_Model_Response_Empty报错是否不再出现。

> 来源: [FastGPT GitHub issue #4058](https://github.com/labring/FastGPT/issues/4058)
