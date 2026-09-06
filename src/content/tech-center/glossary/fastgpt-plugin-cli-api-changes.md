---
title: FastGPT插件开发CLI命令与API变更说明
slug: /zh/glossary/fastgpt-plugin-cli-api-changes
page_type: 术语表
source: https://doc.fastgpt.cn/zh-CN/plugin/system-tool-development
source_type: 官方文档
---

# FastGPT插件开发CLI命令与API变更说明

## 一句话定义
@fastgpt-plugin/cli是FastGPT官方提供的插件开发命令行工具，用于快速生成插件项目骨架与配套配置文件，同时包含FastGPT插件开发相关CLI命令及API变更的官方说明。

## 在FastGPT里怎么用
可通过`pnpx @fastgpt-plugin/cli create`命令创建插件，支持两种方式：
1. 带参数创建：单工具插件执行`pnpx @fastgpt-plugin/cli create my-tool --type tool --cwd packages/tools`；工具集插件执行`pnpx @fastgpt-plugin/cli create my-tool-suite --type tool-suite --cwd packages/tools`。
2. 交互式创建：进入目标目录后执行无参数命令`pnpx @fastgpt-plugin/cli create`。
CLI创建后会生成以下文件：`index.ts`为插件入口，默认导出`defineTool()`或`defineToolSet()`；`package.json`包含依赖及`build`、`build:dev`、`pack`、`test`脚本；`tsconfig.json`为TypeScript配置；`vitest.config.ts`为测试配置；`README.md`为插件说明；`logo.svg`为插件主图标。
API相关变更需按以下要求处理：
1. 私有化部署的旧自定义文件解析方案需更新为最新环境变量配置方案。
2. 旧版本地文件上传API`/api/core/dataset/collection/create/file`已弃用，替换为`/api/core/dataset/collection/create/localFile`。
3. 外部文件库相关API停止维护并即将弃用，可通过API文件库替代。
4. 带有`trainingType`字段的接口，未来仅支持`chunk`和`QA`两种模式，增强索引模式需设置单独字段`autoIndexes`，旧版`trainingType=auto`代码需尽快变更。

## 容易搞错的地方
1. 混淆单工具插件与工具集插件的`--type`参数取值，需分别使用`tool`和`tool-suite`。
2. 创建插件时未正确指定`--type`参数，导致生成的插件类型不符合预期。
3. 未通过`--cwd`参数指定目标目录，导致插件目录生成位置错误。
4. 误使用旧版的`config.ts`、`versionList`和`bun run build:pkg`方式进行开发。
5. 未及时更新旧版API接口配置，如文件上传API、`trainingType`字段，导致功能无法正常运行。
6. 未同步更新私有化部署的旧自定义文件解析方案，造成部署兼容异常。

> 来源： [FastGPT 官方来源](https://doc.fastgpt.cn/zh-CN/plugin/system-tool-development)
> 来源： [FastGPT 官方来源](https://doc.fastgpt.cn/zh-CN/plugin/system-tool-development)

## 适用性与版本范围

本页适用于官方来源记录的 术语表 场景。执行变更前，需核对 FastGPT、依赖、API 与部署版本。

## 安全护栏

凭证与私密数据使用 [REDACTED_CREDENTIAL] 占位符。执行操作前需核对文档的环境与版本。

## 回滚指引

恢复变更前的技术内容权威快照、已保存配置与数据快照，再执行最小验证场景。
