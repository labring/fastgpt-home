---
title: FastGPT V4.14.1版本升级操作步骤与更新说明
slug: /zh/deploy/fastgpt-v4141-upgrade-steps
page_type: 部署场景
source: https://doc.fastgpt.cn/zh-CN/self-host/upgrading/4-14/4141
source_type: 官方文档
---

# FastGPT V4.14.1版本升级操作步骤与更新说明

## 版本更新概览
本次V4.14.1更新包含新增功能、优化项与问题修复。新增内容包括新工作台交互，原插件改名为工作流工具并移动至我的工具分类；工作流运行欠费后提供继续运行按键，无需从头启动。优化项包括同一轮对话中MCP Client持久化实例不销毁；模型重载时不清空全局模型配置，避免重载阶段调用错误；自动保存新增团队云端保存记录。修复的问题包括Debug模式下交互节点无法正常使用、富文本编辑器tab空格未对齐、嵌套运行Agent时节点队列未初始化导致运行失败、判断器引用number类型时报错、工作流工具入参为文件时未弹出选择框、HTTP插件无法处理http协议接口请求、文本类型全局变量默认值编辑UI异常、代码节点超100行时显示重叠、删除应用未同步删除目录内文件、浏览器未传递实时日期至服务器等。

## 升级操作步骤
1. 更新镜像：将FastGPT官方镜像tag设置为v4.14.1，商业版镜像tag同样为v4.14.1，fastgpt-plugin镜像tag设置为v0.3.1；mcp_server、Sandbox、AIProxy无需更新。
2. 执行升级脚本：在任意终端发起POST请求，命令如下：
```bash
curl --location --request POST https://{{host}}/api/admin/initv4141 \
--header rootkey: {{rootkey}} \
--header Content-Type: application/json
```
其中需将{{rootkey}}替换为环境变量中的rootkey，{{host}}替换为FastGPT的域名。操作前请复制一份原应用目录供工具使用。

## 升级补充说明
本次升级为脚本驱动的快速升级，所有变更均针对V4.14.1版本的核心功能与已知问题进行修复优化，升级过程中需确保镜像更新正确，脚本执行无误。
> 来源：[FastGPT 官方文档](https://doc.fastgpt.cn/zh-CN/self-host/upgrading/4-14/4141)
