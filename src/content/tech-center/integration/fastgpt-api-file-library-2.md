---
title: 使用FastGPT API文件库对接自建文档库
slug: /zh/integration/fastgpt-api-file-library-2
page_type: 集成与发布渠道
source: https://doc.fastgpt.cn/zh-CN/guide/dataset/third-party/api_dataset
source_type: 官方文档
---

# 使用FastGPT API文件库对接自建文档库

## 功能概述
FastGPT 支持本地文件导入，但直接重复导入自有文档库会产生二次存储且难以统一管理。API 文件库功能可通过标准 API 接口拉取自有文档库，无需重复存储文件，只需按照规范提供接口并配置相关参数，即可在 FastGPT 页面查看文件列表并选择性导入。

## 配置步骤
创建知识库时，选择「API 文件库」类型，需配置三个关键参数：
1.  `baseURL`：文件服务接口的基础地址
2.  `authorization`：身份验证请求头，实际请求格式为 `Authorization: Bearer token`
3.  `basePath`（可选）：根目录路径，用于指定文件树的起始位置
配置完成后，系统将自动向接口发起请求并拉取文件列表，请求会携带配置的 `authorization` 头信息，用户可在页面中查看完整文件列表，并按需选择文件导入到知识库。

## 接口规范与注意事项
所有对外接口需遵循统一响应格式：`{ success: boolean; message: string; data: any }`。文件列表单项需包含 `id`、`parentId`、`name`、`type`、`updateTime`、`createTime` 等字段，其中 `type` 可选 `file` 或 `folder`，`hasChild` 为可选字段，默认文件夹类型为 `true`。
获取单个文件内容时，`content`（文件完整文本内容）和 `previewUrl`（可访问的文件链接）必须二选一返回，若同时返回则 `content` 优先级更高；若未返回任一内容，系统将直接报错。此外，获取文件树、文件阅读链接、文件详情等接口需遵循对应请求格式与参数要求，不符合规范的接口将无法正常拉取文件数据。

> 来源：[FastGPT 官方文档](https://doc.fastgpt.cn/zh-CN/guide/dataset/third-party/api_dataset)
