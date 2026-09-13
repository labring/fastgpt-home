---
title: 解决FastGPT自定义插件调用接口无法获取token的问题
slug: /zh/troubleshoot/fastgpt-custom-plugin-fetch-token
page_type: 故障排查
source: https://github.com/labring/FastGPT/issues/2577
source_type: GitHub issue
---

# 解决FastGPT自定义插件调用接口无法获取token的问题

## 现象
用户在FastGPT工作流中自定义临时知识库创建插件，用于在工作流中动态创建临时知识库，但调用/api/core/dataset/create接口时，该接口要求传入token参数，目前无法获取该token用于接口调用。

## 可能原因
暂无明确通用的根本原因，需结合实际的FastGPT私有部署环境进行排查，可能涉及自定义插件的运行上下文权限、FastGPT平台的token传递规则、插件代码逻辑的token获取实现等，具体需按实际环境确认。

## 排查步骤（有序列表，每步可照做）
1. 确认当前使用的FastGPT私有部署版本为4.8，核对版本是否与问题场景匹配。
2. 检查自定义插件的运行环境，确认是否有权限访问FastGPT平台的token获取入口或相关配置。
3. 核对/api/core/dataset/create接口的调用要求，确认token参数的正确传入格式与位置。
4. 查看FastGPT平台的运行日志，确认接口调用时的请求参数是否携带有效token，或是否存在相关报错信息。

## 解决与验证
根据实际排查结果，补充自定义插件中获取FastGPT平台有效token的代码逻辑，确保在调用/api/core/dataset/create接口时，正确传入符合要求的token参数。验证方式为：在完成代码调整后，重新触发自定义插件的执行，调用/api/core/dataset/create接口，确认可正常创建临时知识库且接口调用成功。

> 来源： [FastGPT 官方来源](https://github.com/labring/FastGPT/issues/2577)

## 适用性与版本范围

本页适用于官方来源记录的 故障排查 场景。执行变更前，需核对 FastGPT、依赖、API 与部署版本。

## 安全护栏

凭证与私密数据使用 [REDACTED_CREDENTIAL] 占位符。执行操作前需核对文档的环境与版本。

## 回滚指引

恢复变更前的技术内容权威快照、已保存配置与数据快照，再执行最小验证场景。
