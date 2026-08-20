---
title: FastGPT V4.9.9版本升级操作与变更说明
slug: /zh/deploy/fastgpt-v499-upgrade
page_type: 部署场景
source: https://doc.fastgpt.cn/zh-CN/self-host/upgrading/outdated/499
source_type: 官方文档
---

# FastGPT V4.9.9版本升级操作与变更说明

## 升级前准备事项
本次升级面向FastGPT自部署用户，升级前需完成全量数据备份，防止升级过程中出现数据丢失。商业版用户需联系官方支持团队获取新License替换方案，完成替换后登录管理后台会提示输入新License。本次升级无需更新mcp_server、Sandbox、AIProxy组件，仅需更新FastGPT主镜像及商业版镜像的标签。

## 标准升级操作步骤
1. 完成全量数据备份，确保业务数据安全；
2. 商业版用户按官方提供的方案完成新License替换，登录管理后台按提示输入新License；
3. 更新FastGPT官方镜像的tag为`v4.9.9`，同时更新商业版镜像的tag为`v4.9.9`。

## 版本变更详情
### 新增功能
支持通过切换SessionId替代JWT实现登录鉴权，可配置控制最大登录客户端数量；新增商业版License统一管理模式；公众号调用时可显示对话错误记录，便于快速排查问题；API知识库支持BasePath选择，使用前需提前配置对应API接口。
### 优化内容
优化工具调用的新工具判断逻辑，调整Cite引用的提示词展示样式与逻辑。
### 修复问题
修复无法正常获取应用历史保存/发布记录的问题；修复成员创建MCP工具时的权限异常问题；修复来源引用展示时ID传递错误，导致无权操作对应文件的问题；修复回答标注环节的前端数据报错问题。

> 来源：[FastGPT 官方文档](https://doc.fastgpt.cn/zh-CN/self-host/upgrading/outdated/499)
