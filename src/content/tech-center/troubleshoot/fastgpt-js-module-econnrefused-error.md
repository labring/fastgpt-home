---
title: 解决FastGPT JS模块运行时ECONNREFUSED 80端口连接错误
slug: /zh/troubleshoot/fastgpt-js-module-econnrefused-error
page_type: 故障排查
source: https://github.com/labring/FastGPT/issues/1761
source_type: GitHub issue
---

# 解决FastGPT JS模块运行时ECONNREFUSED 80端口连接错误

## 现象
运行FastGPT的JS模块时触发报错，返回的错误信息包含：message为`connect ECONNREFUSED ::1:80`，code为`ECONNREFUSED`，请求方法为post，请求url为`undefined/sandbox/js`。

## 可能原因
该报错属于端口连接拒绝类错误，结合报错信息中的`undefined/sandbox/js`和`::1:80`，大概率与JS运行沙箱的本地端口配置、服务启动状态或请求参数赋值有关，需按实际运行环境确认具体触发因素。

## 排查步骤
1. 检查JS运行沙箱相关服务的启动状态，确认本地80端口是否被正常监听，或是否存在端口被其他进程占用的情况。
2. 定位请求url中`undefined`字段的来源，核对相关配置项是否完成正确赋值。
3. 确认当前使用的密钥状态正常，检查运行环境的网络连接权限是否允许访问目标端口。

## 解决与验证
根据排查结果修复对应问题，例如启动未正常运行的沙箱服务、修正配置项的url参数、释放被占用的80端口或调整网络权限。修复完成后，重新运行JS模块，确认不再出现`connect ECONNREFUSED ::1:80`报错，JS模块可正常执行。

> 来源： [FastGPT 官方来源](https://github.com/labring/FastGPT/issues/1761)

## 适用性与版本范围

本页适用于官方来源记录的 故障排查 场景。执行变更前，需核对 FastGPT、依赖、API 与部署版本。

## 安全护栏

凭证与私密数据使用 [REDACTED_CREDENTIAL] 占位符。执行操作前需核对文档的环境与版本。

## 回滚指引

恢复变更前的技术内容权威快照、已保存配置与数据快照，再执行最小验证场景。
