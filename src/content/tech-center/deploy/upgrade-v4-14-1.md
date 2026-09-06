---
title: FastGPT V4.14.1版本升级内容与操作步骤说明
slug: /zh/deploy/upgrade-v4-14-1
page_type: 部署与升级
source: https://doc.fastgpt.cn/zh-CN/self-host/upgrading/4-14/4141
source_type: 官方文档
---

# FastGPT V4.14.1版本升级内容与操作步骤说明

## 这个版本改了什么
新增两项功能：推出新工作台交互，原插件改名为"工作流工具"并移动至我的工具分类；工作流运行欠费后提供继续运行按键，无需从头启动流程。优化三项内容：同一轮对话中MCP Client会持久化实例，不会中途销毁；模型重载时不会清空再添加全局模型配置，避免重载阶段出现模型调用错误；自动保存功能增加一条团队云端保存记录。修复十项问题：Debug模式下交互节点无法正常使用；富文本编辑器tab空格未对齐；嵌套运行Agent时跳过节点队列未初始化导致无法正常运行；判断器右侧为number引用时出现报错；工作流工具入参为文件选择时未出现选择框；HTTP插件无法正确处理http协议（非https）接口请求；文本类型全局变量默认值编辑框UI显示异常；代码节点行数超过100行时显示重叠；删除应用未清理对应目录内文件；浏览器未传递实时日期至服务器。

## 升级前要确认的事
需提前准备FastGPT域名与环境变量中的rootkey；确认需更新的镜像版本：FastGPT镜像tag v4.14.1、FastGPT商业版镜像tag v4.14.1、fastgpt-plugin镜像tag v0.3.1；mcp_server、Sandbox、AIProxy无需更新。

## 升级步骤（照做）
1. 更新对应镜像：将FastGPT镜像tag设为v4.14.1，FastGPT商业版镜像tag设为v4.14.1，fastgpt-plugin镜像tag设为v0.3.1；mcp_server、Sandbox、AIProxy无需更新。
2. 执行升级脚本：从任意终端发起HTTP请求，将{{rootkey}}替换为环境变量中的rootkey，{{host}}替换为FastGPT域名，执行以下命令：
```bash
curl --location --request POST 'https://{{host}}/api/admin/initv4141' \
--header 'rootkey: {{rootkey}}' \
--header 'Content-Type: application/json'
```
完成请求后，复制一份原应用目录供工具使用。

## 升级后怎么验证
可通过验证新增功能与修复问题对应的场景确认升级完成，包括检查工作台插件分类是否显示"工作流工具"、测试工作流欠费后继续运行功能、验证MCP Client实例持久化效果、测试模型重载流程、检查自动保存的团队云端记录，以及各修复问题对应的功能场景是否正常运行。

> 来源： [FastGPT 官方来源](https://doc.fastgpt.cn/zh-CN/self-host/upgrading/4-14/4141)

## 适用性与版本范围

本页适用于官方来源记录的 部署与升级 场景。执行变更前，需核对 FastGPT、依赖、API 与部署版本。

## 安全护栏

凭证与私密数据使用 [REDACTED_CREDENTIAL] 占位符。执行操作前需核对文档的环境与版本。

## 回滚指引

恢复变更前的技术内容权威快照、已保存配置与数据快照，再执行最小验证场景。
