---
title: 清除FastGPT对话CURD操作的上下文数据的实现方法
slug: /zh/troubleshoot/fastgpt-clear-curd-context
page_type: 排错/错误码
source: https://github.com/labring/FastGPT/issues/2602
source_type: GitHub issue
---

# 清除FastGPT对话CURD操作的上下文数据的实现方法

## 现象
在FastGPT的对话CURD操作中，需由大语言模型引导用户逐步填写4个参数，用户可单次或分多次输入参数，待获取全部必要参数后发起HTTP调用。需根据HTTP插件的响应结果，清除本次CURD操作的上下文数据，避免参数被后续CURD操作误用。

## 可能原因
FastGPT默认的上下文管理机制未提供按单次CURD操作精准清理上下文的功能。直接删除全部对话数据会导致历史对话记录丢失，无法满足查看历史对话的需求。

## 排查步骤
1. 确定需要清理上下文的对话对应的chatId。
2. 连接FastGPT关联的MongoDB数据库。
3. 定位到chatitems数据集合。
4. 筛选出与目标chatId匹配的相关数据条目。
5. 需按实际环境确认清理操作的具体执行细节。

## 解决与验证
存在两种可行的实现方式。第一种是为对话记录添加标记，配置该记录是否计入AI历史上下文。第二种是通过MongoDB数据库操作，根据目标chatId删除chatitems集合中对应的对话数据。执行清理操作后，发起新的CURD操作，确认之前的参数未被带入新对话，即可验证清理效果。

> 来源: [FastGPT GitHub issue #2602](https://github.com/labring/FastGPT/issues/2602)
