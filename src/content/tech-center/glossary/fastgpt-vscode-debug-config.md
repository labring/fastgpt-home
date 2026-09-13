---
title: 说明FastGPT项目VSCode调试配置的编写方法
slug: /zh/glossary/fastgpt-vscode-debug-config
page_type: 术语表
source: https://github.com/labring/FastGPT/issues/576
source_type: 官方文档
---

# 说明FastGPT项目VSCode调试配置的编写方法

## 一句话定义
FastGPT项目的VSCode调试配置是用于在本地开发环境启动调试的配置文件，可指定调试的运行环境与执行参数。

## 在FastGPT里怎么用
在FastGPT项目的本地开发流程中，可通过以下步骤配置VSCode调试：1. 打开FastGPT项目的VSCode工作区；2. 在.vscode目录下创建或编辑launch.json文件；3. 填入以下标准配置内容：
```json
{
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
该配置的具体参数包括：调试类型为node，请求类型为launch，配置名称为Next.js，跳过node内部模块调试，运行时执行文件为pnpm，调试程序路径为工作区文件夹下的i18next-dev.js，启动参数为dev，工作目录为当前工作区文件夹。

## 容易搞错的地方
常见的配置错误包括：未在.vscode目录下创建launch.json文件，导致VSCode无法识别调试配置；未正确设置program路径，导致调试程序无法被加载；未使用pnpm作为运行时执行文件，导致调试启动失败；未正确配置cwd参数，导致命令执行路径错误。

> 来源： [FastGPT 官方来源](https://github.com/labring/FastGPT/issues/576)

## 适用性与版本范围

本页适用于官方来源记录的 术语表 场景。执行变更前，需核对 FastGPT、依赖、API 与部署版本。

## 安全护栏

凭证与私密数据使用 [REDACTED_CREDENTIAL] 占位符。执行操作前需核对文档的环境与版本。

## 回滚指引

恢复变更前的技术内容权威快照、已保存配置与数据快照，再执行最小验证场景。
