---
title: FastGPT系统插件骨架的创建流程与生成文件说明
slug: /zh/model/fastgpt-plugin-skeleton-creation
page_type: 模型指南
source: https://doc.fastgpt.cn/zh-CN/plugin/system-tool-development
source_type: 官方文档
---

# FastGPT系统插件骨架的创建流程与生成文件说明

## 插件创建方式
FastGPT 提供官方 CLI 工具快速生成插件骨架，支持单工具插件、工具集插件两种类型的标准化创建，也支持交互式创建流程。单工具插件的创建命令为：`pnpx @fastgpt-plugin/cli create my-tool --type tool --cwd packages/tools`，其中 `my-tool` 为自定义插件名称，`--type tool` 指定插件类型为单工具，`--cwd packages/tools` 指定插件生成的目标目录。工具集插件的创建命令为：`pnpx @fastgpt-plugin/cli create my-tool-suite --type tool-suite --cwd packages/tools`，`--type tool-suite` 用于指定插件类型为工具集。进入目标目录后，执行`pnpx @fastgpt-plugin/cli create`即可通过交互式流程完成插件骨架的创建，无需手动指定参数。

## 生成的插件文件说明
CLI 工具执行完成后，会自动创建插件专属目录，并生成以下标准化文件，各文件的作用如下：

| 文件               | 作用                                                     |
| ------------------ | -------------------------------------------------------- |
| `index.ts`         | 插件入口，默认导出 `defineTool()` 或 `defineToolSet()`。 |
| `package.json`     | 插件依赖和 `build`、`build:dev`、`pack`、`test` 脚本。   |
| `tsconfig.json`    | TypeScript 配置。                                        |
| `vitest.config.ts` | 测试配置。                                               |
| `README.md`        | 插件说明。                                               |
| `logo.svg`         | 插件主图标。                                             |

## 补充说明
该 CLI 工具生成的文件均遵循 FastGPT 插件的开发规范，包含基础的依赖配置、编译脚本与测试配置，可直接用于后续的插件功能开发。

> 来源： [FastGPT 官方来源](https://doc.fastgpt.cn/zh-CN/plugin/system-tool-development)

## 适用性与版本范围

本页适用于官方来源记录的 模型指南 场景。执行变更前，需核对 FastGPT、依赖、API 与部署版本。

## 安全护栏

凭证与私密数据使用 [REDACTED_CREDENTIAL] 占位符。执行操作前需核对文档的环境与版本。

## 回滚指引

恢复变更前的技术内容权威快照、已保存配置与数据快照，再执行最小验证场景。
