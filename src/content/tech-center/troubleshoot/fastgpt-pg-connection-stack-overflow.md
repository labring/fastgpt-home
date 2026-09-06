---
title: 解决FastGPT本地部署时PG连接异常引发的栈溢出错误
slug: /zh/troubleshoot/fastgpt-pg-connection-stack-overflow
page_type: 排错/错误码
source: https://github.com/labring/FastGPT/issues/714
source_type: GitHub issue
---

# 解决FastGPT本地部署时PG连接异常引发的栈溢出错误

## 现象
本地部署FastGPT过程中，执行数据录入与查询操作时，会持续触发RangeError: Maximum call stack size exceeded错误，同时伴随PostgreSQL连接不稳定的问题。

## 可能原因
该问题的核心诱因为环境变量中的PG相关配置项存在错误，导致无法成功建立与PostgreSQL数据库的连接，且部署过程中无法打印`init pg successful`的初始化成功日志。

## 排查步骤
1. 查看FastGPT的部署运行日志，确认是否未输出`init pg successful`的日志内容，以此判断PG数据库连接是否成功建立。
2. 逐一核对环境变量中的PG相关配置参数，确保所有配置项与实际部署的PostgreSQL环境参数保持一致。

## 解决与验证
修正环境变量中的PG相关配置项，使其匹配实际PostgreSQL部署环境的参数。验证流程为重新启动或重新部署FastGPT，检查部署日志是否成功打印`init pg successful`，同时确认数据录入与查询操作不再触发RangeError: Maximum call stack size exceeded错误。

> 来源: [FastGPT GitHub issue #714](https://github.com/labring/FastGPT/issues/714)
