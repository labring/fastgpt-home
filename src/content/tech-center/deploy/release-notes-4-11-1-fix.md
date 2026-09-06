---
title: FastGPT v4.11.1-fix版本升级修复内容与操作说明
slug: /zh/deploy/release-notes-4-11-1-fix
page_type: 版本解读
source: https://github.com/labring/FastGPT/releases/tag/v4.11.1-fix
source_type: 官方文档
---

# FastGPT v4.11.1-fix版本升级修复内容与操作说明

## 这个版本改了什么
该版本主要修复新版MCP tool无法在工作流中获取其响应值的问题。同步包含多项优化与修复：修复MCP镜像构建参数缺失、修复MCP镜像构建代理配置问题、修复MCP无响应输出的核心逻辑；修复内存泄漏问题；调整robots.txt文件存放位置至toc.mdx；修复数据集列表项标签边距样式；修复文档预览动作逻辑；更新文档搜索引擎与相关文档内容；修复Dockerfile配置；更新数据集相关文档。

## 升级前要确认的事
升级前需确认当前部署的FastGPT版本为v4.11.1，确保服务处于可更新状态。

## 升级步骤（照做）
1. 拉取v4.11.1-fix版本的FastGPT镜像；
2. 停止当前运行的FastGPT服务；
3. 使用v4.11.1-fix版本镜像重新部署服务；
4. 启动服务。

## 升级后怎么验证
1. 查看服务运行日志，确认无异常报错；
2. 在工作流中调用MCP tool，验证可正常获取其响应值；
3. 测试数据集列表、文档预览功能，确认功能运行正常。

> 来源: [FastGPT release notes](https://github.com/labring/FastGPT/releases/tag/v4.11.1-fix)
