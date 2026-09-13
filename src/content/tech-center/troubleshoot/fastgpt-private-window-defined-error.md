---
title: 解决FastGPT私有部署启动后window未定义的报错问题
slug: /zh/troubleshoot/fastgpt-private-window-defined-error
page_type: 故障排查
source: https://github.com/labring/FastGPT/issues/465
source_type: GitHub issue
---

# 解决FastGPT私有部署启动后window未定义的报错问题

## 现象
启动FastGPT私有部署版本后，访问页面即出现ReferenceError: window is not defined报错，无额外前置操作触发。

## 可能原因
需结合实际部署环境与代码调用链路确认，该报错通常因非浏览器环境执行了依赖浏览器全局对象window的代码逻辑。

## 排查步骤
1.  确认当前部署的为私有部署版本，查看启动日志与页面报错详情，定位报错触发的具体代码位置。
2.  检查项目代码中是否存在在服务端执行时直接调用window对象的逻辑。
3.  核对部署环境与项目的兼容要求。

## 解决与验证
1.  将调用window对象的逻辑封装为仅在浏览器环境执行的代码，例如通过`typeof window !== 'undefined'`判断后再执行对应逻辑。
2.  重新启动FastGPT服务，访问页面确认ReferenceError: window is not defined报错不再出现。
3.  验证所有页面功能可正常加载与使用。

> 来源： [FastGPT 官方来源](https://github.com/labring/FastGPT/issues/465)

## 适用性与版本范围

本页适用于官方来源记录的 故障排查 场景。执行变更前，需核对 FastGPT、依赖、API 与部署版本。

## 安全护栏

凭证与私密数据使用 [REDACTED_CREDENTIAL] 占位符。执行操作前需核对文档的环境与版本。

## 回滚指引

恢复变更前的技术内容权威快照、已保存配置与数据快照，再执行最小验证场景。
