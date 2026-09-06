---
title: 解决FastGPT登录卡住及MongoDB连接超时、类型转换错误
slug: /zh/troubleshoot/fastgpt-login-mongo-error-troubleshooting
page_type: 排错/错误码
source: https://github.com/labring/FastGPT/issues/178
source_type: GitHub issue
---

# 解决FastGPT登录卡住及MongoDB连接超时、类型转换错误

## 现象
点击FastGPT登录按钮后页面卡住，登录按钮持续处于转圈状态，相关API请求处于pending状态，一段时间后请求失败。系统日志中会出现`mongo connect error`报错，同时包含`MongooseError: Operation 'trainingdatas.findOneAndUpdate() buffering timed out after 10000ms'`以及`Cast to ObjectId failed for value "" (type string) at path "_id" for model "trainingData"`等错误信息。

## 可能原因
一是MongoDB数据库连接出现异常，导致数据库操作超时；二是业务查询时传入了空字符串作为`_id`参数，无法被正确转换为MongoDB的ObjectId类型，触发类型转换错误，导致操作失败。

## 排查步骤
1. 查看系统运行日志，确认是否存在`mongo connect error`以及`trainingdatas.findOneAndUpdate() buffering timed out`相关报错内容。
2. 检查MongoDB服务的运行状态，确认数据库服务正常启动且网络可达。
3. 核对数据库连接配置参数，确保配置与实际MongoDB部署环境一致。
4. 检查触发报错的业务代码逻辑，确认查询时传入的`_id`参数是否为空或不符合ObjectId格式要求。
5. 复现登录问题，抓取前端请求参数，查看是否存在空的`_id`参数传递。

## 解决与验证
如果问题由MongoDB连接异常导致，修正数据库连接配置，确保配置项准确无误，重启服务后验证登录流程，确认API请求不再处于pending状态，无连接超时报错。如果问题由`_id`参数格式错误导致，在业务代码中对`_id`参数进行合法性校验，过滤空字符串或不符合格式的参数，确保传入的参数为12字节字符串、24位十六进制字符串或有效整数后再执行数据库操作。完成修改后重新触发登录流程，确认不再出现CastError相关日志，登录流程可正常完成。

> 来源：[FastGPT GitHub issue](https://github.com/labring/FastGPT/issues/178)
