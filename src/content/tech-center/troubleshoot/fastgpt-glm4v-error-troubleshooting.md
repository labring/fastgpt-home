---
title: 解决FastGPT私有部署调用glm-4v模型时报错的问题
slug: /zh/troubleshoot/fastgpt-glm4v-error-troubleshooting
page_type: 排错/错误码
source: https://github.com/labring/FastGPT/issues/2673
source_type: GitHub issue
---

# 解决FastGPT私有部署调用glm-4v模型时报错的问题

## 现象
在确认API密钥正常的前提下，FastGPT私有部署4.8.10版本中，调用glm-4模型可正常完成任务，调用glm-4v（支持图片识别的大模型）时出现报错；同系列的glm-4-plus模型可正常使用。

## 可能原因
该问题可能与模型接口的参数传递格式适配有关，部分相关场景的反馈指出该类报错关联模型接口对特殊参数的处理逻辑，需结合具体报错日志进一步确认。

## 排查步骤
1. 确认当前FastGPT为4.8.10私有部署版本，核对正在使用的模型名称是否为glm-4v。
2. 验证同系列的其他模型（如glm-4、glm-4-plus）是否可正常调用，确认仅glm-4v出现报错。
3. 查看FastGPT后台的报错日志，记录具体的异常提示内容。
4. 核对模型接口的参数配置，确认是否包含图片识别所需的额外参数格式。

## 解决与验证
若排查后确认接口参数配置无误，可尝试调整模型调用的请求体格式，匹配glm-4v所需的图片输入参数规范。调整完成后，重新发起glm-4v模型调用，验证任务是否可正常完成且无报错出现。

> 来源：[FastGPT GitHub issue](https://github.com/labring/FastGPT/issues/2673)
