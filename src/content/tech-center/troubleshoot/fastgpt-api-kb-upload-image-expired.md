---
title: FastGPT 4.9.13 API 导入图片过期：4.9.14 升级建议与验证
slug: /zh/troubleshoot/fastgpt-api-kb-upload-image-expired
page_type: 排错/错误码
source: https://github.com/labring/FastGPT/issues/5105
source_type: GitHub issue
---

# FastGPT 4.9.13 API 导入图片过期：4.9.14 升级建议与验证

## 适用场景与历史记录

原报告来自 4.9.13 私有部署：API 导入文档的图片带一小时过期字段，而界面上传的同类图片表现不同。 原始讨论提交于 2025-06-27，本页按该记录说明症状或需求的适用范围。

## 已有证据与适用范围

维护者明确建议升级至 4.9.14。升级效果需要通过原始文档和图片访问结果复测确认。

## 排查与复测

1. 保存一个可复现的小文档和 API 请求，记录原始图片链接及过期时间。
2. 按官方升级流程在测试环境升级至 4.9.14 或选择当前受支持版本，并核对所跨版本的迁移要求。
3. 分别通过 API 和界面导入同一文档，立即及超过原一小时窗口后访问图片，比较结果。

这些检查用于复现和验证同类场景。继续反馈时，提供准确版本、最小输入、预期结果和脱敏日志，并引用原始讨论。

## 参考资料


> 来源: [原始讨论：有个bug  通过调用开放API创建知识库上传文档中的图片会过期，在页面上传的文档中图片不会](https://github.com/labring/FastGPT/issues/5105)

> 来源: [原讨论中的补充回复](https://github.com/labring/FastGPT/issues/5105#issuecomment-3034190328)
