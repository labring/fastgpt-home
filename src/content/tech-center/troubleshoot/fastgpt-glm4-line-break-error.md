---
title: 解决FastGPT调用GLM4模型返回内容换行格式异常问题
slug: /zh/troubleshoot/fastgpt-glm4-line-break-error
page_type: 排错/错误码
source: https://github.com/labring/FastGPT/issues/835
source_type: GitHub issue
---

# 解决FastGPT调用GLM4模型返回内容换行格式异常问题

## 现象
调用GLM4模型通过共享API返回内容至微信时，无法自动换行，输出显示为`/n/n`格式，无法被正常识别。更换为CHATGLM3模型后，换行显示恢复正常。

## 可能原因
换行符的标准格式应为`\n`，若返回内容显示为`/n/n`，说明换行符格式不符合预期。GLM4模型与CHATGLM3模型的输出格式存在差异，导致GLM4返回的换行符无法被正确识别。

## 排查步骤
1. 确认当前调用的模型为GLM4，观察返回至微信的内容显示格式。
2. 将调用的模型更换为CHATGLM3，查看返回内容的换行显示是否恢复正常。
3. 提取返回内容中的换行相关字符，确认显示的换行符形式。
4. 需按实际环境确认API调用链路中是否存在格式处理相关的配置。

## 解决与验证
若确认换行异常由GLM4模型的输出格式导致，可对返回内容进行格式转换，将`/n/n`替换为标准换行符`\n`后再推送至微信。验证方式为：将返回内容处理后推送至微信，确认换行显示正常；或使用CHATGLM3模型调用，确认换行显示正常。

> 来源: [FastGPT GitHub issue #835](https://github.com/labring/FastGPT/issues/835)
