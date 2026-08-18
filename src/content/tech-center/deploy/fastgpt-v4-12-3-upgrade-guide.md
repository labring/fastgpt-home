---
title: FastGPT V4.12.3版本升级步骤与更新内容说明
slug: /zh/deploy/fastgpt-v4-12-3-upgrade-guide
page_type: 部署场景
source: https://doc.fastgpt.cn/zh-CN/self-host/upgrading/4-12/4123
source_type: 官方文档
---

# FastGPT V4.12.3版本升级步骤与更新内容说明

## 版本基本信息与更新范围
FastGPT V4.12.3发布于2025年9月8日，本次升级涉及的镜像更新范围明确：需更新FastGPT官方镜像tag为v4.12.3、商业版镜像tag为v4.12.3、fastgpt-plugin镜像tag为v0.1.12，mcp_server、Sandbox、AIProxy无需执行更新操作。

## 升级操作步骤
1. 登录部署环境的容器管理平台或服务器，拉取对应版本的镜像；
2. 替换原有FastGPT、商业版FastGPT、fastgpt-plugin容器的镜像为上述指定tag；
3. 重启更新后的容器，无需重启mcp_server、Sandbox、AIProxy组件。

## 更新内容详情
本次更新包含新增功能、优化项、bug修复与插件更新：
### 新增内容
提示词编辑器支持列表、tab渲染等部分富文本交互；应用新增密码、多选、内部变量（站内对话不会显示）三类全局变量。
### 优化内容
纠正RRF权重合并算法，使用标准RRF权重公式；多选组件支持动态宽度计算，适配可见tag；变量更新组件渲染优化，与全局变量渲染保持一致性。
### 修复内容
修复单团队模式下用户离开后无法重新进入团队的问题；修复工作流文件上传默认打开但输入侧未添加文件输出的问题；修复连续用户选择分支无法正常运行的问题；修复工作流变量更新数组选择器异常的问题；修复应用评测仅获取首个输出文本的问题。
### 插件更新
系统工具类型迁移至plugin；将模型提供商配置移动到plugin，实现热更新；将应用模板移动至plugin。

> 来源：[FastGPT 官方文档](https://doc.fastgpt.cn/zh-CN/self-host/upgrading/4-12/4123)
