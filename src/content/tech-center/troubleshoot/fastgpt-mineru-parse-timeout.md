---
title: 解决FastGPT接入MinerU后知识库文档解析超时问题
slug: /zh/troubleshoot/fastgpt-mineru-parse-timeout
page_type: 排错/错误码
source: https://github.com/labring/FastGPT/issues/4195
source_type: GitHub issue
---

# 解决FastGPT接入MinerU后知识库文档解析超时问题

## 现象
接入MinerU实现知识库多格式文档解析时出现超时，前端提示错误。服务端日志显示解析耗时超过70秒。解析后的图片已存入MongoDB，images与dataset_data_texts表存在对应内容。涉及的文档格式包括pdf、pptx等。

## 可能原因
本地部署环境性能不足，导致文档解析耗时过长，超出系统等待阈值，触发超时错误。未针对解析超时增加判断与回滚操作，可能影响数据一致性。

## 排查步骤
1.  查看服务端日志，确认文档解析的实际耗时。
2.  检查MongoDB中的images与dataset_data_texts表，确认解析后的图片及文本数据是否已生成。
3.  评估当前部署环境的硬件性能，确认是否为性能不足导致超时。
4.  确认是否存在可配置的超时相关参数，需按实际环境确认。

## 解决与验证
调整等待延迟时间或配置相关超时参数，需按实际环境确认。增加解析超时判断与回滚操作，保障数据一致性。重新提交pdf、pptx等文档解析任务，确认前端无超时错误提示，服务端日志耗时符合预期，且解析后的图片与文本数据正常生成。

> 来源: [FastGPT GitHub issue #4195](https://github.com/labring/FastGPT/issues/4195)
