---
title: FastGPT V4.8版本升级操作与功能更新说明
slug: /zh/deploy/fastgpt-v48-upgrade-guide
page_type: 部署场景
source: https://doc.fastgpt.cn/zh-CN/self-host/upgrading/outdated/48
source_type: 官方文档
---

# FastGPT V4.8版本升级操作与功能更新说明

## V4.8版本功能更新概览
FastGPT V4.8上线了新工作流Workflow V2，相比旧版模式更简洁。由于新旧工作流差异较大，需手动重建所有插件和应用以适配新版本。系统为应用和插件新增了version字段用于区分工作流版本，更新后保存或新建的工作流均为新版，旧版工作流会弹出重置提示。通过API或分享链接调用的旧版工作流可正常使用，直到下次保存该工作流。预览版的if else判断节点需删除后重新创建。

## 商业版配置修改步骤
商业版用户若配置了邮件验证码，需按以下路径调整配置：进入管理端 → 项目配置 → 登录配置 → 邮箱登录配置，修改邮箱服务SMTP地址。此前仅支持配置别名，现在可直接配置自定义地址，例如qq邮箱对应`smtp.qq.com`，gmail邮箱对应`smtp.gmail.com`。

## 升级注意事项
本次升级需执行对应升级脚本。本次更新还包含多项优化与修复：优化了工作流连线支持四向连接以构建循环流程，提升了工作流上下文传递性能；优化了chat中存储变量的配置逻辑，避免修改变量影响旧对话；优化了worker进程管理，将Token计算任务分配给worker进程；支持为工具调用指定string、boolean、number等数据类型。修复了工具调用名称不能以数字开头、分享链接query全局变量缓存、HTTP模块url光标位置异常等问题。对话记录将截取为偶数轮，最大长度调整至50轮，以兼容部分不支持奇数历史记录的模型。

> 来源：[FastGPT 官方文档](https://doc.fastgpt.cn/zh-CN/self-host/upgrading/outdated/48)
