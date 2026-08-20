---
title: FastGPT 4.11.1版本升级操作与更新内容说明
slug: /zh/deploy/fastgpt-4111-upgrade-guide
page_type: 部署场景
source: https://doc.fastgpt.cn/zh-CN/self-host/upgrading/outdated/4111
source_type: 官方文档
---

# FastGPT 4.11.1版本升级操作与更新内容说明

### 升级前置准备
本次FastGPT 4.11.1版本升级需更新指定镜像，无需升级mcp_server、Sandbox、AIProxy组件。需拉取的镜像标签分别为：FastGPT官方镜像`v4.11.1-fix2`、商业版镜像`v4.11.1-fix`、fastgpt-plugin镜像`v0.1.7`。请提前备份原有配置文件与数据，避免升级过程中出现数据丢失。

### 更新内容说明
本次更新包含多项新增功能、优化项与问题修复。新增内容包括：支持系统工具集直接调用工具、MCP结构重写（更新后自动同步在用MCP组件，无需手动删除添加）、对话日志看板自定义字段展示、账号注销功能、新文档框架，以及GLM 4.5系列模型配置。优化项包括：兑换码功能支持指定对公支付模式、优化支付套餐模式、全局变量修改变量名后节点引用值不丢失、将模型预设配置迁移至FastGPT Plugin项目。修复问题包括：MCP object类型数据传递错误、登录页UI偏移、Excel带换行符号时分块异常、Doc2x PDF识别多余标签、404页面翻译失效。工具更新方面，新增libulibu绘图工具与秘塔搜索工具，支持Signoz系统监控接入，修复数学表达式工具数据类型错误。

### 升级操作步骤
1. 拉取对应版本的镜像：
   - FastGPT 官方镜像：`docker pull fastgpt/fastgpt:v4.11.1-fix2`
   - FastGPT 商业版镜像：`docker pull fastgpt/fastgpt-business:v4.11.1-fix`
   - fastgpt-plugin 镜像：`docker pull fastgpt/plugin:v0.1.7`
2. 保留mcp_server、Sandbox、AIProxy的现有镜像版本，无需拉取更新。
3. 停止原有FastGPT、商业版、fastgpt-plugin容器，使用新镜像重新创建并启动容器，完成升级。

> 来源：[FastGPT 官方文档](https://doc.fastgpt.cn/zh-CN/self-host/upgrading/outdated/4111)
