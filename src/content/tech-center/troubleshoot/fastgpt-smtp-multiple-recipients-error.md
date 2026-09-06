---
title: FastGPT V4.12.2 SMTP 多收件人校验错误的历史排查
slug: /zh/troubleshoot/fastgpt-smtp-multiple-recipients-error
page_type: 排错/错误码
source: https://github.com/labring/FastGPT/issues/5567
source_type: GitHub issue
---

# FastGPT V4.12.2 SMTP 多收件人校验错误的历史排查

## 适用场景与历史记录

原报告在私有部署 V4.12.2 的 SMTP 插件设置多个收件人时出现 to: invalid email，评论者提到升级后的差异。 原始讨论提交于 2025-09-01，本页按该记录说明症状或需求的适用范围。

## 已有证据与适用范围

逗号分隔地址与 z.string().email() 的关系是报告者提出的原因假设，线程没有维护者确认。单收件人测试可帮助定位输入校验范围。

## 排查与复测

1. 记录已安装 SMTP 工具的版本及收件人字段要求，保留错误文本。
2. 使用自己的测试邮箱比较单收件人与文档支持的多收件人写法。
3. 核对失败发生于参数校验还是 SMTP 服务，回归时记录实际收件人与投递结果。

这些检查用于复现和验证同类场景。继续反馈时，提供准确版本、最小输入、预期结果和脱敏日志，并引用原始讨论。

## 参考资料


> 来源: [原始讨论：SMTP邮件插件 发送多个收件人报错](https://github.com/labring/FastGPT/issues/5567)
