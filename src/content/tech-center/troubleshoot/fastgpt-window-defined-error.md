---
title: 解决FastGPT启动时出现ReferenceError: window未定义的报错问题
slug: /zh/troubleshoot/fastgpt-window-defined-error
page_type: 故障排查
source: https://github.com/labring/FastGPT/issues/1303
source_type: GitHub issue
---

# 解决FastGPT启动时出现ReferenceError: window未定义的报错问题

## 现象
克隆FastGPT代码并启动服务后，访问页面时触发ReferenceError: window is not defined报错，使用的Node.js版本为18.18.2。该问题属于运行时环境兼容性报错，影响服务正常访问。

## 可能原因
该报错通常由浏览器专属全局对象window在Node.js服务端运行环境中被直接引用导致，由于Node.js环境未内置window对象，直接引用会触发未定义错误。具体触发场景需结合实际代码逻辑确认，无额外信息时需按实际环境排查。

## 排查步骤
1. 确认当前使用的Node.js版本为18.18.2，检查克隆后的初始代码未被修改核心配置文件或依赖包。2. 根据报错信息定位触发错误的具体代码位置，检查该位置是否存在在非浏览器环境中直接引用window全局对象的逻辑。3. 核对FastGPT官方文档中关于运行环境、Node.js版本兼容的相关说明，确认是否存在版本或配置不匹配的情况。

## 解决与验证
需根据实际报错的代码位置，调整window对象的引用逻辑，确保仅在浏览器环境中通过条件判断调用该全局对象，例如使用typeof window !== 'undefined'进行前置校验。验证方式为重新启动服务，访问页面后无ReferenceError: window is not defined报错，服务恢复正常访问。

> 来源： [FastGPT 官方来源](https://github.com/labring/FastGPT/issues/1303)

## 适用性与版本范围

本页适用于官方来源记录的 故障排查 场景。执行变更前，需核对 FastGPT、依赖、API 与部署版本。

## 安全护栏

凭证与私密数据使用 [REDACTED_CREDENTIAL] 占位符。执行操作前需核对文档的环境与版本。

## 回滚指引

恢复变更前的技术内容权威快照、已保存配置与数据快照，再执行最小验证场景。
