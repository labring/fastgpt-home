---
title: FastGPT 知识库上传文件保存在哪里：存储层核对
slug: /zh/troubleshoot/fastgpt-knowledge-file-storage-location
page_type: 排错/错误码
source: https://github.com/labring/FastGPT/issues/4785
source_type: GitHub issue
---

# FastGPT 知识库上传文件保存在哪里：存储层核对

## 适用场景与历史记录

原议题询问本地上传的知识文件保存于部署环境还是硅基流动模型端。 原始讨论提交于 2025-05-12，本页按该记录说明症状或需求的适用范围。

## 已有证据与适用范围

线程有社区回复指出当时的 MongoDB 与 PG。当前官方文档还包含对象存储配置；原始文件存储、向量存储、模型推理传输应分别说明。

## 排查与复测

1. 记录版本和部署配置，核对文件所用的对象存储桶或旧版 MongoDB 文件存储。
2. 在授权范围内依据测试文件的 ID、对象键或下载链接追踪原始文件。
3. 另行核对 embedding 与对话调用的出站请求，确认哪些文本被发送到模型服务。

这些检查用于复现和验证同类场景。继续反馈时，提供准确版本、最小输入、预期结果和脱敏日志，并引用原始讨论。

## 参考资料


> 来源: [原始讨论：硅基流动模型配置知识库测试](https://github.com/labring/FastGPT/issues/4785)

> 来源: [FastGPT 对象存储配置](https://doc.fastgpt.io/en/self-host/config/object-storage)

> 来源: [原讨论中的补充回复](https://github.com/labring/FastGPT/issues/4785#issuecomment-2878847298)
