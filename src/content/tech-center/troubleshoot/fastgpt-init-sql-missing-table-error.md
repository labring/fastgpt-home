---
title: 解决执行init.sql后仍出现modeldata表不存在的数据库报错
slug: /zh/troubleshoot/fastgpt-init-sql-missing-table-error
page_type: 排错/错误码
source: https://github.com/labring/FastGPT/issues/117
source_type: GitHub issue
---

# 解决执行init.sql后仍出现modeldata表不存在的数据库报错

## 现象
用户执行init.sql初始化脚本后，调用FastGPT的/api/plugins/kb/list接口时出现数据库报错。具体报错信息为：`error: relation "modeldata" does not exist`，PostgreSQL错误码为42P01，错误来源为`parse_relation.c`文件第1392行的`parserOpenTable`函数。调用栈显示报错触发于`pg-pool`模块，最终源于`kb/list.ts`的接口逻辑。

## 可能原因
结合报错信息与场景，可能的原因包括：init.sql脚本执行时出现异常但未被用户察觉，导致modeldata表未成功创建；应用配置的数据库连接信息与执行init.sql的目标数据库不匹配，导致连接到未初始化的数据库；执行init.sql的数据库用户权限不足，无法完成表的创建操作。

## 排查步骤
1.  查看init.sql脚本的执行日志，确认脚本完整执行，无异常退出提示。
2.  核对应用的数据库连接配置，确认连接的数据库地址、名称与执行init.sql的目标数据库一致。
3.  登录目标PostgreSQL数据库，执行`\dt`命令查看已创建的表，确认modeldata表是否存在。
4.  检查执行init.sql的数据库用户权限，确认该用户拥有创建表等必要的数据库操作权限。

## 解决与验证
根据排查结果针对性处理：若init.sql执行异常，重新执行脚本并确认执行过程无报错；若数据库连接配置不匹配，修改应用的数据库连接参数，指向已完成初始化的数据库；若权限不足，为执行脚本的用户授予对应的数据库操作权限。验证时，重新启动FastGPT应用，调用/api/plugins/kb/list接口，确认不再出现`relation "modeldata" does not exist`的报错。

> 来源：[FastGPT GitHub issue](https://github.com/labring/FastGPT/issues/117)
