---
title: FastGPT系统工具插件的开发流程与配置说明
slug: /zh/tutorial/fastgpt-system-tool-development
page_type: 教程/部署
source: https://doc.fastgpt.cn/zh-CN/plugin/system-tool-development
source_type: 官方文档
---

# FastGPT系统工具插件的开发流程与配置说明

## 插件基础说明
本文面向FastGPT v4.15.0及以上版本的系统工具开发，新版插件系统将系统工具、模型预设统一抽象为可安装更新的.pkg格式插件包，支持单工具和工具集两种类型：单工具使用`defineTool()`声明，一个插件仅暴露一个工具；工具集使用`defineToolSet()`声明，可暴露多个相关子工具。插件运行在FastGPT Plugin服务的隔离运行时中，主服务通过插件服务调用工具，插件代码通过`@fastgpt-plugin/sdk-factory`定义输入输出、密钥配置与执行逻辑。

## 开发前置准备
开始开发前需明确以下核心信息：插件类型（`tool`或`tool-suite`）、全局唯一的插件ID、工具集需配置固定的子工具ID、中英文名称与描述、输入输出字段的类型约束与UI说明、密钥配置（如API Key、Base URL）、外部API调用规则与测试样例。开发环境需准备Node.js、pnpm、Git与GitHub CLI，开发社区插件时可通过`gh repo fork labring/fastgpt-community-plugins --clone`克隆仓库并执行`pnpm install`安装依赖。

## 快速开发步骤
1.  创建插件骨架：单工具插件执行`pnpx @fastgpt-plugin/cli create my-tool --type tool --cwd packages/tools`，工具集插件替换`--type`为`tool-suite`即可。生成的目录包含入口文件`index.ts`、依赖配置`package.json`等基础文件。
2.  实现插件逻辑：单工具插件需在`index.ts`中默认导出SDK实例，示例代码需导入`createToolHandler`、`defineTool`与zod库，定义密钥schema（如`z.object({ apiKey: z.string().min(1).meta({ title: "API Key", isSecret: true }) })`）、输入输出schema，最后编写执行逻辑，支持通过`ctx.invoke.uploadFile()`处理文件上传、`ctx.streamResponse()`实现流式输出。
3.  验证与打包：执行`pnpm test`完成测试，`pnpm build`构建产物，`pnpm pack`生成最终的.pkg插件包。

> 来源：https://doc.fastgpt.cn/zh-CN/plugin/system-tool-development
