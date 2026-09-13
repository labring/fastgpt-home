---
title: 讲解FastGPT部署与安全场景中的target术语含义与用法
slug: /zh/glossary/fastgpt-target-term-guide
page_type: 术语表
source: https://doc.fastgpt.cn/zh-CN/self-host/deploy/sealos
source_type: 官方文档
---

# 讲解FastGPT部署与安全场景中的target术语含义与用法

## 一句话定义
target在FastGPT相关场景中有两种明确含义，一是用于控制链接打开方式的HTML属性，二是安全漏洞排查示例中的目标服务器占位符。

## 在FastGPT里怎么用
在FastGPT一键部署页面的部署按钮链接中，使用target="_blank"属性，点击该链接后将在新浏览器窗口打开部署页面。在安全漏洞排查的示例文档中，target作为占位符指代目标服务器的地址，示例访问路径为http://target/servlet/SessionServlet，该路径可用于查看当前Http会话的id号。此外，示例还提到viewsource.jsp存在路径检查未禁止的安全问题，需手工删除存在问题的范例代码。

## 容易搞错的地方
易混淆两种场景下的target含义，一种是控制链接打开行为的HTML属性，另一种是示例中的服务器占位符。前者用于配置链接的打开方式，后者用于示例中的服务器地址指代，二者使用场景与作用完全不同，不可混用。同时需注意，漏洞示例中的target仅为占位符，实际使用时需替换为真实的服务器地址。

> 来源： [FastGPT 官方来源](https://doc.fastgpt.cn/zh-CN/self-host/deploy/sealos)

## 适用性与版本范围

本页适用于官方来源记录的 术语表 场景。执行变更前，需核对 FastGPT、依赖、API 与部署版本。

## 安全护栏

凭证与私密数据使用 [REDACTED_CREDENTIAL] 占位符。执行操作前需核对文档的环境与版本。

## 回滚指引

恢复变更前的技术内容权威快照、已保存配置与数据快照，再执行最小验证场景。
