---
title: FastGPT V4.12.4自部署版本升级操作指南
slug: /zh/deploy/fastgpt-v4124-upgrade-steps
page_type: 部署场景
source: https://doc.fastgpt.cn/zh-CN/self-host/upgrading/4-12/4124
source_type: 官方文档
---

# FastGPT V4.12.4自部署版本升级操作指南

本页为FastGPT V4.12.4版本的升级指南，发布于2025年9月15日，适用于已部署FastGPT V4.12.x系列的自部署用户。需注意，升级脚本仅商业版用户需要执行，非商业版用户可跳过脚本步骤。

## 升级操作步骤
1. 更新镜像版本：将FastGPT官方镜像、商业版镜像的tag更新为`v4.12.4`；`fastgpt-plugin`镜像的tag更新为`v0.1.13`；`Sandbox`镜像的tag更新为`v4.12.4`；`mcp_server`和`AIProxy`无需更新镜像版本。
2. 执行升级脚本（仅商业版用户）：在任意终端发起HTTP POST请求，需替换命令中的`{{rootkey}}`为环境变量中的rootkey，`{{host}}`为FastGPT的域名，完整命令如下：
```bash
curl --location --request POST https://{{host}}/api/admin/initv4124 \
--header rootkey: {{rootkey}} \
--header Content-Type: application/json
```
该脚本的功能是补充所有资源的owner权限，完成系统资源权限的统一配置。

## 版本更新详情
- 新增功能：商业版支持企微发布渠道。
- 优化项：权限继承逻辑优化，当子资源权限高于父级时，不会强制打断继承模式；Prompt编辑器支持列表渲染；数据页返回知识库列表时保持分页；知识库上传文件成功后返回对应上传目录；删除应用操作减少事务开销；新增用户选择UI组件。
- 修复问题：修复HTTP工具空指针导致无法编辑的问题；修复Python代码运行时入参无法为布尔值的问题。
- 插件更新：`fastgpt-plugin`插件有版本更新。

> 来源：https://doc.fastgpt.cn/zh-CN/self-host/upgrading/4-12/4124
