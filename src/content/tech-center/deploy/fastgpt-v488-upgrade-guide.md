---
title: FastGPT V4.8.8版本自部署升级操作与更新说明
slug: /zh/deploy/fastgpt-v488-upgrade-guide
page_type: 部署场景
source: https://doc.fastgpt.cn/zh-CN/self-host/upgrading/outdated/488
source_type: 官方文档
---

# FastGPT V4.8.8版本自部署升级操作与更新说明

## 版本更新概览
FastGPT V4.8.8版本包含多项功能重构与优化，核心更新包括重构系统插件结构，支持向社区提交系统插件；新增DuckDuckGo、飞书webhook两款系统插件；优化变量输入交互，支持通过`/`唤起变量选择，可直接选取上游输出值。商业版新增知识库权限继承功能，同时优化了移动端应用切换、节点图标展示、对话框引用复制与折叠等交互体验。此外该版本还修复了Permission表声明异常、并行节点运行时间记录错误、嵌套节点运行详情展示异常等多个问题。

## 升级操作步骤
升级前需严格按照以下流程操作：
1.  完成数据库备份，防止升级过程中出现数据丢失。
2.  修改镜像标签：将开源版fastgpt镜像的tag设置为`v4.8.8-fix2`，商业版镜像tag设置为`v4.8.8`。
3.  执行初始化配置：在任意终端发起HTTP POST请求，将`{{rootkey}}`替换为环境变量中的rootkey，`{{host}}`替换为FastGPT的域名，执行以下命令：
    ```bash
    curl --location --request POST https://{{host}}/api/admin/initv488 \
    --header rootkey: {{rootkey}} \
    --header Content-Type: application/json
    ```
    该请求将完成知识库继承权限的初始化。

## 升级注意事项
升级过程中需注意以下细节：镜像标签不可混淆，开源版与商业版的tag存在差异；初始化请求的接口路径`/api/admin/initv488`不可修改，参数替换需确保准确，否则会导致初始化失败。若此前遇到简易模式首次进入无法获取知识库配置、Log debug level配置无效等问题，升级至V4.8.8版本可完成修复。此外，插件独立运行时的变量替换异常问题也已在该版本中修复。

> 来源：[FastGPT 官方文档](https://doc.fastgpt.cn/zh-CN/self-host/upgrading/outdated/488)
