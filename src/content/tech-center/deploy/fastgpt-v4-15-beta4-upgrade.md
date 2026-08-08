---
title: FastGPT V4.15.0-beta4版本升级配置与操作说明
slug: /zh/deploy/fastgpt-v4-15-beta4-upgrade
page_type: 部署场景
source: https://doc.fastgpt.cn/zh-CN/self-host/upgrading/4-15/41504
source_type: 官方文档
---

# FastGPT V4.15.0-beta4版本升级配置与操作说明

FastGPT V4.15.0-beta4版本包含插件服务重大更新与环境变量调整，本次升级需严格遵循配置要求，避免出现服务运行异常。该版本将插件服务升级至v1.0.0-beta1，系统工具的运行方式也有较大调整，部分原有配置需重新适配。

## 升级操作步骤
1.  **修改环境变量**：需调整两个服务的环境变量，首先将fastgpt-plugin的`AUTH_TOKEN`修改为32位以上的字符串；同时将fastgpt的`PLUGIN_TOKEN`设置为与fastgpt-plugin的`AUTH_TOKEN`完全一致的值。另外，修改fastgpt-plugin的`MONGODB_URI`，确保其数据库名不与fastgpt的Mongo数据库重名，示例格式为`mongodb://myusername:mypassword@fastgpt-mongo:27017/fastgpt-plugin?authSource=admin`。
2.  **更新镜像版本**：分别更新各服务的镜像tag：fastgpt-app（主服务）、fastgpt-pro（商业版）使用`v4.15.0-beta4`，fastgpt-plugin使用`v1.0.0-beta2`，aiproxy使用`v0.6.1`。
3.  **重装系统工具**：可通过两种方式完成：一是下载所有系统工具的zip包，登录FastGPT网页，点击管理员导航栏，进入添加插件页面，选择导入/更新插件并上传zip包确认；二是通过插件市场逐个下载，正式版前插件市场地址为`https://v2.marketplace.fastgpt.cn`。

## 变更细节与易错提示
本次版本新增了插件系统架构重写、chatbox UI重写、应用/知识库虚拟列表渲染、独立openapi文档、导出工作流模板与HTML输出自动切换预览等功能。优化内容包括系统工具迁移至local-pool以支持进程池、队列、超时重试与运行指标收集，插件级runtime config支持，插件运行入口可从对象存储拉取并缓存，输入引导配置校验，工作流数组引用类型增强校验，知识库删除后的优雅提示，PDF解析替换为liteparse（速度提升3倍），工作流nodeResponse扁平化存储优化，xlsx解析自动去除空行空列并补充合并单元格。修复了多模态文件链接获取异常、training接口潜在越权风险、HTTP tool parse的SSRF风险、交互节点后MCP工具展开异常等问题。需注意的易错点包括：环境变量的一致性必须严格保证，数据库名不能与原有服务重名，镜像tag需与版本要求完全匹配，避免混用不同版本的服务镜像。

> 来源：https://doc.fastgpt.cn/zh-CN/self-host/upgrading/4-15/41504
