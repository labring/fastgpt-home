---
title: FastGPT 导入语雀团队空间出现 404 的历史排查
slug: /zh/troubleshoot/fastgpt-yuque-team-space-404-error
page_type: 排错/错误码
source: https://github.com/labring/FastGPT/issues/5080
source_type: GitHub issue
---

# FastGPT 导入语雀团队空间出现 404 的历史排查

## 适用场景与历史记录

原报告来自公有云：导入语雀团队空间时有 token，缺少合适 uid，尝试管理员 uid 后仍返回 404。 原始讨论提交于 2025-06-23，本页按该记录说明症状或需求的适用范围。

## 已有证据与适用范围

管理员 uid 的尝试在原报告中已经失败。后续排查应记录脱敏参数、实际空间标识与授权范围。

## 排查与复测

1. 核对语雀空间、知识库和授权 token 对应的资源范围，保存脱敏标识。
2. 检查实际请求地址与 404 返回体，并对照官方语雀导入说明。
3. 用同一授权验证目标资源可读性，分别比较个人知识库和团队空间访问结果。

这些检查用于复现和验证同类场景。继续反馈时，提供准确版本、最小输入、预期结果和脱敏日志，并引用原始讨论。

## 参考资料


> 来源: [原始讨论：语雀空间token问题](https://github.com/labring/FastGPT/issues/5080)

> 来源: [FastGPT 语雀知识库配置](https://doc.fastgpt.io/en/guide/dataset/third-party/yuque_dataset)
