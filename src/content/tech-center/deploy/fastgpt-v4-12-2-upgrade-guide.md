---
title: FastGPT V4.12.2版本升级操作及更新内容说明
slug: /zh/deploy/fastgpt-v4-12-2-upgrade-guide
page_type: 部署场景
source: https://doc.fastgpt.cn/zh-CN/self-host/upgrading/4-12/4122
source_type: 官方文档
---

# FastGPT V4.12.2版本升级操作及更新内容说明

## 版本基本信息与更新范围
本版本发布于2025年8月26日，仅需更新部分组件镜像即可完成升级：FastGPT官方镜像与商业版镜像的tag需更新为`v4.12.2-fix3`，fastgpt-plugin镜像tag需更新为`v0.1.11`；mcp_server、Sandbox、AIProxy无需更新版本。

## 标准升级操作步骤
1.  修改部署配置中的FastGPT官方镜像tag为`v4.12.2-fix3`；
2.  同步修改FastGPT商业版镜像的tag为`v4.12.2-fix3`；
3.  将fastgpt-plugin镜像的tag更新为`v0.1.11`；
4.  重启对应容器完成更新，其余组件保持原有配置无需改动。

## 核心更新内容与注意事项
本次更新包含新增功能、优化项与问题修复：新增向量模型并发请求设置，默认值为1，可在模型配置中自定义调整，请勿统一设置为10以避免不支持并发的模型出现异常；对话页支持管理员配置精选应用与快捷应用，同时支持关闭团队对话首页。优化项包括工作流独立分支异常检测、向量维度截断归一化逻辑调整、模型提供商配置迁移至plugin sdk、LLM调用函数封装、工作流调度与递归判断优化。修复内容覆盖独立对话页UI异常、插件交互渲染失败、二级路由默认地址错误、多选选择器导致的页面崩溃、移动端分享链接加载异常、用户同步写冲突、系统套餐关闭异常、工作流团队应用搜索无效、应用版本ref字段错误、Oceanbase批量插入id返回异常、交互节点与工具集冲突等问题。工具更新包含修复Doc2x工具的响应值异常问题。

> 来源：https://doc.fastgpt.cn/zh-CN/self-host/upgrading/4-12/4122
