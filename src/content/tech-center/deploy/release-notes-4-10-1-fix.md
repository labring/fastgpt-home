---
title: FastGPT v4.10.1-fix版本修复内容及升级操作说明
slug: /zh/deploy/release-notes-4-10-1-fix
page_type: 版本解读
source: https://github.com/labring/FastGPT/releases/tag/v4.10.1-fix
source_type: 官方文档
---

# FastGPT v4.10.1-fix版本修复内容及升级操作说明

## 这个版本改了什么
本版本主要修复无法兼容旧版全局变量的单选框属性导致原单选框数据丢失的问题。同步完成多项功能优化与维护：更新版本文档，修复集合搜索功能，增强微信登录功能，兼容旧枚举类型，添加项目单元测试，同时存在相关枚举兼容功能的回退与重新提交操作。此外，@dingzhenznen 成为本版本的首次贡献者。

## 升级前要确认的事
升级前需确认当前系统存在旧版全局变量单选框配置丢失、集合搜索异常或微信登录功能异常的场景，确保升级后可针对性解决对应问题。

## 升级步骤（照做）
停止当前FastGPT服务，拉取镜像labring/fastgpt:v4.10.1-fix，更新服务配置使用该镜像，启动服务。

## 升级后怎么验证
登录系统检查全局变量的单选框配置是否可正常加载原有数据，测试集合搜索功能是否可正常返回结果，完成微信登录流程确认功能正常，查看系统日志无相关异常报错。

> 来源: [FastGPT release notes](https://github.com/labring/FastGPT/releases/tag/v4.10.1-fix)
