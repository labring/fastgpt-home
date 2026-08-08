---
title: FastGPT V4.9.9版本升级操作与更新说明
slug: /zh/deploy/fastgpt-v499-upgrade-guide
page_type: 部署场景
source: https://doc.fastgpt.cn/zh-CN/self-host/upgrading/outdated/499
source_type: 官方文档
---

# FastGPT V4.9.9版本升级操作与更新说明

## 版本升级操作步骤
1. 提前完成数据备份，避免升级过程中出现数据丢失。
2. 商业版用户需联系FastGPT团队支持人员获取新License替换方案，完成替换后升级系统，管理后台会提示输入新License。
3. 更新镜像标签：将FastGPT官方镜像的tag设置为v4.9.9，商业版镜像的tag设置为v4.9.9；mcp_server、Sandbox、AIProxy无需执行更新操作。

## 本次版本新增功能
- 切换SessionId替代JWT实现登录鉴权，支持控制最大登录客户端数量。
- 启用新的商业版License管理模式。
- 公众号调用时显示chat对话错误信息，便于问题排查。
- API知识库支持BasePath选择，需增加对应API接口，具体可参考API知识库介绍文档。

## 本次版本优化与修复内容
### 优化项
- 优化工具调用逻辑，更新新工具的判断规则。
- 调整Cite引用的提示词内容。
### 修复项
- 修复无法正常获取应用历史保存/发布记录的问题。
- 修复成员创建MCP工具时的权限异常问题。
- 修复来源引用展示时ID传递错误，导致提示无权操作对应文件的问题。
- 修复回答标注环节的前端数据报错问题。

> 来源：https://doc.fastgpt.cn/zh-CN/self-host/upgrading/outdated/499
