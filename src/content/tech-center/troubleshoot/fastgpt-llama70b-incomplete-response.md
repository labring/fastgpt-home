---
title: 解决FastGPT私有部署调用Llama3 70B返回值不完整的问题
slug: /zh/troubleshoot/fastgpt-llama70b-incomplete-response
page_type: 排错/错误码
source: https://github.com/labring/FastGPT/issues/1374
source_type: GitHub issue
---

# 解决FastGPT私有部署调用Llama3 70B返回值不完整的问题

## 现象
用户使用docker私有部署的FastGPT v4.7.1-alpha2版本，调用Llama3 70B模型时出现返回值不完整的报错。其他基础功能如获取时间可正常运行，说明模型连通性正常。更换为ChatGPT 3.5接口可正常返回完整结果，本地直接使用相同提示词调用Llama3 70B模型可得到完整返回内容。用户已在模型配置中设置`"toolChoice": false, "functionCall": false`。

## 可能原因
结合问题表现，可能与FastGPT对Llama3 70B的返回内容解析逻辑不兼容，或返回内容触发了FastGPT的异常处理规则有关。

## 排查步骤
1. 确认当前FastGPT为docker私有部署的v4.7.1-alpha2版本。
2. 验证其他模型（如ChatGPT 3.5）的调用是否正常，确认FastGPT基础调用流程与模型连通性无异常。
3. 在本地直接使用相同提示词调用目标Llama3 70B模型，确认可以返回完整结果，排除模型本身的问题。
4. 检查模型配置中的`toolChoice`与`functionCall`参数是否设置为`false`，确认工具调用相关配置已关闭。
5. 查看FastGPT的运行日志，定位返回值不完整的具体报错信息。

## 解决与验证
完成上述排查步骤后，可根据具体定位的问题进行调整。若为FastGPT与模型返回格式的兼容性问题，可尝试确认FastGPT对Llama3 70B的响应处理逻辑是否适配。验证时，重新调用Llama3 70B模型，确认返回值完整且无报错，同时对比本地调用的结果一致性。

> 来源：[FastGPT GitHub issue](https://github.com/labring/FastGPT/issues/1374)
