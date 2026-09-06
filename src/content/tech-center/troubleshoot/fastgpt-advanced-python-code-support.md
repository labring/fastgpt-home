---
title: FastGPT高级编排Python代码调用支持的排错指南
slug: /zh/troubleshoot/fastgpt-advanced-python-code-support
page_type: 故障排查
source: https://github.com/labring/FastGPT/issues/552
source_type: GitHub issue
---

# FastGPT高级编排Python代码调用支持的排错指南

## 现象
使用FastGPT高级编排工具时，仅能选择HTTP类型的调用方式，无法直接编写并运行Python代码完成工具调用，无法满足灵活的自定义代码执行需求，无法适配需要动态逻辑处理的业务场景。

## 可能原因
需按实际环境确认，当前高级编排的工具集成范围未覆盖Python代码执行的相关配置与运行能力，未提供对应的工具类型选项。

## 排查步骤
1.  登录FastGPT平台，进入高级编排的工具配置页面，查看已支持的工具类型列表
2.  对比现有工具的调用参数格式，确认是否存在可配置Python代码的相关选项
3.  查阅当前FastGPT版本的官方更新日志，确认是否已集成Python代码调用的功能
4.  核对当前使用的FastGPT版本号，确认是否为最新正式版本

## 解决与验证
若需使用Python代码调用能力，可等待官方的功能更新，或通过官方渠道提交功能需求申请。验证时，在高级编排中创建对应类型的工具，编写测试Python代码并完成配置，执行编排流程确认调用正常。若官方已更新该功能，可按照官方文档完成配置并测试。

> 来源： [FastGPT 官方来源](https://github.com/labring/FastGPT/issues/552)

## 适用性与版本范围

本页适用于官方来源记录的 故障排查 场景。执行变更前，需核对 FastGPT、依赖、API 与部署版本。

## 安全护栏

凭证与私密数据使用 [REDACTED_CREDENTIAL] 占位符。执行操作前需核对文档的环境与版本。

## 回滚指引

恢复变更前的技术内容权威快照、已保存配置与数据快照，再执行最小验证场景。
