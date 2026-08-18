---
title: FastGPT V4.14.5.1版本升级操作与更新内容说明
slug: /zh/deploy/fastgpt-v41451-upgrade-steps
page_type: 部署场景
source: https://doc.fastgpt.cn/zh-CN/self-host/upgrading/4-14/41451
source_type: 官方文档
---

# FastGPT V4.14.5.1版本升级操作与更新内容说明

**版本升级镜像更新说明**
本次升级针对FastGPT V4.14.x系列版本，仅需更新指定镜像即可完成基础升级准备，其余组件无需更新。需更新的镜像及对应版本tag为：FastGPT官方镜像tag设为v4.14.5.1，商业版镜像tag同样为v4.14.5.1，fastgpt-plugin镜像tag设为v0.4.0；mcp_server、Sandbox、AIProxy、mongo无需执行更新操作。

**执行升级脚本操作步骤**
在任意可访问FastGPT部署域名的终端中，执行以下HTTP POST请求完成升级初始化。需将命令中的`{{rootkey}}`替换为环境变量中配置的rootkey值，`{{host}}`替换为你的FastGPT部署域名。完整命令如下：
```bash
curl --location --request POST https://{{host}}/api/admin/initv41451 \
--header rootkey: {{rootkey}} \
--header Content-Type: application/json
```
执行该脚本将自动迁移系统工具的系统密钥配置，完成版本升级的必要初始化流程。若终端无法访问FastGPT域名或rootkey配置错误，脚本将无法正常执行。

**本次更新的新增、优化与修复内容**
🚀 新增功能：支持将Markdown表格导出为CSV格式。
⚙️ 体验优化：工作流拖拽移动时，遇到输入框会触发强制阻拦，避免误操作导致的节点错位；工作流粘贴节点可精确按照鼠标位置进行粘贴，提升布局精度；移除请求大语言模型时的多余系统字段，避免部分模型接口出现报错；使用path.extname从URL中获取文件扩展名，优化文件识别准确性。
🐛 问题修复：修复系统工具工具集设置系统密钥后，子工具无法读取配置密钥的问题；修复密码类型全局变量的必填规则校验错误；修复时间类型全局变量选择月份时被遮挡的问题；修复手动复制弹窗中换行丢失的问题；修复未传入文件上传类型变量时对话接口报错的问题。

> 来源：[FastGPT 官方文档](https://doc.fastgpt.cn/zh-CN/self-host/upgrading/4-14/41451)
