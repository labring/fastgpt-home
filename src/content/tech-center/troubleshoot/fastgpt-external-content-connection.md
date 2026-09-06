---
title: FastGPT 对接外部知识内容：Notion 历史需求与 API 文件库
slug: /zh/troubleshoot/fastgpt-external-content-connection
page_type: 排错/错误码
source: https://github.com/labring/FastGPT/issues/578
source_type: GitHub issue
---

# FastGPT 对接外部知识内容：Notion 历史需求与 API 文件库

FastGPT 可通过 API 文件库接入已有文档服务。Notion 直接导入的历史需求需要单独核对连接器支持范围；已有系统也可按官方文件接口规范提供适配服务。

## 历史范围与现有入口

[Issue #578](https://github.com/labring/FastGPT/issues/578) 于 2023 年 12 月提出直接导入 Notion 内容，维护者当时将其列为未来考虑项。当前[API 文件库文档](https://doc.fastgpt.cn/zh-CN/guide/dataset/third-party/api_dataset) 提供了外部文件服务的接入协议。Notion 侧的数据获取和权限映射需要由适配服务实现。

## 接入步骤

1. 明确需要同步的页面范围、更新方式和访问权限，用一篇测试文档确认外部服务能返回完整文本。
2. 按 API 文件库规范提供文件树 `POST /v1/file/list`、文件内容 `GET /v1/file/content` 和原文阅读链接 `GET /v1/file/read`。内容响应至少提供 `content` 或 `previewUrl` 中的一项。
3. 创建“API 文件库”类型的知识库，填写文件服务 `baseURL`、鉴权信息和可选 `basePath`，确认目录树能正常加载。
4. 选择测试文件导入，检查解析和训练状态，再用该文档中的明确事实做检索测试。生产接入前，用权限不同的测试账号复核可见文档范围。

## 验证结果

依次核对目录、正文、原文链接及检索命中。目录加载失败时查看适配接口响应与鉴权；正文缺失时检查文件内容返回格式；同步更新能力应按实际连接器与部署版本验证。
