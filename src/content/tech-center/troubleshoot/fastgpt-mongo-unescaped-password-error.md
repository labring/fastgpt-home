---
title: 解决FastGPT连接MongoDB密码含未转义字符的报错问题
slug: /zh/troubleshoot/fastgpt-mongo-unescaped-password-error
page_type: 排错/错误码
source: https://github.com/labring/FastGPT/issues/3972
source_type: GitHub issue
---

# 解决FastGPT连接MongoDB密码含未转义字符的报错问题

## 现象
启动FastGPT服务时，出现MongoDB连接失败报错，完整错误文本为`MongoParseError]: Password contains unescaped characters`，同时伴随一系列调用栈信息。

## 可能原因
该报错由MongoDB客户端解析连接参数失败导致，核心原因为配置的MongoDB连接字符串中的密码包含未转义的特殊字符，无法被正常识别解析。

## 排查步骤
1.  定位FastGPT的MongoDB连接配置文件，获取当前使用的MongoDB连接字符串。
2.  拆分连接字符串，提取其中的密码部分，检查是否包含`@`、`:`、`/`、`?`、`#`、`[`、`]`等特殊字符。
3.  确认未转义的特殊字符所在位置，记录原始密码内容。

## 解决与验证
对密码中的特殊字符按照URL编码规则进行转义处理，将转义后的密码替换到MongoDB连接字符串中，更新FastGPT的配置项。重启FastGPT服务后，检查是否不再出现该报错，确认服务可以正常连接MongoDB并启动运行。

> 来源：[FastGPT GitHub issue](https://github.com/labring/FastGPT/issues/3972)
