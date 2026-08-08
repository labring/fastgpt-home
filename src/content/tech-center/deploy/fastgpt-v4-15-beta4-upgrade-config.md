---
title: FastGPT V4.15.0-beta4版本升级与配置操作说明
slug: /zh/deploy/fastgpt-v4-15-beta4-upgrade-config
page_type: 部署场景
source: https://doc.fastgpt.cn/zh-CN/self-host/upgrading/4-15/41504
source_type: 官方文档
---

# FastGPT V4.15.0-beta4版本升级与配置操作说明

## 版本核心变更概述
本版本为重要更新，插件服务更新至v1.0.0-beta1版本，系统工具运行方式有较大调整，需按照以下步骤完成升级配置。

## 升级操作步骤
1.  **修改环境变量**：将`fastgpt-plugin`的`AUTH_TOKEN`修改为32位以上的字符串；将`fastgpt`的`PLUGIN_TOKEN`设置为与`fastgpt-plugin`的`AUTH_TOKEN`一致的值。同时修改`fastgpt-plugin`的`MONGODB_URI`中的数据库名，确保不与`fastgpt`的Mongo数据库名重名，示例为`mongodb://myusername:mypassword@fastgpt-mongo:27017/fastgpt-plugin?authSource=admin`。
2.  **镜像变更**：更新对应服务的镜像tag：`fastgpt-app`（主服务）、`fastgpt-pro`（商业版）为`v4.15.0-beta4`；`fastgpt-plugin`为`v1.0.0-beta2`；`aiproxy`为`v0.6.1`。
3.  **重装系统工具**：下载所有系统工具的zip包，进入FastGPT网页的管理员导航栏，点击「添加插件」-「导入/更新插件」，上传zip包并确认即可重装原有系统工具。也可通过插件市场逐个下载，正式版发布前插件市场地址为`https://v2.marketplace.fastgpt.cn`。

## 新增与优化内容
本次更新重写了插件系统架构与chatbox UI，为应用/知识库增加虚拟列表渲染，新增单独的openapi文档以区分devapi文档，导出工作流模板时可同时包含名称与介绍，HTML输出支持自动切换预览。优化方面包括将系统工具运行迁移至`local-pool`，支持进程池、队列、超时、重试退避与运行指标；支持插件级runtime config；插件运行入口支持从对象存储拉取并缓存到本地目录；增加输入引导配置校验以避免错误配置自定义词库地址；增强工作流数组引用类型校验，避免与二维数据冲突；知识库被删除后，应用编排时会优雅提示；PDF解析替换为`liteparse`，速度提升3倍；优化工作流`nodeResponse`扁平化存储，避免大嵌套工作流保存失败；xlsx解析自动去除空行空列并补充合并单元格。

## 修复与代码优化
本次更新修复了模型获取多模态文件链接异常、`training`接口潜在越权风险、HTTP tool parse的SSRF风险、交互节点后MCP工具展开异常等问题。代码优化方面，将插件服务从旧runtime结构调整为pnpm workspace monorepo，拆分为HTTP服务入口、领域模型、用例、API adapter、基础设施、SDK和CLI；将app API接口全部用zod schema编写并生成文档；及时处理worker内图片，不再存留base64以降低内存消耗。

> 来源：https://doc.fastgpt.cn/zh-CN/self-host/upgrading/4-15/41504
