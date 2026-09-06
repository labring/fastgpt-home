---
title: 解决FastGPT /api/core/dataset/data/list接口403凭证错误问题
slug: /zh/troubleshoot/fastgpt-dataset-data-list-403-error
page_type: 故障排查
source: https://github.com/labring/FastGPT/issues/771
source_type: GitHub issue
---

# 解决FastGPT /api/core/dataset/data/list接口403凭证错误问题

## 现象
FastGPT v4.6.7版本中，调用`/api/core/dataset/data/list`接口时，使用格式为`fastgpt-xxxxx`的通用key发起请求，会返回403凭证错误，完整报错内容为`{"code": 403,"statusText": "unAuthorization","message": "凭证错误","data": null}`。改用网页平台获取的Token字段发起相同请求，则可正常请求成功。

## 可能原因
当前无法通过该issue的公开信息确定具体根因。需结合实际部署环境，核对接口鉴权规则、密钥权限配置、接口访问权限范围等相关内容，定位鉴权逻辑未覆盖通用key的具体环节。

## 排查步骤
1. 确认当前使用的FastGPT版本为v4.6.7。
2. 调用`/api/core/dataset/data/list`接口，分别使用格式为`fastgpt-xxxxx`的通用key和网页平台获取的Token字段发起请求，记录两次请求的返回结果。
3. 核对通用key的权限配置，确认其是否包含数据集数据列表接口的访问权限。
4. 检查接口的鉴权逻辑，确认通用key是否被纳入该接口的合法鉴权范围。

## 解决与验证
根据排查结果调整接口鉴权相关配置，将通用key纳入`/api/core/dataset/data/list`接口的合法鉴权范围。验证时，重新使用格式为`fastgpt-xxxxx`的通用key发起接口请求，确认不再返回指定的403凭证错误，且请求可成功返回预期数据。

> 来源： [FastGPT 官方来源](https://github.com/labring/FastGPT/issues/771)

## 适用性与版本范围

本页适用于官方来源记录的 故障排查 场景。执行变更前，需核对 FastGPT、依赖、API 与部署版本。

## 安全护栏

凭证与私密数据使用 [REDACTED_CREDENTIAL] 占位符。执行操作前需核对文档的环境与版本。

## 回滚指引

恢复变更前的技术内容权威快照、已保存配置与数据快照，再执行最小验证场景。
