---
title: FastGPT V4.12.0版本升级操作与配置说明
slug: /zh/deploy/fastgpt-v4-12-0-upgrade-steps
page_type: 部署场景
source: https://doc.fastgpt.cn/zh-CN/self-host/upgrading/4-12/4120
source_type: 官方文档
---

# FastGPT V4.12.0版本升级操作与配置说明

## 版本更新概况
FastGPT V4.12.0于2025年8月11日发布，本次更新包含环境变量变更、专属升级脚本，同时新增、优化了多项功能并修复了已知问题，仅商业版用户需执行升级脚本。

## 升级操作步骤
1. 更新镜像：将FastGPT官方镜像、商业版镜像的tag均更新为v4.12.0；fastgpt-plugin镜像tag需更新为v0.1.9，mcp_server、Sandbox、AIProxy无需更新。
2. 修改环境变量：针对FastGPT商业版（fastgpt-pro），需新增环境变量`FILE_TOKEN_KEY = filetokenkey`，该值需与fastgpt镜像中的对应环境变量保持一致。
3. 执行升级脚本：仅商业版用户需执行该脚本。通过任意终端发起HTTP POST请求，替换`{{rootkey}}`为环境变量中的rootkey值，`{{host}}`为FastGPT域名：
```bash
curl --location --request POST https://{{host}}/api/admin/initv4120 \
--header rootkey: {{rootkey}} \
--header Content-Type: application/json
```
该脚本用于初始化团队成员的应用对话日志权限。

## 本次更新详情
### 新增内容
商业版支持应用日志数据看板、简易对话页（可直接选择模型和预设工具聊天，无需搭建应用）；对话页新增团队应用快速切换功能；调整权限表为Role映射Permission模式；应用可单独分配对话日志查看权限。
### 优化内容
优化3处存在潜在内存泄露的代码；优化工作流递归检查逻辑，避免无限递归；优化文档阅读Worker，采用ShareBuffer避免数据拷贝；批量生成并入库向量减少网络操作；知识库搜索合并多query计算减少数据库操作；优化知识库交互、登录页UI；严格检测工作流中可添加的工具集；修复对话日志导出仅导出选中表头并修复部分表头无法导出的问题。
### 修复内容
修复Doc2x API更新导致的解析失败问题；修复工作流中团队应用目录可被加入的问题；修复工作流数组选择器UI缺陷；修复成员同步时权限未完全删除的问题。
### 工具更新
系统工具可返回citeLinks响应值，实现对话框内引用链接展示。

> 来源：[FastGPT 官方文档](https://doc.fastgpt.cn/zh-CN/self-host/upgrading/4-12/4120)
