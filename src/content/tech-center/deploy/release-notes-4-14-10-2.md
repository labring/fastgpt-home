---
title: FastGPT v4.14.10.2版本升级内容与操作说明
slug: /zh/deploy/release-notes-4-14-10-2
page_type: 版本解读
source: https://github.com/labring/FastGPT/releases/tag/v4.14.10.2
source_type: 官方文档
---

# FastGPT v4.14.10.2版本升级内容与操作说明

## 这个版本改了什么
本版本修复多项功能与配置问题，优化部署相关设置。具体包括修复聊天代理模型被重置为默认模型的问题；修复env.template文件中aiproxy地址的协议配置；优化dev.yml文件，使其与env.template对齐；合入技能测试相关代码。同时调整Docker Compose相关配置，修复命令语法问题，更新Docker Compose文件使用命名卷，重命名服务与容器名称保持一致性，更新OpenSandbox版本与镜像仓库，重构聊天模块的沙箱状态逻辑并解耦UI与状态钩子，更新.env.template文件，将FastGPT镜像标签调整为v4.14.9.5，修复模型刷新问题，新增Agent技能开发相关代码，完成版本号更新。本次版本新增两名首次贡献的开发者。

## 升级前要确认的事
升级前需确认当前运行的FastGPT版本为v4.14.10.1；确认部署环境使用Docker Compose；检查现有env.template文件中的aiproxy地址协议配置；确认聊天代理模型的自定义配置，避免升级后出现配置异常。

## 升级步骤（照做）
1. 拉取FastGPT v4.14.10.2版本的代码与镜像，镜像标签为v4.14.9.5。
2. 停止当前运行的FastGPT相关容器与服务。
3. 替换dev.yml文件，使其与env.template对齐。
4. 更新.env.template文件至最新版本。
5. 执行docker-compose up -d命令启动服务。

## 升级后怎么验证
1. 进入FastGPT平台的聊天代理配置页面，确认自定义模型未被重置为默认模型。
2. 检查env.template文件中的aiproxy地址协议配置是否正常生效。
3. 执行模型刷新操作，确认功能无报错。
4. 启动聊天沙箱功能，确认状态逻辑与UI显示正常。
5. 查看Docker容器日志，确认服务启动无语法错误，容器与服务名称符合最新配置。

> 来源: [FastGPT release notes](https://github.com/labring/FastGPT/releases/tag/v4.14.10.2)
