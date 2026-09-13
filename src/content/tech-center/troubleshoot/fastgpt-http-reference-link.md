---
title: 配置FastGPT HTTP组件实现引用文本点击跳转指定链接
slug: /zh/troubleshoot/fastgpt-http-reference-link
page_type: 排错/错误码
source: https://github.com/labring/FastGPT/issues/1096
source_type: GitHub issue
---

# 配置FastGPT HTTP组件实现引用文本点击跳转指定链接

## 现象
使用FastGPT的HTTP组件返回查询数据时，希望点击返回内容中的"外部数据库"这类引用文本，跳转到指定链接查看详细数据。当前点击该类文本后，打开的是默认的引用数据查看页面，无法实现自定义的指定链接跳转。

## 可能原因
HTTP组件返回的内容未采用支持自定义跳转的引用类型格式，默认格式仅支持查看内置的引用数据，无法绑定自定义跳转链接。

## 排查步骤
1. 查看HTTP接口返回内容的格式，确认是否符合引用类型的格式要求。
2. 检查返回内容的字段结构，匹配引用类型的预设规范。
3. 需按实际环境确认接口返回数据的具体字段与格式适配情况。

## 解决与验证
在HTTP接口的返回内容中，按照引用类型的格式规范返回相关内容，即可实现点击文本跳转查看详细数据。具体格式可参考引用类型的帮助说明，配置完成后，点击返回内容中的"外部数据库"等文本，即可打开指定的详细数据链接。

> 来源: [FastGPT GitHub issue #1096](https://github.com/labring/FastGPT/issues/1096)
