---
title: FastGPT V4.14.8版本升级操作与环境变量说明
slug: /zh/deploy/fastgpt-v4148-upgrade-environment
page_type: 部署场景
source: https://doc.fastgpt.cn/zh-CN/self-host/upgrading/4-14/4148
source_type: 官方文档
---

# FastGPT V4.14.8版本升级操作与环境变量说明

## 版本核心变更概述
FastGPT V4.14.8版本包含多项核心更新，首先是环境变量配置的调整，同时提供了镜像更新指引。该版本升级了Next.js版本至16，本地开发使用rspacak后性能提升3~5倍；重构了代码沙盒模块，统一了隔离方案，新增支持网络请求与内置依赖包。优化内容包括兼容MCP中JSON Schema type不在枚举类型内的场景，以及修改知识库搜索的变量引用文案为更直观的描述。修复了多个已知问题，包括连续调用同一MCP服务时多次连接导致的报错、文本与工具同时输出时保存后顺序异常、变量更新逻辑中$1被替换为捕获组的处理，以及API知识库返回值新增传入文件title的返回逻辑（无title则不返回）。

## 升级与配置操作步骤
1.  **环境变量配置**：fastgpt-sandbox支持配置安全凭证，可添加环境变量`SANDBOX_TOKEN`；若配置该变量，需同步在fastgpt与fastgpt-pro服务中添加同名环境变量。
2.  **镜像更新**：将FastGPT官方镜像的tag更新为`v4.14.8`，商业版镜像同样使用`v4.14.8`作为tag；fastgpt-plugin、mcp_server、AIProxy无需更新；sandbox镜像的tag需更新为`v4.14.8`。

## 易错点与使用边界
升级过程中需严格按照指引更新指定镜像，避免随意更新无需升级的组件。`SANDBOX_TOKEN`为可选配置，但一旦配置则必须在所有关联服务中同步添加该变量。本次修复的问题仅针对升级到V4.14.8版本后的场景，若未遇到对应报错或场景，无需强制升级。此外，本地开发环境需使用rspacak替代原有的开发工具，以获得性能提升。

> 来源：https://doc.fastgpt.cn/zh-CN/self-host/upgrading/4-14/4148
