---
title: 解决FastGPT调用创建训练用量接口返回unAuthDataset错误问题
slug: /zh/troubleshoot/fastgpt-training-usage-unauth-error
page_type: 故障排查
source: https://github.com/labring/FastGPT/issues/1928
source_type: GitHub issue
---

# 解决FastGPT调用创建训练用量接口返回unAuthDataset错误问题

## 现象
FastGPT版本v4.8.5，调用`/support/wallet/usage/createTrainingUsage`接口时，返回{"code":501000,"statusText":"unAuthDataset","message":"core.dataset.error.unAuthDataset","data":null}。使用的API_KEY已确认正确，其他接口可正常调用，更换应用的API_KEY后仍出现该报错。

## 可能原因
目前仅能明确报错关联未授权数据集相关逻辑，具体原因需结合实际部署环境的配置确认。

## 排查步骤
1. 确认调用的接口地址为`/support/wallet/usage/createTrainingUsage`，请求方式为POST，请求体携带`{"name":"test.docx"}`。
2. 确认请求头中Authorization字段格式为`Bearer {api_key}`，且API_KEY本身无误。
3. 确认其他接口可正常调用，排除API_KEY全局失效的情况。
4. 更换应用的API_KEY后再次测试，确认报错是否重复出现。
5. 需按实际环境确认数据集相关的权限配置项。

## 解决与验证
若排查后确认API_KEY、请求格式均无误，需按实际部署环境的数据集权限配置进行调整。验证方式为重新调用该接口，若返回结果不再包含501000错误码及unAuthDataset相关信息，则问题解决。

> 来源： [FastGPT 官方来源](https://github.com/labring/FastGPT/issues/1928)

## 适用性与版本范围

本页适用于官方来源记录的 故障排查 场景。执行变更前，需核对 FastGPT、依赖、API 与部署版本。

## 安全护栏

凭证与私密数据使用 [REDACTED_CREDENTIAL] 占位符。执行操作前需核对文档的环境与版本。

## 回滚指引

恢复变更前的技术内容权威快照、已保存配置与数据快照，再执行最小验证场景。
