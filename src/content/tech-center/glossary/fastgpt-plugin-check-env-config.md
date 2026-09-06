---
title: FastGPT插件开发check验证与部署环境变量配置指南
slug: /zh/glossary/fastgpt-plugin-check-env-config
page_type: 术语表
source: https://doc.fastgpt.cn/zh-CN/plugin/system-tool-development
source_type: 官方文档
---

# FastGPT插件开发check验证与部署环境变量配置指南

## 一句话定义
FastGPT插件开发check验证与部署环境变量配置是系统开发与部署的必要环节。

## 在 FastGPT 里怎么用
插件开发check验证环节：开发完成后需完成多项必填检查，包括确认index.ts默认导出正确，manifest.pluginId、version、中英文名称和描述完整，工具集children[].id稳定无重复，inputSchema覆盖所有用户输入并添加类型与范围约束，outputSchema与handler返回值一致，secretSchema覆盖全部密钥配置并标记敏感字段isSecret: true，处理外部API的成功、失败、空响应、超时和鉴权失败场景，错误信息可定位问题且不泄露密钥或敏感响应，执行pnpm run test通过，确保build、check、pack命令执行通过，检查dist/manifest.json中图标和schema符合预期，完成远程调试测试环境真实调用，确认.pkg能在测试环境安装并完成真实调用。部署环境变量配置：可配置STREAM_RESUME_TTL_SECONDS、STREAM_RESUME_POST_COMPLETE_TTL_SECONDS等变量，各变量均有默认值，其中WORKFLOW_PARALLEL_MAX_CONCURRENCY的最大并发数上限不能超过WORKFLOW_MAX_LOOP_TIMES变量。

## 容易搞错的地方
插件开发时易遗漏manifest字段完整性、工具集children.id重复、未正确配置secretSchema的isSecret属性，未处理外部API的异常场景，未通过pnpm run test或build/check/pass命令。部署时易忽略WORKFLOW_PARALLEL_MAX_CONCURRENCY与WORKFLOW_MAX_LOOP_TIMES的数值约束，错误修改环境变量未遵循默认值规则。

> 来源： [FastGPT 官方来源](https://doc.fastgpt.cn/zh-CN/plugin/system-tool-development)

## 适用性与版本范围

本页适用于官方来源记录的 术语表 场景。执行变更前，需核对 FastGPT、依赖、API 与部署版本。

## 安全护栏

凭证与私密数据使用 [REDACTED_CREDENTIAL] 占位符。执行操作前需核对文档的环境与版本。

## 回滚指引

恢复变更前的技术内容权威快照、已保存配置与数据快照，再执行最小验证场景。
