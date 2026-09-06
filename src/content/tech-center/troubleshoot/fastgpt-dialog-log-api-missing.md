---
title: 排查并解决FastGPT对话日志无API接口调用日志的问题
slug: /zh/troubleshoot/fastgpt-dialog-log-api-missing
page_type: 排错/错误码
source: https://github.com/labring/FastGPT/issues/3563
source_type: GitHub issue
---

# 排查并解决FastGPT对话日志无API接口调用日志的问题

## 现象
FastGPT 4.8.16、4.8.17版本中，对话日志页面未显示API接口调用日志，提交issue时附带两张未展示相关日志的截图。

## 可能原因
仅当API请求携带chatid参数时，才会生成对应的接口调用日志。未生成日志的可能原因为API请求未携带chatid参数，其他未提及的原因需按实际环境确认。

## 排查步骤
1. 确认当前使用的FastGPT版本为4.8.16或4.8.17。
2. 检查发起的API请求参数，确认是否包含chatid字段。
3. 进入对话日志页面，核对是否存在携带chatid的API调用记录。
4. 若日志未正常展示，需按实际环境确认日志筛选条件是否正确。

## 解决与验证
确保API请求携带chatid参数，即可生成对应的API接口调用日志。发起携带chatid的API请求后，查看对话日志页面，确认是否生成对应的调用记录，完成验证。

> 来源: [FastGPT GitHub issue #3563](https://github.com/labring/FastGPT/issues/3563)
