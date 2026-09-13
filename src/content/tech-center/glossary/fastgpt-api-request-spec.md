---
title: 解释FastGPT第三方数据集与会话管理API请求使用规范
slug: /zh/glossary/fastgpt-api-request-spec
page_type: 术语表
source: https://doc.fastgpt.cn/zh-CN/guide/dataset/third-party/api_dataset
source_type: 官方文档
---

# 解释FastGPT第三方数据集与会话管理API请求使用规范

## 一句话定义
FastGPT API请求是FastGPT开放接口与第三方数据集接口的标准调用请求格式与参数要求。

## 在 FastGPT 里怎么用
### 获取文件阅读链接接口
使用GET请求方法，请求路径为{{baseURL}}/v1/file/read，需携带id查询参数（文件ID）与Authorization请求头，格式为Bearer {{authorization}}。示例curl命令为：
```bash
curl --location --request GET '{{baseURL}}/v1/file/read?id=xx' \
--header 'Authorization: Bearer {{authorization}}'
```
响应为JSON格式，包含success、message、data字段，data内的url为文件访问链接，访问后可直接查看原文。
### 删除单个会话接口
使用DELETE请求方法，请求路径为/api/core/chat/history/delHistory，需携带chatId（会话ID）、appId（应用ID）查询参数与Authorization请求头，格式为Bearer [apikey]。示例curl命令为：
```bash
curl --location --request DELETE 'http://localhost:3000/api/core/chat/history/delHistory?chatId=[chatId]&appId=[appId]' \
--header 'Authorization: Bearer [apikey]'
```
响应为JSON格式，包含code、statusText、message、data字段，data值为null。

## 容易搞错的地方
1. 混淆接口的请求方法，例如将获取文件阅读链接的GET请求误用为POST等其他方法；
2. 遗漏必填参数，例如删除单个会话时未携带appId或chatId参数；
3. Authorization请求头格式错误，未添加Bearer前缀与空格；
4. 未替换示例中的占位符，如{{baseURL}}、{{authorization}}、[chatId]等参数，导致请求失败。

> 来源： [FastGPT 官方来源](https://doc.fastgpt.cn/zh-CN/guide/dataset/third-party/api_dataset)

## 适用性与版本范围

本页适用于官方来源记录的 术语表 场景。执行变更前，需核对 FastGPT、依赖、API 与部署版本。

## 安全护栏

凭证与私密数据使用 [REDACTED_CREDENTIAL] 占位符。执行操作前需核对文档的环境与版本。

## 回滚指引

恢复变更前的技术内容权威快照、已保存配置与数据快照，再执行最小验证场景。
