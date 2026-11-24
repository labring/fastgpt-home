---
title: 实现FastGPT单系统工具的开发配置与规范说明
slug: /zh/tutorial/fastgpt-single-tool-development
page_type: 教程/部署
source: https://doc.fastgpt.cn/plugin/system-tool-development
source_type: 官方文档小节
---

# 实现FastGPT单系统工具的开发配置与规范说明

# 单系统工具的基础结构要求
FastGPT单系统工具的入口文件必须默认导出SDK factory实例，需先导入`@fastgpt-plugin/sdk-factory`提供的`createToolHandler`、`defineTool`及对应类型，同时使用zod库定义各类校验schema。工具的核心逻辑通过`createToolHandler`创建处理函数，最终通过`defineTool`包裹后作为默认导出。

# 可直接参照的配置步骤
你可以按照以下步骤完成单系统工具的配置：
1.  导入依赖：引入`@fastgpt-plugin/sdk-factory`的工具函数与类型，以及zod库用于schema定义。
2.  定义敏感密钥schema：使用`z.object`定义包含敏感信息的校验规则，例如示例中的`apiKey`字段，通过`.meta`补充元数据，并设置`isSecret: true`标记为敏感字段。
3.  创建工具处理函数：调用`createToolHandler`，配置输入、输出、密钥schema，以及异步处理逻辑，处理函数接收输入参数与上下文对象，返回匹配输出schema的结果。
4.  配置工具清单信息：通过`defineTool`配置`manifest`，包括唯一标识`pluginId`、版本号、多语言格式的名称、描述、版本说明与标签。
5.  导出工具实例：将创建的处理函数通过`defineTool`包裹后作为默认导出。

示例的基础代码结构如下：
```js
import { createToolHandler, defineTool, type InputSchemaMetaType, type OutputSchemaMetaType, type SecretSchemaMetaType } from '@fastgpt-plugin/sdk-factory';
import z from 'zod';
// 后续定义与导出逻辑
```

# 开发核心规则
需严格遵循以下规则：pluginId、子工具id、输入字段名、输出字段名发布后需保持稳定；manifest的名称、描述与版本说明需使用包含`en`和`zh-CN`的多语言格式；输入、输出与密钥均需通过zod schema描述；输入字段需补充`InputSchemaMetaType`元数据，输出字段需补充`OutputSchemaMetaType`元数据；密钥字段需补充`SecretSchemaMetaType`元数据，敏感字段设置`isSecret: true`；handler的返回值必须匹配配置的outputSchema；调用外部API产生的错误需转换为可定位的错误信息，且不得泄露密钥、令牌与完整敏感响应；调用宿主文件上传能力时，需使用`ctx.invoke.uploadFile()`，并优先处理返回的错误信息；展示进度时需使用`ctx.streamResponse()`。

> 来源：[FastGPT 官方文档](https://doc.fastgpt.cn/plugin/system-tool-development)
