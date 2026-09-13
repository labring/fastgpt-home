---
title: FastGPT 4.15.0-beta4版本升级操作与内容解读
slug: /zh/deploy/upgrade-v4-15-0-beta4
page_type: 部署与升级
source: https://doc.fastgpt.cn/zh-CN/self-host/upgrading/4-15/41504
source_type: 官方文档
---

# FastGPT 4.15.0-beta4版本升级操作与内容解读

## 这个版本改了什么
重写插件系统架构，重写chatbox UI，应用与知识库增加虚拟列表渲染，增加单独的openapi文档区分devapi文档，导出工作流模板时同时导出名字和介绍，HTML输出自动切换预览。优化内容包括：系统工具运行迁移到local-pool，支持进程池、队列、超时、重试退避和运行指标；支持插件级runtime config；插件运行入口支持从对象存储拉取并缓存到本地文件目录；输入引导配置增加校验；工作流数组引用类型增强校验；知识库被删除后，应用编排时优雅提示；PDF解析替换为liteparse，速度提高3倍；工作流运行时nodeResponse扁平化存储优化；xlsx解析自动去除空行空列并补充合并单元格。修复内容包括：模型获取多模态文件链接异常，training接口存在的潜在越权风险，HTTP tool parse的SSRF风险，交互节点后的工具调用展开MCP工具异常。代码优化包括：插件服务从旧runtime结构调整为pnpm workspace monorepo，拆分为HTTP服务入口、领域模型、用例、API adapter、基础设施、SDK和CLI；将app API接口全部用zod schema编写并生成文档；及时处理worker内图片，不再存留base64，降低内存消耗。

## 升级前要确认的事
需确认插件服务已更新至v1.0.0-beta1版本，系统工具运行方式有较大调整。需提前配置正确的环境变量：fastgpt-plugin的AUTH_TOKEN需为32位以上，fastgpt的PLUGIN_TOKEN需与fastgpt-plugin的AUTH_TOKEN保持一致；fastgpt-plugin的MONGODB_URI中的数据库名不能与fastgpt的Mongo数据库名重名。同时需确认各服务的对应镜像版本：fastgpt-app、fastgpt-pro的镜像tag为v4.15.0-beta4，fastgpt-plugin为v1.0.0-beta2，aiproxy为v0.6.1。

## 升级步骤（照做）
1. 修改环境变量：修改fastgpt-plugin的AUTH_TOKEN为32位以上；修改fastgpt的PLUGIN_TOKEN，使其与fastgpt-plugin的AUTH_TOKEN一致；修改fastgpt-plugin的MONGODB_URI中的数据库名，确保不与fastgpt的Mongo数据库名重名，示例格式为mongodb://[REDACTED_CREDENTIAL]@fastgpt-mongo:27017/fastgpt-plugin?authSource=admin。
2. 镜像变更：更新fastgpt-app镜像tag为v4.15.0-beta4，更新fastgpt-pro镜像tag为v4.15.0-beta4，更新fastgpt-plugin镜像tag为v1.0.0-beta2，更新aiproxy镜像tag为v0.6.1。
3. 重装系统工具：下载[系统工具zip包](https://github.com/labring/fastgpt-img/raw/refs/heads/main/fastgpt-official-plugins(1).zip)；打开fastgpt网页，点击管理员navbar，点击添加插件，点击导入/更新插件，上传zip包并确认即可重装旧的所有系统工具。也可通过[插件市场](https://v2.marketplace.fastgpt.cn)逐个下载系统工具。

## 升级后怎么验证
确认各服务镜像已更新并启动成功，插件服务运行正常。测试工作流导出功能，确认导出内容包含模板名称与介绍。测试PDF解析与xlsx解析功能，确认解析结果符合预期。测试交互节点后的工具调用，确认MCP工具可正常展开。测试知识库被删除后，应用编排时是否弹出优雅提示。测试openapi文档访问，确认文档可正常加载。

> 来源： [FastGPT 官方来源](https://doc.fastgpt.cn/zh-CN/self-host/upgrading/4-15/41504)

## 适用性与版本范围

本页适用于官方来源记录的 部署与升级 场景。执行变更前，需核对 FastGPT、依赖、API 与部署版本。

## 安全护栏

凭证与私密数据使用 [REDACTED_CREDENTIAL] 占位符。执行操作前需核对文档的环境与版本。

## 回滚指引

恢复变更前的技术内容权威快照、已保存配置与数据快照，再执行最小验证场景。
