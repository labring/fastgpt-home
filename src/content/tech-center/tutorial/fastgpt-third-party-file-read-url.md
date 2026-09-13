---
title: 获取FastGPT第三方数据集文件的原文阅读访问链接
slug: /zh/tutorial/fastgpt-third-party-file-read-url
page_type: 教程
source: https://doc.fastgpt.cn/zh-CN/guide/dataset/third-party/api_dataset
source_type: 官方文档
---

# 获取FastGPT第三方数据集文件的原文阅读访问链接

### 接口概述
该接口为FastGPT第三方数据集API的配套能力，用于获取指定文件的原文阅读访问链接，返回的链接可直接打开查看文件原文内容，满足第三方数据集内文件的预览需求。仅支持GET请求方式，请求路径格式为`{{baseURL}}/v1/file/read`，需携带合法的访问凭证与文件标识参数。

### 请求配置与示例
请求需携带两个核心要素：一是查询参数`id`（文件的唯一标识）；二是请求头`Authorization`，格式为`Bearer {{authorization}}`，其中`{{authorization}}`为有效访问令牌，`{{baseURL}}`为系统基础接口地址。请求采用GET方法，接口路径为`{{baseURL}}/v1/file/read`。以下为标准请求示例：
```bash
curl --location --request GET '{{baseURL}}/v1/file/read?id=xx' \
--header 'Authorization: Bearer {{authorization}}'
```

### 响应格式与字段说明
请求成功后将返回JSON格式的响应数据，示例如下：
```json
{
    "success": true,
    "message": "",
    "data": {
        "url": "xxxx"
    }
}
```
响应字段包含三个核心内容：`success`为布尔类型，标识请求是否执行成功；`message`为返回的提示信息，请求成功时该字段为空字符串；`data`字段包含实际返回的链接信息，其中`data.url`为文件的访问链接，获取后可直接打开查看原文内容。

### 使用注意事项
发起请求前需确保已获取目标文件的正确id，且授权令牌有效。请求参数缺失或无效时，将返回对应错误提示信息。返回的访问链接仅用于原文预览，不得用于其他非官方用途。

> 来源： [FastGPT 官方来源](https://doc.fastgpt.cn/zh-CN/guide/dataset/third-party/api_dataset)
> 来源： [FastGPT 官方来源](https://doc.fastgpt.cn/zh-CN/guide/dataset/third-party/api_dataset)

## 适用性与版本范围

本页适用于官方来源记录的 教程 场景。执行变更前，需核对 FastGPT、依赖、API 与部署版本。

## 安全护栏

凭证与私密数据使用 [REDACTED_CREDENTIAL] 占位符。执行操作前需核对文档的环境与版本。

## 回滚指引

恢复变更前的技术内容权威快照、已保存配置与数据快照，再执行最小验证场景。
