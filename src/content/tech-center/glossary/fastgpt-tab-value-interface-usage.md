---
title: 说明FastGPT中Tab组件value属性与接口参数的使用方法
slug: /zh/glossary/fastgpt-tab-value-interface-usage
page_type: 术语表
source: https://doc.fastgpt.cn/zh-CN/guide/dataset/third-party/api_dataset
source_type: 官方文档
---

# 说明FastGPT中Tab组件value属性与接口参数的使用方法

## 一句话定义
FastGPT文档中Tabs组件的Tab标签的value属性，用于标识对应标签页的唯一标识，需与Tabs组件的items配置项保持一致。

## 在 FastGPT 里怎么用
使用Tabs组件时，需为每个Tab标签配置value属性，属性值需与Tabs的items数组中的对应项完全匹配。例如，示例中配置<Tabs items={['请求示例','响应示例']}>时，需分别为两个Tab标签设置value为"请求示例"和"响应示例"。在获取文件阅读链接的接口中，需通过GET请求调用接口，地址为{{baseURL}}/v1/file/read，携带id查询参数，参数值为文件的唯一标识，请求头需携带Authorization: Bearer {{authorization}}令牌。响应结果将返回{"success": true, "message": "", "data": {"url": "xxxx"}}，其中url为可直接打开的文件访问链接。在删除单个会话的接口中，需通过DELETE请求调用接口，地址为http://localhost:3000/api/core/chat/history/delHistory，携带chatId（会话ID）和appId（应用ID）两个查询参数，请求头需携带Authorization: Bearer [apikey]令牌，响应结果将返回{"code": 200, "statusText": "", "message": "", "data": null}。

## 容易搞错的地方
一是混淆Tab的value属性与items数组的项文本，需确保两者完全一致；二是接口请求需携带所有必填参数，例如获取文件阅读链接接口必须携带id参数，删除会话接口必须携带chatId和appId参数，缺少参数将导致接口调用失败；三是请求头的Authorization令牌格式需为Bearer加空格加令牌值，格式错误将无法通过接口验证。

> 来源： [FastGPT 官方来源](https://doc.fastgpt.cn/zh-CN/guide/dataset/third-party/api_dataset)

## 适用性与版本范围

本页适用于官方来源记录的 术语表 场景。执行变更前，需核对 FastGPT、依赖、API 与部署版本。

## 安全护栏

凭证与私密数据使用 [REDACTED_CREDENTIAL] 占位符。执行操作前需核对文档的环境与版本。

## 回滚指引

恢复变更前的技术内容权威快照、已保存配置与数据快照，再执行最小验证场景。
