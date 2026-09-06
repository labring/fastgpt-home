---
title: FastGPT本地部署调试配置与新建工作流报错处理
slug: /zh/glossary/fastgpt-local-debug-error-resolution
page_type: 术语表
source: https://github.com/labring/FastGPT/issues/576
source_type: 官方文档
---

# FastGPT本地部署调试配置与新建工作流报错处理

## 一句话定义
本页内容涵盖FastGPT本地开发的VSCode调试配置方法，以及v4.8.11私有部署版本新建工作流时的常见报错处理方案。

## 在 FastGPT 里怎么用
### 本地调试配置
可通过如下VSCode的launch.json配置文件完成本地调试，配置内容如下：
```json
{
    // Use IntelliSense to learn about possible attributes.
    // Hover to view descriptions of existing attributes.
    // For more information, visit: https://go.microsoft.com/fwlink/?linkid=830387
    "version": "0.2.0",
    "configurations": [
        {
            "type": "node",
            "request": "launch",
            "name": "Next.js",
            "skipFiles": [
                "<node_internals>/**"
            ],
            "runtimeExecutable": "pnpm",
            "program": "${workspaceFolder}/node_modules/i18next/bin/i18next-dev.js",
            "args": [
                "dev"
            ],
            "cwd": "${workspaceFolder}"
        }
    ]
}
```
### 新建工作流报错处理
在v4.8.11私有部署版本中，执行工作台-新建-工作流-创建空白工作流操作时，会触发报错文本为`Application error: a client-side exception has occurred (see the browser console for more information)`的客户端异常，需查看浏览器控制台获取详细异常信息。

## 容易搞错的地方
调试配置时需确保工作区路径与项目根目录一致，避免program路径配置错误导致调试无法启动。新建工作流报错时，需优先确认部署版本为v4.8.11私有部署版本，不可直接跳过浏览器控制台的异常查看步骤。此外，需确认已完成相关部署前的检查项，避免因前置配置缺失引发报错。

> 来源： [FastGPT 官方来源](https://github.com/labring/FastGPT/issues/576)

> 来源： [FastGPT 官方来源](https://github.com/labring/FastGPT/issues/2959)

## 适用性与版本范围

本页适用于官方来源记录的 术语表 场景。执行变更前，需核对 FastGPT、依赖、API 与部署版本。

## 安全护栏

凭证与私密数据使用 [REDACTED_CREDENTIAL] 占位符。执行操作前需核对文档的环境与版本。

## 回滚指引

恢复变更前的技术内容权威快照、已保存配置与数据快照，再执行最小验证场景。
