---
title: 解决FastGPT免登录窗口嵌入iframe时传递初始参数问题
slug: /zh/troubleshoot/fastgpt-iframe-embed-pass-params
page_type: 故障排查
source: https://github.com/labring/FastGPT/issues/4592
source_type: GitHub issue
---

# 解决FastGPT免登录窗口嵌入iframe时传递初始参数问题

## 现象
FastGPT免登录窗口通过iframe嵌入外部站点时，无法获取工作流所需的初始参数，例如用户名。

## 可能原因
未明确FastGPT免登录窗口嵌入iframe时的参数传递规则，无法找到合法的传参方式。当前使用的FastGPT私有部署版本为4.9.6，需结合该版本的官方说明确认传参逻辑。

## 排查步骤
1. 确认FastGPT私有部署版本为4.9.6，匹配当前使用场景。
2. 梳理免登录窗口嵌入iframe的现有代码逻辑，明确参数传递的入口位置。
3. 查阅FastGPT官方文档中关于免登录窗口嵌入的相关配置说明。
4. 测试不同参数传递方式的有效性，确认可用的传参格式。

## 解决与验证
根据FastGPT官方文档及4.9.6版本的规则，可通过iframe的URL参数传递初始信息。将用户名等初始参数拼接在免登录窗口的URL后，即可在工作流中获取对应参数。验证时，可在工作流中配置参数获取逻辑，输出传入的参数值，确认参数是否正常接收。若参数未正常获取，需检查URL参数的拼接格式是否符合系统要求，同时确认免登录窗口的配置是否允许外部传参。

> 来源： [FastGPT 官方来源](https://github.com/labring/FastGPT/issues/4592)

## 适用性与版本范围

本页适用于官方来源记录的 故障排查 场景。执行变更前，需核对 FastGPT、依赖、API 与部署版本。

## 安全护栏

凭证与私密数据使用 [REDACTED_CREDENTIAL] 占位符。执行操作前需核对文档的环境与版本。

## 回滚指引

恢复变更前的技术内容权威快照、已保存配置与数据快照，再执行最小验证场景。
