---
title: 使用FastGPT第三方API获取指定文件的详情信息
slug: /zh/reference/fastgpt-third-party-api-file-detail
page_type: 技术速查
source: https://doc.fastgpt.cn/guide/dataset/third-party/api_dataset
source_type: 官方文档小节
---

# 使用FastGPT第三方API获取指定文件的详情信息

## 结论
本页介绍FastGPT第三方API获取文件详情的标准调用方式。通过该接口可获取指定文件的ID、名称、父级目录等基础信息。

## 具体怎么做
1. 构造GET请求：
   请求地址：`{{baseURL}}/v1/file/detail?id=xx`，其中`xx`替换为目标文件ID
   请求头：`Authorization: Bearer {{authorization}}`，其中`{{authorization}}`替换为有效访问令牌
   完整curl请求示例：
   ```bash
   curl --location --request GET '{{baseURL}}/v1/file/detail?id=xx' \
   --header 'Authorization: Bearer {{authorization}}'
   ```
2. 响应字段说明：
   - 顶层响应字段：
     | 字段 | 说明 |
     |------|------|
     | success | 请求是否成功，布尔值 |
     | message | 错误提示信息，请求成功时为空 |
     | data | 包含文件详情的对象 |
   - data对象内字段：
     | 字段 | 说明 |
     |------|------|
     | id | 文件ID |
     | name | 文件名称 |
     | parentId | 父级ID，null表示根目录 |
     | type | 文件类型，可选file或folder |
     | updateTime | 更新时间，格式为ISO 8601 |
     | createTime | 创建时间，格式为ISO 8601 |

## 注意事项
1. 需传入有效的文件ID，无效ID将触发接口失败响应。
2. 请求头中的Authorization令牌需为有效凭证，否则会触发鉴权失败。
3. parentId字段为null时，表示文件位于根目录。
4. type字段仅支持file或folder两种取值。
5. 响应中的时间字段均为ISO 8601格式的字符串。
6. 响应中success字段为true时表示请求成功，message字段为空表示无错误信息。

> 来源：[FastGPT 官方文档](https://doc.fastgpt.cn/guide/dataset/third-party/api_dataset)
