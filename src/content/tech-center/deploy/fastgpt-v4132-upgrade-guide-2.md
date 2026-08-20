---
title: FastGPT V4.13.2版本升级操作与配置变更说明
slug: /zh/deploy/fastgpt-v4132-upgrade-guide-2
page_type: 部署场景
source: https://doc.fastgpt.cn/zh-CN/self-host/upgrading/4-13/4132
source_type: 官方文档
---

# FastGPT V4.13.2版本升级操作与配置变更说明

## 版本核心变更概述
FastGPT V4.13.2版本主要包含环境变量调整、镜像更新、功能新增与问题修复。其中镜像更新需将FastGPT及商业版镜像tag更新为v4.13.2，fastgpt-plugin镜像tag更新为v0.2.4，Sandbox、mcp_server、AIProxy无需升级。该版本对S3存储相关的环境变量进行了统一调整，同时新增了升级脚本用于初始化配置变更。

## 升级操作步骤
1.  **更新镜像**：拉取对应版本的FastGPT、商业版及fastgpt-plugin镜像，tag分别为v4.13.2和v0.2.4，其余组件无需更新。
2.  **配置环境变量**：在FastGPT/FastGPT-pro服务中新增两个环境变量：
    - `S3_PUBLIC_BUCKET=fastgpt-public`：公开读公开桶名称，对应原plugin项目的S3_TOOL_BUCKET
    - `S3_PRIVATE_BUCKET=fastgpt-private`：私有读私有写桶名称，对应原plugin项目的S3_PLUGIN_BUCKET
    同时fastgpt-plugin服务中的`S3_TOOL_BUCKET`需重命名为`S3_PUBLIC_BUCKET`，`S3_PLUGIN_BUCKET`需重命名为`S3_PRIVATE_BUCKET`。
3.  **执行升级脚本**：通过终端发起HTTP请求，替换`{{rootkey}}`为环境变量中的rootkey，`{{host}}`为FastGPT域名：
    ```bash
    curl --location --request POST https://{{host}}/api/admin/initv4132 \
    --header rootkey: {{rootkey}} \
    --header Content-Type: application/json
    ```
    该脚本会删除原S3的circleLife策略，若使用外部S3，可能因不支持该操作报错，可忽略该错误。

## 优化、修复与新增内容
该版本新增HTTP工具集手动创建模式、项目OpenAPI框架、APIKey有效性检测接口，以及导出对话日志时附带当前版本全局变量。优化内容包括限制非管理员查看团队审计日志、使用S3存储应用头像、提升工作流画布性能。修复的问题包括LLM模型默认图片支持导致的请求错误、Mongo多副本切换时watch未重新触发、文本分块最后数据未处理、number=0时变量输入框校验失败、工作流复杂循环并行判断异常。插件方面新增十余种工具，并支持配置系统工具是否在Worker中运行。

> 来源：[FastGPT 官方文档](https://doc.fastgpt.cn/zh-CN/self-host/upgrading/4-13/4132)
