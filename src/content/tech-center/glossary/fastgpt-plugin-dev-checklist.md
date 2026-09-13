---
title: FastGPT系统插件的创建方法与提交前验证要求
slug: /zh/glossary/fastgpt-plugin-dev-checklist
page_type: 术语表
source: https://doc.fastgpt.cn/zh-CN/plugin/system-tool-development
source_type: 官方文档
---

# FastGPT系统插件的创建方法与提交前验证要求

## 一句话定义
FastGPT系统插件开发中，用于生成插件目录结构与提交前合规校验的标准流程。

## 在 FastGPT 里怎么用
### 插件创建
可通过CLI命令快速生成插件骨架：
- 单工具插件执行命令：
```bash
pnpx @fastgpt-plugin/cli create my-tool --type tool --cwd packages/tools
```
- 工具集插件执行命令：
```bash
pnpx @fastgpt-plugin/cli create my-tool-suite --type tool-suite --cwd packages/tools
```
也可进入目标目录后执行`pnpx @fastgpt-plugin/cli create`进行交互式创建。
创建后将生成以下标准文件：
| 文件               | 作用                                                     |
| ------------------ | -------------------------------------------------------- |
| `index.ts`         | 插件入口，默认导出 `defineTool()` 或 `defineToolSet()`。 |
| `package.json`     | 插件依赖和 `build`、`build:dev`、`pack`、`test` 脚本。   |
| `tsconfig.json`    | TypeScript 配置。                                        |
| `vitest.config.ts` | 测试配置。                                               |
| `README.md`        | 插件说明。                                               |
| `logo.svg`         | 插件主图标。                                             |

### 提交前验证
本环节提供FastGPT系统插件提交前的标准化验证清单，用于确保插件符合平台接入要求，避免上线后出现功能异常、信息泄露等问题。所有验证项均基于平台官方规范制定，覆盖代码结构、配置文件、接口处理、测试流程等多个核心环节，帮助开发者快速完成插件提交前的全面检查。
提交前需逐一确认以下内容：
- `index.ts` 默认导出正确。
- `manifest.pluginId`、`manifest.version`、中英文名称和描述完整。
- 工具集的 `children[].id` 稳定且没有重复。
- `inputSchema` 覆盖所有用户输入，并有必要的类型和范围约束。
- `outputSchema` 与 handler 返回值一致。
- `secretSchema` 覆盖全部密钥配置，敏感字段设置 `isSecret: true`。
- 外部 API 的成功、失败、空响应、超时和鉴权失败都有处理。
- 错误信息可定位问题，并且不会泄露密钥或敏感响应。
- `pnpm run test` 通过，或明确说明无法测试的原因。
- `build`、`check`、`pack` 通过。
- `dist/manifest.json` 中图标和 schema 符合预期。
- 使用远程调试完成测试环境真实调用，或明确说明本次无需远程调试的原因。
- `.pkg` 能在测试环境中安装并完成真实调用。

执行验证时需严格遵循清单中的每一项要求，对于无法通过自动测试的场景，需清晰记录无法测试的具体原因，确保后续排查有据可依。所有涉及敏感信息的处理环节，需确保错误信息不会泄露密钥或业务敏感数据，保障系统安全。完成所有验证项后，方可提交插件进行上线审核，避免因未达标导致的审核驳回。

## 容易搞错的地方
1. 未正确指定`--type`参数，导致生成的插件类型不符合预期。
2. 遗漏`manifest.pluginId`、`manifest.version`等必填配置项。
3. 未校验工具集的`children[].id`出现重复或不稳定的情况。
4. 未覆盖所有用户输入或密钥配置的schema约束。
5. 未处理外部API的异常场景，如超时、鉴权失败等。
6. 未运行`pnpm run test`或构建打包脚本就提交插件。

> 来源： [FastGPT 官方来源](https://doc.fastgpt.cn/zh-CN/plugin/system-tool-development)
> 来源： [FastGPT 官方来源](https://doc.fastgpt.cn/zh-CN/plugin/system-tool-development)

## 适用性与版本范围

本页适用于官方来源记录的 术语表 场景。执行变更前，需核对 FastGPT、依赖、API 与部署版本。

## 安全护栏

凭证与私密数据使用 [REDACTED_CREDENTIAL] 占位符。执行操作前需核对文档的环境与版本。

## 回滚指引

恢复变更前的技术内容权威快照、已保存配置与数据快照，再执行最小验证场景。
