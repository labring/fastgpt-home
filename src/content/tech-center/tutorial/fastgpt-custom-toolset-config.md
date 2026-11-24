---
title: 详细介绍FastGPT自定义系统工具集的开发配置方法
slug: /zh/tutorial/fastgpt-custom-toolset-config
page_type: 教程/部署
source: https://doc.fastgpt.cn/plugin/system-tool-development
source_type: 官方文档小节
---

# 详细介绍FastGPT自定义系统工具集的开发配置方法

## 工具集开发核心逻辑
FastGPT 的系统工具集通过 `defineToolSet()` 函数实现，将共用的配置信息放在顶层，包括 manifest 和 secretSchema，每个独立的子工具在 children 数组中声明，包含唯一 id、名称、描述和处理函数。共用配置可以被所有子工具复用，避免重复编写相同的配置代码。

## 可直接参考的配置步骤
1.  导入必要依赖：从 `@fastgpt-plugin/sdk-factory` 导入 `createToolHandler`、`defineToolSet` 以及相关类型，同时导入 zod 用于 schema 校验。
2.  定义共用敏感配置：创建 `secretSchema`，示例中配置了 `apiKey` 字段，设置标题为 "API Key"，并通过 `isSecret: true` 标记为敏感信息。
3.  创建子工具处理函数：使用 `createToolHandler` 分别创建每个子工具的处理逻辑。比如搜索工具的输入 schema 包含 `query` 字段，标题为 "Query"，处理函数返回包含输入 query 的数组；总结工具的输入 schema 包含 `content` 字段，标题为 "Content"，处理函数返回截取前 100 字符的摘要内容。两个工具都复用了之前定义的 `secretSchema`。
4.  导出最终工具集配置：调用 `defineToolSet` 传入配置，包括插件的 manifest 信息（包含唯一 `pluginId`、版本号 `version`、多语言名称和描述）、子工具数组和共用的 `secretSchema`。

## 关键配置项说明
`manifest` 中的 `pluginId` 为插件的唯一标识，`version` 为版本号，`name` 和 `description` 支持多语言配置，适配不同语言的展示需求。每个子工具的 `id` 为唯一标识，不能重复，`name` 和 `description` 同样支持多语言，`toolDescription` 用于补充说明工具的具体功能。输入和输出 schema 通过 zod 定义，并使用 `meta` 方法配置字段的标题信息，`secretSchema` 中标记 `isSecret: true` 的字段会被视为敏感信息，不会在前端明文展示。

> 来源：[FastGPT 官方文档](https://doc.fastgpt.cn/plugin/system-tool-development)
