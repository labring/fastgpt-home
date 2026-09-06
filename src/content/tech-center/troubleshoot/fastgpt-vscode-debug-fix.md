---
title: 解决VS Code中FastGPT调试配置启动异常的问题
slug: /zh/troubleshoot/fastgpt-vscode-debug-fix
page_type: 排错/错误码
source: https://github.com/labring/FastGPT/issues/576
source_type: GitHub issue
---

# 解决VS Code中FastGPT调试配置启动异常的问题

## 现象
使用该VS Code Node调试配置启动FastGPT相关调试时，出现启动失败或文件找不到、命令执行异常等问题。配置包含type为node，runtimeExecutable为pnpm，program指向${workspaceFolder}/node_modules/i18next/bin/i18next-dev.js，args为dev，cwd为工作区目录。

## 可能原因
1. 工作区未安装i18next依赖，导致指定的i18next-dev.js文件不存在。
2. 系统未配置pnpm运行环境，无法执行配置中的pnpm命令。
3. 调试配置中的program路径与实际文件路径不匹配。
4. VS Code当前工作区与配置中的cwd目录不一致。

## 排查步骤
1. 检查当前工作区的node_modules目录，确认是否存在i18next包及bin/i18next-dev.js文件。
2. 在命令行执行pnpm --version，确认pnpm已正确安装并可被调用。
3. 查看VS Code当前打开的工作区目录，确保与配置中的${workspaceFolder}路径一致。
4. 在命令行进入工作区目录，执行pnpm dev命令，验证该命令是否可正常启动项目。

## 解决与验证
针对排查出的问题进行修正。若i18next依赖缺失，执行pnpm install i18next安装依赖；若pnpm未配置，按官方指引完成安装与配置；若路径不匹配，修正program字段的路径为实际存在的文件路径；若工作区目录不一致，调整VS Code工作区或配置中的cwd字段。修正后，重新使用该调试配置启动调试，确认项目可正常启动且无异常。

> 来源: [FastGPT GitHub issue #576](https://github.com/labring/FastGPT/issues/576)
