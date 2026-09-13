---
title: 解决FastGPT inputGuide/query接口正则报错问题
slug: /zh/troubleshoot/fastgpt-inputguide-query-regex-error
page_type: 排错/错误码
source: https://github.com/labring/FastGPT/issues/1840
source_type: GitHub issue
---

# 解决FastGPT inputGuide/query接口正则报错问题

## 现象
调用FastGPT的`/api/core/chat/inputGuide/query`接口时，会触发正则表达式相关的API错误。日志显示报错信息为`Invalid regular expression: /一个sql语句是这样的：\n```\nINSERT INTO github_project(\n    d/: Unterminated group`，同时伴随`SyntaxError: Invalid regular expression`的堆栈信息，报错发生在`/app/projects/app/.next/server/pages/api/core/chat/inputGuide/query.js`文件的RegExp实例化环节。当前部署版本为v4.8.4私有部署版本。

## 可能原因
报错提示`Unterminated group`，说明代码在通过RegExp构造正则表达式时，传入的字符串存在未闭合的语法分组。本次报错的触发场景是输入了包含SQL语句的文本，该文本被错误当作正则表达式直接传入RegExp构造函数，导致正则语法解析失败。

## 排查步骤
1.  查看触发报错的请求入参，确认用户输入内容是否包含未闭合的正则语法字符，如括号、反斜杠等。
2.  查看完整报错堆栈，定位到`/app/projects/app/.next/server/pages/api/core/chat/inputGuide/query.js`文件中调用RegExp的代码位置，确认该逻辑是否直接使用用户输入作为正则表达式参数。
3.  核对当前FastGPT部署版本，确认为v4.8.4私有部署版本。
4.  检查接口的输入处理流程，确认是否存在未对用户输入进行转义就直接构造正则表达式的环节。

## 解决与验证
解决方法分为两种场景：
1.  若该接口需要使用正则表达式处理输入，需对用户输入的文本进行正则元字符转义，将`/`、`(`、`)`等特殊字符进行转义处理，避免被当作正则语法解析。
2.  若该接口无需使用正则表达式处理输入，可移除RegExp实例化的逻辑，改为普通文本处理流程。
验证步骤：
1.  完成代码修改并重新部署服务，再次调用`/api/core/chat/inputGuide/query`接口，传入包含SQL语句的测试内容。
2.  确认接口不再返回正则表达式相关的SyntaxError，返回正常的业务响应。
3.  检查服务日志，无该报错信息。

> 来源：[FastGPT GitHub issue](https://github.com/labring/FastGPT/issues/1840)
