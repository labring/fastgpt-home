---
title: FastGPT 定时任务：Cron 实现与多计划需求边界
slug: /zh/troubleshoot/fastgpt-timed-task-config-limits
page_type: 排错/错误码
source: https://github.com/labring/FastGPT/issues/4769
source_type: GitHub issue
---

# FastGPT 定时任务：Cron 实现与多计划需求边界

## 适用场景与历史记录

原议题请求自由 crontab 配置及一个应用保存多组独立定时任务。 原始讨论提交于 2025-05-08，本页按该记录说明症状或需求的适用范围。

## 已有证据与适用范围

当前源码使用 cronString 并通过 Cron 解析器展示周期，界面提供日、周、月和小时间隔选项；应用结构保存单个定时配置。

## 排查与复测

1. 在应用定时配置中核对周期、时区和默认问题，并发布应用使配置生效。
2. 检查实际下一次执行时间与运行记录，特别核对时区。
3. 需要多组默认问题或更细粒度计划时，明确计划列表和冲突策略，按实际接口能力验证独立调度方案。

这些检查用于复现和验证同类场景。继续反馈时，提供准确版本、最小输入、预期结果和脱敏日志，并引用原始讨论。

## 参考资料


> 来源: [原始讨论：定时任务支持crontab和多组定时](https://github.com/labring/FastGPT/issues/4769)

> 来源: [FastGPT 定时选择器的 Cron 实现](https://github.com/labring/FastGPT/blob/main/packages/web/components/common/MySelect/CronSelector.tsx)

> 来源: [FastGPT 应用配置数据结构](https://github.com/labring/FastGPT/blob/main/packages/global/core/app/type.ts)

> 来源: [FastGPT 应用构建常见问题](https://doc.fastgpt.io/en/guide/build/faq)
