---
title: FastGPT登录报502网关错误的排查与解决方法
slug: /zh/troubleshoot/fastgpt-login-502-error-troubleshooting
page_type: 故障排查
source: https://github.com/labring/FastGPT/issues/2921
source_type: GitHub issue
---

# FastGPT登录报502网关错误的排查与解决方法

## 现象
登录FastGPT公有云版本时，输入用户名与密码后，页面返回Request failed with status code 502的报错。

## 可能原因
需按实际环境确认，常见关联场景包括网关转发配置异常、后端服务运行状态异常。

## 排查步骤
1. 确认访问地址为对应IP的3000端口，网络连接无异常。
2. 查看浏览器控制台的报错信息，确认报错文本为Request failed with status code 502。
3. 检查FastGPT公有云服务的运行状态，确认后端服务未出现中断。

## 解决与验证
若为网关转发配置异常，需联系对应云服务提供商排查相关配置；若为后端服务异常，需重启FastGPT服务。验证方式为重新输入用户名和密码，登录成功且无502报错。

> 来源： [FastGPT 官方来源](https://github.com/labring/FastGPT/issues/2921)

## 适用性与版本范围

本页适用于官方来源记录的 故障排查 场景。执行变更前，需核对 FastGPT、依赖、API 与部署版本。

## 安全护栏

凭证与私密数据使用 [REDACTED_CREDENTIAL] 占位符。执行操作前需核对文档的环境与版本。

## 回滚指引

恢复变更前的技术内容权威快照、已保存配置与数据快照，再执行最小验证场景。
