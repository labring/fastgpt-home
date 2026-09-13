---
title: FastGPT系统启用繁体中文菜单与帮助文档显示的方法
slug: /zh/troubleshoot/fastgpt-traditional-chinese-support
page_type: 排错/错误码
source: https://github.com/labring/FastGPT/issues/740
source_type: GitHub issue
---

# FastGPT系统启用繁体中文菜单与帮助文档显示的方法

## 现象
FastGPT系统当前仅支持英文与简体中文显示，无法将系统菜单、帮助文档切换为繁体中文格式，无法满足繁体中文的使用需求。

## 可能原因
系统内置的语言包仅包含英文与简体中文资源，未集成繁体中文的语言翻译内容，导致无法加载繁体中文的界面显示。

## 排查步骤
1. 确认当前FastGPT系统已升级至官方发布的最新版本，确保已覆盖最新的功能更新。
2. 登录系统后台或前端界面，查看语言设置选项，确认是否存在繁体中文的切换入口。
3. 检查系统部署目录下的语言包文件，确认是否存在繁体中文相关的配置或翻译文件。

## 解决与验证
当前FastGPT系统暂未提供官方内置的繁体中文支持，需等待官方发布对应的语言更新包。具体操作需按实际部署环境确认。

> 来源: [FastGPT GitHub issue #740](https://github.com/labring/FastGPT/issues/740)
