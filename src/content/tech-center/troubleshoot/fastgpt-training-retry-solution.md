---
title: 解决FastGPT训练文档异常的重试配置与一键重试方案
slug: /zh/troubleshoot/fastgpt-training-retry-solution
page_type: 排错/错误码
source: https://github.com/labring/FastGPT/issues/4551
source_type: GitHub issue
---

# 解决FastGPT训练文档异常的重试配置与一键重试方案

## 现象
更新至FastGPT V4.9.4版本后，训练文档环节出现大量训练异常。用户反馈单个重试操作需手动点击，批量处理效率较低。

## 可能原因
训练异常多由调用渠道不稳定引发，手动单次重试操作效率较低，且默认重试配置灵活性不足。

## 排查步骤
1. 确认训练环节出现异常报错，记录异常触发场景与报错提示。
2. 检查当前FastGPT版本是否为V4.9.4及以上。
3. 评估调用渠道的稳定性，确认是否存在波动情况。

## 解决与验证
系统自带5次自动重试机制，可满足基础异常恢复需求。若需调整重试次数，建议将参数设置为3次以适配多数不稳定场景，具体参数名与配置路径需按实际环境确认。新增的一键重试功能可批量处理训练异常任务，无需逐个手动点击。验证时，触发训练异常任务后，使用一键重试功能批量发起重试，或调整重试次数参数后观察异常恢复情况。

> 来源: [FastGPT GitHub issue #4551](https://github.com/labring/FastGPT/issues/4551)
