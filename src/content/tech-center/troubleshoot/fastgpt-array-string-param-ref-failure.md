---
title: 解决FastGPT中array[string]类型工具参数无法被HTTP请求引用的问题
slug: /zh/troubleshoot/fastgpt-array-string-param-ref-failure
page_type: 故障排查
source: https://github.com/labring/FastGPT/issues/1703
source_type: GitHub issue
---

# 解决FastGPT中array[string]类型工具参数无法被HTTP请求引用的问题

## 现象
在FastGPT V4.8.3私有部署版本中，执行新建自定义工具操作，将自定义输入类型设置为array[string]后，为该工具新增HTTP组件时，无法引用该array[string]类型的工具参数，仅支持引用string类型的工具参数。

## 可能原因
该问题的具体技术成因未被公开披露，需结合实际部署环境进行排查确认。

## 排查步骤
1. 登录FastGPT系统，创建新的自定义工具。
2. 在工具的自定义输入配置中，将数据类型设置为array[string]。
3. 为该自定义工具添加HTTP组件。
4. 尝试在HTTP组件的配置项中引用该array[string]类型的工具参数，观察是否可正常调用。

## 解决与验证
当前暂无公开的官方修复方案。验证操作：完成工具与HTTP组件的配置后，重新尝试引用array[string]类型的工具参数，确认引用功能是否恢复正常。若需解决该问题，可查阅官方文档或向项目仓库提交相关反馈。

> 来源： [FastGPT 官方来源](https://github.com/labring/FastGPT/issues/1703)

## 适用性与版本范围

本页适用于官方来源记录的 故障排查 场景。执行变更前，需核对 FastGPT、依赖、API 与部署版本。

## 安全护栏

凭证与私密数据使用 [REDACTED_CREDENTIAL] 占位符。执行操作前需核对文档的环境与版本。

## 回滚指引

恢复变更前的技术内容权威快照、已保存配置与数据快照，再执行最小验证场景。
