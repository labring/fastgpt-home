---
title: FastGPT V4.15.2版本升级配置与操作说明
slug: /zh/deploy/fastgpt-v4-15-2-upgrade-config
page_type: 部署场景
source: https://doc.fastgpt.cn/zh-CN/self-host/upgrading/4-15/4152
source_type: 官方文档
---

# FastGPT V4.15.2版本升级配置与操作说明

FastGPT V4.15.2版本包含多项核心配置与镜像变更，涵盖OpenSandbox镜像升级、环境变量调整、文件下载模式新增以及镜像版本更新等内容，同时附带功能新增、体验优化与问题修复。该版本对部分环境变量做了不兼容调整，需严格按照指引完成配置更新，否则可能导致服务启动失败。

### 升级操作步骤
1. 若部署中启用了OpenSandbox，需同步更新以下镜像：`opensandbox/server:v0.2.1`、`opensandbox/execd:v1.0.21`、`opensandbox/egress:v1.1.4`，该更新可修复中文文件名文件无法下载的问题。
2. 调整`AGENT_ENGINE`环境变量值：旧值`default`需替换为`fastAgent`，旧值`pi`需替换为`piAgent`。继续使用旧值会触发环境变量校验失败，导致FastGPT无法启动；未配置该变量时，系统默认使用`fastAgent`，可正常启动服务。
3. 新增`STORAGE_DOWNLOAD_URL_MODE`环境变量，默认值为`short-proxy`。该变量支持两种取值：`short-proxy`会返回FastGPT短链，由FastGPT App代理文件下载；`short-redirect`返回短链并校验后跳转到临时S3/CDN地址，若使用该模式，必须配置`STORAGE_EXTERNAL_ENDPOINT`。
4. 更新核心镜像标签：`fastgpt-app`（主服务）、`fastgpt-pro`（商业版）镜像改为`v4.15.2`，`fastgpt-plugin`镜像改为`v1.0.2`。

该版本新增了工作流节点实时错误提示、自定义工具参数节点支持手动输入JSON Schema与必填选项等功能，优化了Skill未关联应用时的删除弹窗文案、对话框流输出淡入效果性能等内容，修复了PPTX解析高风险依赖、循环运行节点耗时计算错误等问题。同时需注意，文件上传下载已改用短访问链接，旧版链接仍保持兼容；系统工具生成的文件不再设置1小时过期时间，将跟随会话一起删除。使用`short-redirect`模式时，必须配置`STORAGE_EXTERNAL_ENDPOINT`，否则会出现配置错误。

> 来源：https://doc.fastgpt.cn/zh-CN/self-host/upgrading/4-15/4152
