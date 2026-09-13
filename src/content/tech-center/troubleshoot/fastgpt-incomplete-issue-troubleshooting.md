---
title: FastGPT 不完整issue提交问题排查指南
slug: /zh/troubleshoot/fastgpt-incomplete-issue-troubleshooting
page_type: 故障排查
source: https://github.com/labring/FastGPT/issues/2738
source_type: GitHub issue
---

# FastGPT 不完整issue提交问题排查指南

## 现象
提交的FastGPT相关issue仅完成例行检查的最后一项勾选，未填写问题描述、日志截图、复现步骤、预期结果及相关截图等有效内容，未完成其余例行检查项的确认。

## 可能原因
未按照例行检查要求完成所有勾选确认；未仔细查看项目README及官方文档；未确认API key的可用性；未提前准备问题相关的必要信息；对issue提交规范不了解。

## 排查步骤
1. 检查issue是否完成所有例行检查项的勾选确认。
2. 确认是否已查看项目README及官方文档。
3. 检查issue中是否填写问题描述、复现步骤、相关截图或日志等内容。
4. 确认是否已准备对应FastGPT版本信息。
5. 确认是否已确认API key的可用性。
6. 确认是否愿意跟进issue协助测试与反馈。

## 解决与验证
按照例行检查要求完成所有勾选确认，补充issue中缺失的问题描述、复现步骤、相关截图或日志、版本信息等内容。确认API key的可用性并补充说明。提交补充后的issue，确保维护者可获取足够信息进行问题定位。验证标准为issue得到有效跟进，问题得到定位与解决。

> 来源： [FastGPT 官方来源](https://github.com/labring/FastGPT/issues/2738)

## 适用性与版本范围

本页适用于官方来源记录的 故障排查 场景。执行变更前，需核对 FastGPT、依赖、API 与部署版本。

## 安全护栏

凭证与私密数据使用 [REDACTED_CREDENTIAL] 占位符。执行操作前需核对文档的环境与版本。

## 回滚指引

恢复变更前的技术内容权威快照、已保存配置与数据快照，再执行最小验证场景。
