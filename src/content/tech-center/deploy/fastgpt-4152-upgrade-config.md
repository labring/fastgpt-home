---
title: FastGPT V4.15.2版本升级步骤与配置变更说明
slug: /zh/deploy/fastgpt-4152-upgrade-config
page_type: 部署场景
source: https://doc.fastgpt.cn/zh-CN/self-host/upgrading/4-15/4152
source_type: 官方文档
---

# FastGPT V4.15.2版本升级步骤与配置变更说明

## 版本核心变更概述
V4.15.2版本包含多项关键配置变更与功能优化，主要涉及环境变量规则调整、OpenSandbox组件升级、文件下载模式新增，以及官方镜像版本更新。该版本修复了多个安全隐患与功能异常，同时重构了Agent执行内核与事件生命周期，统一了不同执行引擎的交互逻辑，降低了后续维护成本。

## 可执行升级配置步骤
1.  **OpenSandbox镜像升级**：若部署中启用了OpenSandbox，需同步更新三个组件镜像：`opensandbox/server:v0.2.1`、`opensandbox/execd:v1.0.21`、`opensandbox/egress:v1.1.4`，升级后可修复中文文件名无法下载的问题。
2.  **AGENT_ENGINE环境变量调整**：自V4.15.2起，`AGENT_ENGINE`使用新枚举值，需将旧值替换为对应新值：`default`改为`fastAgent`，`pi`改为`piAgent`。旧值不再兼容，继续使用会导致环境变量校验失败，服务无法启动；未配置该变量时，系统默认使用`fastAgent`。
3.  **文件下载模式配置**：新增`STORAGE_DOWNLOAD_URL_MODE`环境变量，默认值为`short-proxy`，该模式下返回FastGPT短链，由FastGPT代理文件下载。若需使用短链但不希望流量经过FastGPT，可配置`STORAGE_DOWNLOAD_URL_MODE=short-redirect`，此模式下必须同时配置`STORAGE_EXTERNAL_ENDPOINT`。
4.  **镜像版本更新**：将`fastgpt-app`（主服务）、`fastgpt-pro`（商业版）的镜像tag更新为`v4.15.2`，`fastgpt-plugin`镜像tag更新为`v1.0.2`。

## 核心优化与修复说明
该版本新增工作流节点实时错误提示、自定义工具参数节点支持手动输入JSON Schema与必填选项，文件上传下载改用短链接以减少长链接对上下文的占用与模型输出异常。优化内容包括Skill未关联应用时的删除弹窗文案、对话框流输出淡入效果性能，升级LiteParse版本解决PDF并发解析报错问题，调整文件解析worker默认数量为5（可通过`PARSE_FILE_WORKERS`配置）。修复方面包括移除PPTX解析依赖的高风险解压库、修复循环与并行节点耗时计算错误、优化企微版本客户付款自动购买license的逻辑，同时统一了Agent执行内核与事件生命周期，优化了工具调度规则。

> 来源：https://doc.fastgpt.cn/zh-CN/self-host/upgrading/4-15/4152
