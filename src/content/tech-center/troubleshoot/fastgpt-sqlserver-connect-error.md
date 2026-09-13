---
title: FastGPT 数据库工具连接 SQL Server 的历史排查
slug: /zh/troubleshoot/fastgpt-sqlserver-connect-error
page_type: 排错/错误码
source: https://github.com/labring/FastGPT/issues/3935
source_type: GitHub issue
---

# FastGPT 数据库工具连接 SQL Server 的历史排查

## 适用场景与历史记录

原报告来自公有云体验环境：数据库工具可以连接 MySQL，连接 SQL Server 时异常；后续有私有部署用户反馈相似表现。 原始讨论提交于 2025-02-28，本页按该记录说明症状或需求的适用范围。

## 已有证据与适用范围

原线程缺少错误文本和修复确认，应核对具体数据库工具及连接协议，保留两种部署场景的边界。

## 排查与复测

1. 记录数据库工具名称和版本，以及 SQL Server 实例、端口、认证类型。
2. 从实际执行工具的服务环境验证网络与数据库连接，保存驱动错误。
3. 使用最小只读查询检查权限和返回格式，再对照工具声明支持的数据库类型。

这些检查用于复现和验证同类场景。继续反馈时，提供准确版本、最小输入、预期结果和脱敏日志，并引用原始讨论。

## 参考资料


> 来源: [原始讨论：无法连接sql server](https://github.com/labring/FastGPT/issues/3935)

> 来源: [原讨论中的补充回复](https://github.com/labring/FastGPT/issues/3935#issuecomment-2792095926)
