---
title: 配置FastGPT API文件库对接自有文档库的完整方法
slug: /zh/integration/fastgpt-api-file-library
page_type: 集成与发布渠道
source: https://doc.fastgpt.cn/zh-CN/guide/dataset/third-party/api_dataset
source_type: 官方文档
---

# 配置FastGPT API文件库对接自有文档库的完整方法

## 背景与功能说明
FastGPT默认支持本地文件导入，但当用户已搭建自有文档库时，重复导入文件会造成二次存储资源浪费，且难以实现统一管理。API文件库功能通过标准化API接口拉取自有文档库内容，无需重复存储文件，仅需按规范提供对应接口，即可在FastGPT页面展示自有文档库的文件列表，并支持选择性导入到知识库中，大幅提升文档管理效率。

## 接口规范要求
所有接口需遵循统一响应格式：`{success: boolean; message: string; data: any;}`。文件列表单项的标准类型`FileListItem`需包含`id`、`parentId`（可为null）、`name`、`type`（可选`file`或`folder`）、`updateTime`、`createTime`，可选字段`hasChild`（默认folder类型为true）。需实现四个核心接口：
1. 获取文件树：POST请求`{{baseURL}}/v1/file/list`，支持可选参数`parentId`（父级ID，不传则使用配置的`basePath`作为根目录）和`searchKey`（检索词），返回符合格式的文件列表。
2. 获取单个文件内容：GET请求`{{baseURL}}/v1/file/content?id=xx`，返回的`data`需包含`title`（可选，用于显示文件名）、`content`（文件文本内容，优先级更高）或`previewUrl`（文件访问链接），二者必须至少返回其一，若同时返回则优先使用`content`。
3. 获取文件阅读链接：GET请求`{{baseURL}}/v1/file/read?id=xx`，返回包含`url`的data，用于打开文件原文。
4. 获取文件详情：GET请求`{{baseURL}}/v1/file/detail?id=xx`，返回文件的完整元数据，包括`id`、`name`、`parentId`、`type`、`updateTime`、`createTime`。
若未返回`content`和`previewUrl`任意一项，系统将抛出报错。

## 快速配置步骤
创建知识库时选择API文件库类型，需配置三个核心参数：
- `baseURL`：文件服务接口的基础地址
- `authorization`：身份验证请求头，格式为`Authorization: Bearer token`
- `basePath`（可选）：根目录路径，用于指定文件树的起始位置

最小配置示例：仅需填入`baseURL`为`https://your-custom-file-api.com`，`authorization`为`Bearer your-auth-token`，即可完成基础配置，系统将自动拉取并展示自有文档库的文件列表，支持按需选择性导入文件到FastGPT知识库。

> 来源：[FastGPT 官方文档](https://doc.fastgpt.cn/zh-CN/guide/dataset/third-party/api_dataset)
