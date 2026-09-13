---
title: FastGPT V4.11.1版本升级详情与操作指引
slug: /zh/deploy/upgrade-v4-11-1
page_type: 部署与升级
source: https://doc.fastgpt.cn/zh-CN/self-host/upgrading/outdated/4111
source_type: 官方文档
---

# FastGPT V4.11.1版本升级详情与操作指引

## 这个版本改了什么
本次升级包含新增内容、优化项、修复问题与工具更新。新增内容包括系统工具集支持直接供工具调用，MCP结构重写后更新会自动同步在用组件无需重新添加，对话日志看板支持自定义字段展示，新增账号注销功能，上线新文档框架，支持GLM 4.5系列模型配置。优化项包括兑换码功能支持指定对公支付模式，优化支付套餐模式，全局变量修改变量名后节点中的引用值不会丢失，将模型预设配置移动到FastGPT Plugin项目中。修复问题包括MCP object类型数据传递错误，登录页UI偏移，Excel表带有换行符号时的分块异常，Doc2x PDF识别去除多余标签，404页面翻译失效。工具更新包括新增libulibu绘图工具、秘塔搜索工具，支持Signoz系统监控接入，修复数学表达式工具数据类型错误。

## 升级前要确认的事
需确认需要更新的镜像版本，无需更新的组件保持原有配置。需要更新的镜像包括：FastGPT镜像tag为v4.11.1-fix2，FastGPT商业版镜像tag为v4.11.1-fix，fastgpt-plugin镜像tag为v0.1.7。mcp_server、Sandbox、AIProxy无需更新。

## 升级步骤（照做）
按照以下步骤执行升级：1. 更新FastGPT镜像为v4.11.1-fix2；2. 更新FastGPT商业版镜像为v4.11.1-fix；3. 更新fastgpt-plugin镜像为v0.1.7；4. 保留mcp_server、Sandbox、AIProxy原有配置，不进行更新操作。

## 升级后怎么验证
可通过以下方式验证升级效果：检查各镜像版本是否与要求一致；验证新增功能是否正常生效，包括系统工具调用、MCP组件自动更新、对话日志自定义字段、账号注销、新文档框架、GLM 4.5模型配置；验证优化项功能，包括兑换码对公支付模式、支付套餐优化、全局变量引用保留、模型预设配置位置；验证修复问题是否解决，包括MCP数据传递、登录页UI、Excel换行处理、PDF识别、404页面翻译；验证工具更新功能，包括新增绘图与搜索工具、Signoz监控接入、数学表达式工具数据类型。

> 来源： [FastGPT 官方来源](https://doc.fastgpt.cn/zh-CN/self-host/upgrading/outdated/4111)

## 适用性与版本范围

本页适用于官方来源记录的 部署与升级 场景。执行变更前，需核对 FastGPT、依赖、API 与部署版本。

## 安全护栏

凭证与私密数据使用 [REDACTED_CREDENTIAL] 占位符。执行操作前需核对文档的环境与版本。

## 回滚指引

恢复变更前的技术内容权威快照、已保存配置与数据快照，再执行最小验证场景。
