---
title: FastGPT 4.8.22 与 Milvus 环境上传 Markdown 的历史排查
slug: /zh/troubleshoot/fastgpt-upload-md-error-troubleshooting
page_type: 排错/错误码
source: https://github.com/labring/FastGPT/issues/3895
source_type: GitHub issue
---

# FastGPT 4.8.22 与 Milvus 环境上传 Markdown 的历史排查

## 适用场景与历史记录

原报告描述私有部署 4.8.22 上传 .md 文档出错，评论补充使用 Milvus。 原始讨论提交于 2025-02-26，本页按该记录说明症状或需求的适用范围。

## 已有证据与适用范围

Markdown 已在文件输入文档列为文档类型，单次上传失败需要定位上传、解析与向量化阶段。

## 排查与复测

1. 用最小 UTF-8 Markdown 文件复现，保存上传请求和错误体。
2. 分别核对解析后的文本及向量写入日志，确认失败阶段。
3. 记录 Milvus、embedding 模型和 FastGPT 版本，检查向量维度与集合配置。

这些检查用于复现和验证同类场景。继续反馈时，提供准确版本、最小输入、预期结果和脱敏日志，并引用原始讨论。

## 参考资料


> 来源: [原始讨论：不能上传、解析Markdown文档](https://github.com/labring/FastGPT/issues/3895)

> 来源: [FastGPT 文件输入与 4.8.13 行为说明](https://doc.fastgpt.io/en/guide/build/general/fileInput)

> 来源: [原讨论中的补充回复](https://github.com/labring/FastGPT/issues/3895#issuecomment-2684248766)
