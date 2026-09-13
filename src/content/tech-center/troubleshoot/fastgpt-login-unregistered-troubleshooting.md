---
title: FastGPT启动后登录提示未注册问题的排查与解决
slug: /zh/troubleshoot/fastgpt-login-unregistered-troubleshooting
page_type: 故障排查
source: https://github.com/labring/FastGPT/issues/836
source_type: GitHub issue
---

# FastGPT启动后登录提示未注册问题的排查与解决

## 现象
启动Docker部署的FastGPT服务后，访问登录页面，登录时系统提示未注册，该提示显示于登录页面，导致无法完成登录流程。

## 可能原因
结合Docker部署场景，FastGPT初始化配置参数未正确传入容器，初始化流程未正常执行，初始用户未成功创建。

## 排查步骤
1.  核对Docker启动命令或compose配置中的初始化相关参数，确保参数格式与取值符合要求。
2.  查看FastGPT容器的标准输出日志，检索初始化相关的日志信息，确认是否存在初始化失败的提示。
3.  检查服务与关联组件的连接配置，确认连接参数正确且网络可达。

## 解决与验证
修正错误的初始化配置参数后，重启Docker服务。若初始化流程存在异常，需根据日志提示修复对应问题；若连接配置异常，需修正连接参数后重启服务。重新访问FastGPT登录页面，使用预设初始化账号登录，确认不再提示未注册，且可正常进入系统后台。

> 来源： [FastGPT 官方来源](https://github.com/labring/FastGPT/issues/836)

## 适用性与版本范围

本页适用于官方来源记录的 故障排查 场景。执行变更前，需核对 FastGPT、依赖、API 与部署版本。

## 安全护栏

凭证与私密数据使用 [REDACTED_CREDENTIAL] 占位符。执行操作前需核对文档的环境与版本。

## 回滚指引

恢复变更前的技术内容权威快照、已保存配置与数据快照，再执行最小验证场景。
