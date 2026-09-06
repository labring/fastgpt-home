---
title: FastGPT系统插件构建流程相关具体使用规范说明
slug: /zh/glossary/fastgpt-plugin-build-guide
page_type: 术语表
source: https://doc.fastgpt.cn/zh-CN/plugin/system-tool-development
source_type: 官方文档
---

# FastGPT系统插件构建流程相关具体使用规范说明

## 一句话定义
FastGPT插件构建是将插件代码打包为统一.pkg格式，包含元信息、输入输出schema、密钥schema和图标资源，供FastGPT页面、工作流和Agent调用的开发流程。

## 在 FastGPT 里怎么用（参数 / 位置 / 步骤）
需满足推荐开发环境：Node.js版本符合目标插件仓库要求，使用pnpm作为包管理器，需安装Git和GitHub CLI gh。开发社区插件时，先执行`gh repo fork labring/fastgpt-community-plugins --clone`克隆仓库，进入目录后执行`pnpm install`安装依赖。在fastgpt-plugin仓库内调试CLI或SDK时，先执行`pnpm install`，再依次执行`pnpm build:sdk-factory`和`pnpm build:cli`完成构建。插件运行时由服务端统一管理，默认运行时为local-pool，每个插件版本拥有独立进程池、队列和运行时配置。

## 容易搞错的地方
易误用旧版开发工具，当前不再以`config.ts`、`versionList`和`bun run build:pkg`作为主要开发方式，需改用`@fastgpt-plugin/cli`和`@fastgpt-plugin/sdk-factory`。误以为插件为内置部署，实际FastGPT与插件采用外置扩展的微服务架构。

> 来源： [FastGPT 官方来源](https://doc.fastgpt.cn/zh-CN/plugin/system-tool-development)

## 适用性与版本范围

本页适用于官方来源记录的 术语表 场景。执行变更前，需核对 FastGPT、依赖、API 与部署版本。

## 安全护栏

凭证与私密数据使用 [REDACTED_CREDENTIAL] 占位符。执行操作前需核对文档的环境与版本。

## 回滚指引

恢复变更前的技术内容权威快照、已保存配置与数据快照，再执行最小验证场景。
