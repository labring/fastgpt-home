---
title: FastGPT插件系统的安装、管理与使用边界说明
slug: /zh/tutorial/fastgpt-plugin-management-guide
page_type: 教程/部署
source: https://doc.fastgpt.cn/zh-CN/plugin/intro
source_type: 官方文档
---

# FastGPT插件系统的安装、管理与使用边界说明

## 插件系统背景与核心设计目标
原先FastGPT的系统插件伴随主服务发版，限制了迭代速度；社区贡献需提交PR、维护fork，且Next.js/webpack构建模型不支持运行时挂载新插件。因此FastGPT将系统插件拆分至独立仓库fastgpt-plugin，重构后的插件系统核心目标包括：解耦模块化以支持独立迭代，使用.pkg文件统一插件包协议，实现运行时隔离，降低开发复杂度，以及通过Marketplace集中分发插件。

## 插件安装与管理操作步骤
插件安装主要有两种方式：系统级安装需由root用户或系统管理员在插件管理页面上传.pkg文件，或从插件市场安装，安装后全系统可见；团队级安装仅团队管理员或拥有插件管理权限的成员可操作，安装后仅团队内可见。安装完成后，系统会保存插件包文件、解析元信息，启用时将插件注册到运行时。系统管理员可管理插件状态（正常、即将下线、已下线），系统级插件可配置系统密钥，调用方通过插件配置引用密钥，无需接触明文。.pkg插件包需包含dist/index.js、dist/manifest.json、图标文件，可选包含README.md与assets目录，用于上传、安装与版本管理。当前默认运行时为local-pool，按单插件service维度管理Pod与请求队列，插件调用时优先选择已有可用Pod。

## 插件使用边界与注意事项
FastGPT Marketplace仅作为SaaS分发渠道，不提供私有化部署版本。社区插件需提交至fastgpt-community-plugins仓库，经基础审核后才可进入Marketplace。当前云服务版本暂不支持用户直接上传自定义插件，第三方自定义插件仅可通过自部署或商业版的管理员上传方式使用。此外，新版系统工具不再依赖旧的modules/tool/packages内置源码目录，需通过.pkg文件交付插件。

> 来源：https://doc.fastgpt.cn/zh-CN/plugin/intro
