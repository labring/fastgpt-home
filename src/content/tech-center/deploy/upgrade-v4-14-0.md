---
title: FastGPT V4.14.0版本升级操作与变更说明
slug: /zh/deploy/upgrade-v4-14-0
page_type: 部署与升级
source: https://doc.fastgpt.cn/zh-CN/self-host/upgrading/4-14/4140
source_type: 官方文档
---

# FastGPT V4.14.0版本升级操作与变更说明

## 这个版本改了什么
本次版本新增多项功能与优化。新增插件市场，移除自定义插件分组，仅保留自定义标签，支持从FastGPT Marketplace统一安装系统工具，后续将支持工作流触发器、数据源解析方式、数据分块、索引增强策略等插件类型。对话框上传文件迁移至S3存储，不自动过期，完全跟随对话记录删除，签发的预览连接有效期为1小时。全局变量支持时间点、时间范围、对话模型选择类型。插件输入支持密码类型。优化Markdown中base64图片正则匹配性能。团队成员接受邀请后，默认成员名改为成员账户名。修复Prompt编辑器特殊语法解析异常、Claude工具调用下标从1开始导致参数异常、S3删除头像key为空时抛错阻塞流程、工作流前置IO变更时依赖未及时刷新、导出对话日志缺少反馈记录、工作流欢迎语输入框光标偏移、交互节点与连续批量执行导致工作流运行逻辑错误、工作流Redo操作后编辑记录无法推送快照、HTTP自定义输入丢失等问题。

## 升级前要确认的事
需确认需更新的镜像版本：FastGPT镜像tag为v4.14.0，商业版镜像tag为v4.14.0，fastgpt-plugin镜像tag为v0.3.0，mcp_server、Sandbox、AIProxy无需更新。仅使用过自定义系统工具的商业版用户，需准备环境变量中的rootkey与FastGPT域名。fastgpt-plugin镜像不再预装系统插件，原先手动安装的js插件包将失效，需重新打包安装。若无法访问FastGPT插件市场，需手动从https://marketplace.fastgpt.cn/下载.pkg文件，后续通过文件导入安装。

## 升级步骤（照做）
1. 更新指定镜像。2. 仅使用过自定义系统工具的商业版用户，在任意终端执行以下HTTP POST请求：curl --location --request POST 'https://{{host}}/api/admin/initv4140' --header 'rootkey: {{rootkey}}' --header 'Content-Type: application/json'，其中{{rootkey}}替换为环境变量rootkey，{{host}}替换为FastGPT域名，该请求会将原系统工具迁移至最新数据表。3. 手动安装系统插件：通过插件市场默认获取数据安装，或手动导入下载的.pkg文件。安装后可对工具进行排序、设置默认安装、管理标签。多租户系统的团队管理员可在插件库激活对应工具，开源版root团队默认激活所有系统工具。

## 升级后怎么验证
可通过以下方式验证升级效果：检查插件市场可正常加载系统工具；上传文件至对话框，确认文件存储至S3且预览连接有效期为1小时；测试全局变量的时间点、时间范围、对话模型选择类型功能；测试插件输入的密码类型字段；验证Prompt编辑器、Claude工具调用、S3头像删除、工作流相关功能、对话日志导出、HTTP自定义输入等修复项恢复正常。

> 来源： [FastGPT 官方来源](https://doc.fastgpt.cn/zh-CN/self-host/upgrading/4-14/4140)

## 适用性与版本范围

本页适用于官方来源记录的 部署与升级 场景。执行变更前，需核对 FastGPT、依赖、API 与部署版本。

## 安全护栏

凭证与私密数据使用 [REDACTED_CREDENTIAL] 占位符。执行操作前需核对文档的环境与版本。

## 回滚指引

恢复变更前的技术内容权威快照、已保存配置与数据快照，再执行最小验证场景。
