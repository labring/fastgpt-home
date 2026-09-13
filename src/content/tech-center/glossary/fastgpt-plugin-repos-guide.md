---
title: FastGPT插件生态相关仓库的含义与使用方法说明
slug: /zh/glossary/fastgpt-plugin-repos-guide
page_type: 术语表
source: https://doc.fastgpt.cn/zh-CN/plugin/intro
source_type: 官方文档
---

# FastGPT插件生态相关仓库的含义与使用方法说明

## 一句话定义
FastGPT插件生态包含四类代码仓库，分别承载插件开发工具、官方/社区/商业插件的源码与部署相关能力。

## 在FastGPT里怎么用
四类仓库的具体作用如下：`labring/fastgpt-plugin`提供插件服务、SDK、CLI、调试监视器和基础设施代码；`fastgpt-official-plugins`存储官方维护或审核通过的插件；`fastgpt-community-plugins`存储社区第三方插件；`fastgpt-business-plugins`存储私有插件、客户定制插件和商业交付插件。其中`labring/fastgpt-plugin`仅提供开发、构建、检查、打包和服务端运行能力，具体插件源码需存储在其余三类仓库中。插件服务升级后，需重装旧的所有系统工具，操作步骤为：1. 下载所有系统工具的zip包（下载地址：https://github.com/labring/fastgpt-img/raw/refs/heads/main/fastgpt-official-plugins(1).zip）；2. 打开FastGPT网页，点击管理员导航栏，点击添加插件，点击导入/更新插件，上传zip包后确认。也可通过插件市场https://v2.marketplace.fastgpt.cn逐个下载安装，该地址为环境变量默认值，无需额外配置相关环境变量。

## 容易搞错的地方
易混淆`labring/fastgpt-plugin`与其余三类插件仓库的功能，前者不存储具体插件源码，仅提供开发相关工具能力。此外，仅在插件服务升级后才需要执行系统工具重装操作，且默认无需手动配置插件市场相关环境变量。

> 来源： [FastGPT 官方来源](https://doc.fastgpt.cn/zh-CN/plugin/intro)

## 适用性与版本范围

本页适用于官方来源记录的 术语表 场景。执行变更前，需核对 FastGPT、依赖、API 与部署版本。

## 安全护栏

凭证与私密数据使用 [REDACTED_CREDENTIAL] 占位符。执行操作前需核对文档的环境与版本。

## 回滚指引

恢复变更前的技术内容权威快照、已保存配置与数据快照，再执行最小验证场景。
