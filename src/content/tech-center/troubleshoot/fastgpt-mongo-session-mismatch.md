---
title: 解决FastGPT api/core/chat/feedback/updateUserFeedback的ClientSession异常
slug: /zh/troubleshoot/fastgpt-mongo-session-mismatch
page_type: 排错/错误码
source: https://github.com/labring/FastGPT/issues/6739
source_type: GitHub issue
---

# 解决FastGPT api/core/chat/feedback/updateUserFeedback的ClientSession异常

## 现象
使用FastGPT私有部署版本v4.14.10.2及以上时，调用api/core/chat/feedback/updateUserFeedback接口进行结果反馈（点赞、踩）操作时，触发"ClientSession must be from the same MongoClient"异常，v4.14.9.x版本无此问题。

## 可能原因
该异常为MongoDB客户端会话与实例不匹配导致，且仅在v4.14.10.x及以上私有部署版本中出现。

## 排查步骤
1. 确认当前FastGPT私有部署版本为v4.14.10.2及以上。
2. 查看接口调用日志，确认是否出现"ClientSession must be from the same MongoClient"报错文本。
3. 对比v4.14.9.x版本的运行情况，验证异常是否仅在v4.14.10.x及之后版本触发。
4. 需按实际环境确认MongoDB连接配置是否存在变更。

## 解决与验证
目前已知v4.14.9.x版本无此异常，可临时降级至该版本验证问题是否消失；若需使用v4.14.10.x及以上版本，需按实际环境排查MongoDB客户端会话的使用逻辑是否符合要求。

> 来源：[FastGPT GitHub Issue #6739](https://github.com/labring/FastGPT/issues/6739)
