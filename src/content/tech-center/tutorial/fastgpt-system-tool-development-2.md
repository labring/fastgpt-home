---
title: FastGPT系统工具插件的开发配置与使用方法
slug: /zh/tutorial/fastgpt-system-tool-development-2
page_type: 教程/部署
source: https://doc.fastgpt.cn/zh-CN/plugin/system-tool-development
source_type: 官方文档
---

# FastGPT系统工具插件的开发配置与使用方法

### 插件基本概述
FastGPT v4.15.0及以上版本支持系统工具插件开发，插件分为单工具（使用`defineTool()`声明）和工具集（使用`defineToolSet()`声明）两种类型，最终以`.pkg`文件交付。插件运行在FastGPT Plugin服务提供的运行时中，当前默认运行时为`local-pool`，每个插件版本拥有独立进程池、队列和运行时配置。FastGPT主服务通过插件服务调用工具，插件代码通过`@fastgpt-plugin/sdk-factory`描述输入、输出、密钥配置和执行逻辑。相比旧版机制，新版采用统一`.pkg`格式，支持插件的安装、版本管理、热更新等能力，整体采用外置扩展的微服务架构。

### 开发前置准备
开发前需明确多项核心信息：包括插件类型（"tool"或"tool-suite"）、全局唯一且发布后保持不变的`pluginId`，工具集还需配置发布后不变的子工具ID；中英文名称与描述、输入输出字段的类型与约束、默认值、UI标题和说明，密钥配置（如API Key、Base URL、账号密码等），外部API请求规则，以及至少包含成功路径、参数错误、鉴权失败、上游失败的测试样例。涉及插件ID、鉴权方式等安全性相关信息需提前确认，其余内容可使用合理默认值推进，并在提交说明中记录假设。

### 快速开发步骤
1. 准备开发环境：需安装符合要求的Node.js、pnpm、Git，若开发社区插件可通过`gh repo fork labring/fastgpt-community-plugins --clone`克隆仓库并执行`pnpm install`安装依赖；若在fastgpt-plugin仓库内调试，需先执行`pnpm install`、`pnpm build:sdk-factory`、`pnpm build:cli`构建CLI和SDK。
2. 创建插件骨架：单工具插件执行`pnpx @fastgpt-plugin/cli create my-tool --type tool --cwd packages/tools`，工具集插件替换`--type`参数为"tool-suite"，命令将自动生成包含`index.ts`、`package.json`、`tsconfig.json`等文件的插件目录。
3. 实现插件逻辑：单工具插件需在`index.ts`中默认导出SDK factory实例，可通过`zod`定义`secretSchema`、输入输出schema，例如使用`z.object({ apiKey: z.string().min(1).meta({ title: "API Key", isSecret: true }) })`配置密钥信息。

> 来源：https://doc.fastgpt.cn/zh-CN/plugin/system-tool-development
