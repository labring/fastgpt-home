---
title: FastGPT系统工具插件的开发与交付方法说明
slug: /zh/model/fastgpt-system-tool-plugin-dev
page_type: 模型指南
source: https://doc.fastgpt.cn/zh-CN/plugin/system-tool-development
source_type: 官方文档
---

# FastGPT系统工具插件的开发与交付方法说明

## 适用范围与插件概述
本文面向FastGPT v4.15.0之后的系统工具开发。新版FastGPT Plugin服务将系统工具、模型预设等能力统一抽象为可安装、可更新、可运行隔离的插件包，这类插件的最终交付格式为.pkg文件，需交付给FastGPT Plugin服务完成部署与运行。该抽象方式实现了插件与主服务的解耦，同时支持插件的独立安装与更新，保障了运行环境的隔离性。

## 支持的插件类型说明
当前稳定支持的系统工具插件类型有两种。第一种为单工具插件，一个插件仅暴露一个工具，开发时需使用`defineTool()`完成声明。第二种为工具集插件，一个插件可暴露多个相关联的子工具，开发时需使用`defineToolSet()`完成声明。两类插件分别适配不同的业务场景，单工具插件适合单一功能的工具开发，工具集插件适合整合多个相关功能的工具集合开发。

## 开发与运行规范
系统工具插件需运行在FastGPT Plugin服务提供的专属运行时环境中，无法脱离该运行时独立运行。FastGPT主服务通过插件服务完成对系统工具插件的调用，实现主服务与插件功能的联动。插件代码需通过`@fastgpt-plugin/sdk-factory`来完成输入参数、输出结果、密钥配置以及执行逻辑的描述，确保插件的功能符合FastGPT Plugin服务的调用规范。开发流程需遵循先确定插件类型并完成对应声明，再通过指定SDK完成相关配置与逻辑编写，最终将开发完成的插件打包为.pkg文件交付至FastGPT Plugin服务的步骤。

> 来源： [FastGPT 官方来源](https://doc.fastgpt.cn/zh-CN/plugin/system-tool-development)

## 安全护栏

凭证与私密数据使用 [REDACTED_CREDENTIAL] 占位符。执行操作前需核对文档的环境与版本。

## 回滚指引

恢复变更前的技术内容权威快照、已保存配置与数据快照，再执行最小验证场景。
