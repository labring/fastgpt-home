---
title: 获取FastGPT第三方API数据集的单个文件内容
slug: /zh/reference/fastgpt-api-get-file-content
page_type: 技术速查
source: https://doc.fastgpt.cn/guide/dataset/third-party/api_dataset
source_type: 官方文档小节
---

# 获取FastGPT第三方API数据集的单个文件内容

## 结论
该接口用于获取FastGPT第三方API数据集的单个文件内容，可返回文件文本或访问链接。调用时需携带正确的认证信息与文件ID参数。

## 具体怎么做
1. 构造GET请求，请求地址格式为`{{baseURL}}/v1/file/content?id=xx`，其中`{{baseURL}}`为接口基础地址，`xx`替换为目标文件的ID。
2. 在请求头中添加`Authorization: Bearer {{authorization}}`，`{{authorization}}`替换为有效的认证令牌。
3. 接收并解析响应结果，响应包含`success`、`message`、`data`三个顶层字段，`data`内包含目标文件的相关信息。

## 注意事项
1. `content`与`previewUrl`需二选一返回，至少返回其中一个，否则接口将报错。
2. 若同时返回`content`和`previewUrl`，`content`优先级更高，系统将直接使用`content`的内容进行索引和检索。
3. `title`为可选字段，未提供时系统会尝试从`previewUrl`中解析文件名。
4. 当返回`previewUrl`时，系统会自动访问该链接下载文件并提取内容，同时缓存解析结果以提升性能。

> 来源：[FastGPT 官方文档](https://doc.fastgpt.cn/guide/dataset/third-party/api_dataset)
