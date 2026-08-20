---
title: FastGPT V4.10.1版本自部署升级操作说明
slug: /zh/deploy/fastgpt-v4101-upgrade-steps-2
page_type: 部署场景
source: https://doc.fastgpt.cn/zh-CN/self-host/upgrading/outdated/4101
source_type: 官方文档
---

# FastGPT V4.10.1版本自部署升级操作说明

## 升级前置说明
FastGPT V4.10.1版本升级面向自部署用户，本次升级需更新指定镜像，部分组件无需调整。其中FastGPT开源镜像tag为`v4.10.1-fix3`，商业版镜像tag为`v4.10.1`，fastgpt-plugin镜像tag为`v0.1.3`；mcp_server、Sandbox、AIProxy组件无需执行更新操作。

## 升级操作步骤
1.  **更新镜像**：按上述要求更新对应镜像的tag版本，确保拉取的是指定版本的镜像文件。
2.  **执行升级脚本**：该脚本仅商业版用户需执行。通过任意终端发起HTTP POST请求，需将`{{rootkey}}`替换为环境变量中的rootkey，`{{host}}`替换为FastGPT的访问域名。完整命令如下：
```bash
curl --location --request POST https://{{host}}/api/admin/initv4101 \
--header "rootkey: {{rootkey}}" \
--header "Content-Type: application/json"
```
脚本执行完成后，将自动为自动同步的知识库加入新的定时任务。

## 升级变更详情
本次升级包含多项新增功能、优化项与问题修复，同时更新了内置工具：
- **新增功能**：系统工具支持流输出；商业版第三方知识库定时同步支持全量同步整个目录。
- **优化内容**：定时任务的报错日志将记录到对话日志；封装应用动态form渲染组件；目录面包屑导航实现溢出省略显示。
- **问题修复**：修复搜索类型系统工具无法正常显示的问题；解决部分系统工具向下兼容的问题；修复AI节点手动选择历史记录时system记录重复的问题；修复知识库tag无法滚动到底的问题；修复API知识库通过API导入文件时自定义API解析参数未生效的问题。
- **工具更新**：新增Flux官方绘图工具、JinaAI工具集、阿里百炼Flux和通义万相绘图工具；纠正硅基流动画图工具的输出值类型。

> 来源：[FastGPT 官方文档](https://doc.fastgpt.cn/zh-CN/self-host/upgrading/outdated/4101)
