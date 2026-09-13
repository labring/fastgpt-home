---
title: 说明FastGPT获取文件阅读链接API的参数与使用步骤
slug: /zh/glossary/fastgpt-file-read-api
page_type: 术语表
source: https://doc.fastgpt.cn/zh-CN/guide/dataset/third-party/api_dataset
source_type: 官方文档
---

# 说明FastGPT获取文件阅读链接API的参数与使用步骤

## 一句话定义
该接口为FastGPT提供的用于获取指定文件阅读访问链接的GET类型API，可用于查看文件原文内容。

## 在 FastGPT 里怎么用
该接口的标准请求方式为GET，请求地址格式为{{baseURL}}/v1/file/read?id=xx，其中id为目标文件的唯一标识。请求需携带Authorization请求头，格式为Bearer {{authorization}}。官方提供的curl请求示例为：
```bash
curl --location --request GET '{{baseURL}}/v1/file/read?id=xx' \
--header 'Authorization: Bearer {{authorization}}'
```
请求成功后将返回JSON格式响应，示例如下：
```json
{
    "success": true,
    "message": "",
    "data": {
        "url": "xxxx"
    }
}
```
响应结果中data.url字段即为可直接打开的文件访问链接。配置反向代理时，建议仅暴露Gateway WebSocket入口，勿将`/internal/*`、`/metrics`和Gateway HTTP端口暴露到公网。

## 容易搞错的地方
未正确传入文件id参数，将无法获取有效的阅读链接。误用POST等其他请求方法发起请求，将无法得到正常响应。未正确配置Authorization请求头，将导致请求被拒绝。请勿将Gateway internal HTTP API暴露到公网，避免引发安全问题。

> 来源： [FastGPT 官方来源](https://doc.fastgpt.cn/zh-CN/guide/dataset/third-party/api_dataset)

## 适用性与版本范围

本页适用于官方来源记录的 术语表 场景。执行变更前，需核对 FastGPT、依赖、API 与部署版本。

## 安全护栏

凭证与私密数据使用 [REDACTED_CREDENTIAL] 占位符。执行操作前需核对文档的环境与版本。

## 回滚指引

恢复变更前的技术内容权威快照、已保存配置与数据快照，再执行最小验证场景。
