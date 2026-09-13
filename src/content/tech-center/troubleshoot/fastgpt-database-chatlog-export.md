---
title: FastGPT数据库内对话日志的导出操作指南
slug: /zh/troubleshoot/fastgpt-database-chatlog-export
page_type: 排错/错误码
source: https://github.com/labring/FastGPT/issues/1060
source_type: GitHub issue
---

# FastGPT数据库内对话日志的导出操作指南

## 现象
前端界面支持导出html、md、pdf格式的对话日志，但无法直接导出存储在数据库（pg、mongo）中的对话日志文件。

## 可能原因
当前系统未提供数据库内对话日志的直接导出功能，需通过数据库原生工具手动执行导出操作。

## 排查步骤
1. 确认数据库连接的基础信息，包括用户名、密码、认证数据库、数据库名称等，需按实际环境确认。
2. 定位存储对话日志的数据库集合，MongoDB环境下对应chatitems集合，需按实际数据库类型确认。
3. 明确需要导出的日志字段，按需确定所需导出的内容项。

## 解决与验证
使用MongoDB原生导出命令完成操作，参考命令如下：
```
mongoexport   -u "xxxx" -p "xxxx" --authenticationDatabase admin --db=fastgpt --collection=chatitems --type=csv --fields=chatId,appId,title,obj,value,time --out=/data/db/chatitems.csv
```
命令中占位符`xxxx`需替换为实际的数据库用户名与密码，`--fields`参数可根据实际需求调整需要导出的字段，导出结果将保存为指定路径下的csv文件。聊天记录存储于chatitems集合中，可通过调整命令参数适配不同的导出需求。

> 来源: [FastGPT GitHub issue #1060](https://github.com/labring/FastGPT/issues/1060)
