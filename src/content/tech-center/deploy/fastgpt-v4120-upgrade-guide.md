---
title: FastGPT V4.12.0版本升级步骤与配置变更说明
slug: /zh/deploy/fastgpt-v4120-upgrade-guide
page_type: 部署场景
source: https://doc.fastgpt.cn/zh-CN/self-host/upgrading/4-12/4120
source_type: 官方文档
---

# FastGPT V4.12.0版本升级步骤与配置变更说明

## 版本核心变更概述
FastGPT V4.12.0版本于2025年8月11日发布，本次更新包含环境变量调整、专属升级脚本，以及多项功能优化与问题修复。该版本新增商业版应用日志数据看板、简易对话页（可直接选择模型与预设工具聊天，无需手动搭建应用）、团队应用快速切换功能；调整权限表采用Role映射Permission模式，支持为应用单独分配对话日志查看权限。优化内容包括修复3处潜在内存泄露代码、优化工作流递归检查避免无限递归、升级文档阅读Worker使用ShareBuffer减少数据拷贝、批量生成与入库向量减少网络操作、合并知识库搜索多query计算降低数据库操作次数、优化知识库交互与登录页UI、严格检测工作流中可添加的工具集，以及修复对话日志导出仅支持选中表头并解决部分表头无法导出的问题。修复的问题包括Doc2x API更新导致的解析失败、工作流中团队应用目录可被添加、工作流数组选择器UI缺陷、成员同步时权限未完全删除等。此外系统工具可返回citeLinks响应值，实现对话框内引用链接展示。

## 标准升级操作步骤
1. 更新镜像：将FastGPT官方镜像tag更新为`v4.12.0`，商业版`fastgpt-pro`镜像tag同样为`v4.12.0`，`fastgpt-plugin`镜像tag更新为`v0.1.9`；`mcp_server`、`Sandbox`、`AIProxy`三个组件无需更新。
2. 修改环境变量：针对FastGPT商业版（`fastgpt-pro`），需配置`FILE_TOKEN_KEY`变量，该值需与`fastgpt`镜像中的环境变量保持一致，示例配置为`FILE_TOKEN_KEY = filetokenkey`。
3. 执行升级脚本：仅商业版用户需执行该脚本，通过终端发起POST请求，替换`{{rootkey}}`为环境变量中的rootkey，`{{host}}`为FastGPT域名，执行命令如下：
```bash
curl --location --request POST https://{{host}}/api/admin/initv4120 \
--header rootkey: {{rootkey}} \
--header Content-Type: application/json
```
该脚本用于初始化团队成员的应用对话日志权限。

## 使用边界与易错提示
本次升级脚本仅面向商业版用户，非商业版部署无需执行该脚本。修改环境变量时，`FILE_TOKEN_KEY`需与`fastgpt`镜像中的对应变量保持完全一致，否则可能导致文件读取功能异常。`mcp_server`、`Sandbox`、`AIProxy`三个组件无需更新，避免不必要的配置变动。部分新增与优化功能仅对商业版用户开放，例如应用日志数据看板与简易对话页，使用前需确认当前部署的版本类型。

> 来源：[FastGPT 官方文档](https://doc.fastgpt.cn/zh-CN/self-host/upgrading/4-12/4120)
