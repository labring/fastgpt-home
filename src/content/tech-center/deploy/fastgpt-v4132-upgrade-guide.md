---
title: FastGPT V4.13.2版本升级操作与配置变更说明
slug: /zh/deploy/fastgpt-v4132-upgrade-guide
page_type: 部署场景
source: https://doc.fastgpt.cn/zh-CN/self-host/upgrading/4-13/4132
source_type: 官方文档
---

# FastGPT V4.13.2版本升级操作与配置变更说明

## 版本核心变更
FastGPT V4.13.2版本包含环境变量调整、升级脚本及多项功能优化。本次更新需更新指定镜像版本，同时对S3存储相关的环境变量进行重命名与新增配置。

## 升级操作步骤
1.  **更新镜像**：将FastGPT官方镜像、商业版镜像的tag更新为`v4.13.2`，`fastgpt-plugin`镜像tag更新为`v0.2.4`，`mcp_server`、`Sandbox`、`AIProxy`无需更新。
2.  **配置环境变量**：在FastGPT/FastGPT-pro项目中新增两个环境变量：`S3_PUBLIC_BUCKET=fastgpt-public`（对应原plugin项目的`S3_TOOL_BUCKET`）、`S3_PRIVATE_BUCKET=fastgpt-private`（对应原plugin项目的`S3_PLUGIN_BUCKET`）；同时将`fastgpt-plugin`的环境变量`S3_TOOL_BUCKET`重命名为`S3_PUBLIC_BUCKET`，`S3_PLUGIN_BUCKET`重命名为`S3_PRIVATE_BUCKET`。
3.  **执行升级脚本**：通过任意终端发起POST请求，将`{{rootkey}}`替换为环境变量中的rootkey，`{{host}}`替换为FastGPT域名：
    ```bash
    curl --location --request POST https://{{host}}/api/admin/initv4132 \
    --header rootkey: {{rootkey}} \
    --header Content-Type: application/json
    ```
    该脚本会删除原S3的circleLife策略，若使用外部S3且不支持该操作，可忽略执行报错。

## 新增优化与修复内容
本次更新新增HTTP工具集手动创建模式、OpenAPI框架、APIKey有效性检测接口及带版本全局变量的对话日志导出功能；优化团队审计日志权限（非管理员不可查看）、S3存储应用头像能力及工作流画布性能；修复了LLM图片请求错误、Mongo多副本切换时watch未触发、文本分块LastText未处理、number=0时输入框校验失败、工作流复杂循环并行判断异常等问题。插件端新增十余种工具，同时支持配置系统工具是否在Worker中运行。

> 来源：[FastGPT 官方文档](https://doc.fastgpt.cn/zh-CN/self-host/upgrading/4-13/4132)
