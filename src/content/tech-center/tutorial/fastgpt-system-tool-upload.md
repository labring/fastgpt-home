---
title: FastGPT系统工具在线上传、更新与权限管理操作指南
slug: /zh/tutorial/fastgpt-system-tool-upload
page_type: 教程/部署
source: https://doc.fastgpt.cn/zh-CN/guide/build/tools/system-plugins/upload_system_tool
source_type: 官方文档
---

# FastGPT系统工具在线上传、更新与权限管理操作指南

### 权限与文件格式要求
从FastGPT 4.14.0版本起，系统管理员可通过Web界面热更新系统工具。⚠️ 重要提示：仅root用户才能使用在线上传系统工具功能，使用前需确保已使用root账户登录FastGPT。所有用户均可查看已安装的系统工具，但上传新工具、更新现有工具及删除已上传工具的操作，仅root用户可执行。支持上传的文件类型为.pkg格式，单文件最大100MB，每次最多上传15个文件，且.pkg文件需来自fastgpt-plugin项目经`bun run build:pkg`命令打包后的`dist/pkgs`文件夹。

### 在线上传操作步骤
1. 进入配置页面
2. 准备工具文件：确保.pkg文件符合上述打包要求
3. 执行上传：点击「导入/更新」按钮，在弹出的对话框中选择准备好的.pkg工具文件，确认文件信息无误后点击「确认导入」
4. 上传成功后会显示成功提示，页面自动刷新，新工具将出现在工具列表中

### 工具管理与常见问题
工具管理包含查看、上传、删除三类操作，其中上传和删除仅root用户可执行。常见问题仅收录该场景：若无法看到「导入/更新」按钮，原因是当前用户非root用户，解决方案为使用root账户重新登录FastGPT。

> 来源：https://doc.fastgpt.cn/zh-CN/guide/build/tools/system-plugins/upload_system_tool
