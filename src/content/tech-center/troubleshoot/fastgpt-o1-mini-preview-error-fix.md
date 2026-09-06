---
title: 解决FastGPT私有部署版调用o1-mini与o1-preview模型的报错问题
slug: /zh/troubleshoot/fastgpt-o1-mini-preview-error-fix
page_type: 排错/错误码
source: https://github.com/labring/FastGPT/issues/3105
source_type: GitHub issue
---

# 解决FastGPT私有部署版调用o1-mini与o1-preview模型的报错问题

## 现象
用户在私有部署的FastGPT V4.8.11版本中调用OpenAI的o1-mini、o1-preview模型时，触发调用报错。报错完整提示为：`unsupported_value Unsupported value: 'messages[0].role' does not support 'system' with this model. (request id: 202411090747202598506059931226)`。该类模型不支持消息列表中包含system角色的配置。

## 可能原因
该报错的核心原因是，FastGPT向o1-mini、o1-preview模型发起请求时，携带了该模型不支持的system角色消息。该类模型的消息格式要求中，不允许出现role属性为system的条目。

## 排查步骤
1.  确认当前使用的FastGPT版本为V4.8.11，且调用的模型为o1-mini或o1-preview。
2.  检查对话请求的消息列表，确认是否包含role属性为system的条目。
3.  核对该类模型的官方要求，确认其不支持system角色的消息配置。
4.  需按实际环境确认FastGPT的默认消息模板是否自动添加了system角色内容。

## 解决与验证
解决方法：调整FastGPT的对话消息构造逻辑，移除所有针对o1-mini、o1-preview模型的system角色消息。仅使用user、assistant角色构造对话消息列表，匹配该类模型的格式要求。
验证步骤：
1.  重新发起针对o1-mini或o1-preview模型的对话请求。
2.  确认请求不再返回指定的报错信息，且能正常获取模型的回复内容。
3.  需按实际场景验证对话流程的完整性与准确性。

> 来源：[FastGPT GitHub issue](https://github.com/labring/FastGPT/issues/3105)
