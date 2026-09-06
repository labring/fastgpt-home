---
title: FastGPT v4.9.9版本升级内容与操作验证说明
slug: /zh/deploy/release-notes-4-9-9
page_type: 版本解读
source: https://github.com/labring/FastGPT/releases/tag/v4.9.9
source_type: 官方文档
---

# FastGPT v4.9.9版本升级内容与操作验证说明

## 这个版本改了什么
新增内容包括：使用SessionId替代JWT实现登录鉴权，支持控制最大登录客户端数量；新增商业版License管理模式；公众号调用时显示聊天对话错误记录，便于排查问题；API知识库支持BasePath选择，需新增对应API接口，详情参考[API知识库介绍](https://doc.tryfastgpt.ai/docs/guide/knowledge_base/api_dataset/#4-获取文件详细信息用于获取文件信息)。优化内容包括：优化工具调用的新工具判断逻辑，调整Cite引用提示词。修复内容包括：修复无法正常获取应用历史保存/发布记录的问题；修复成员创建MCP工具的权限问题；修复来源引用展示时ID传递错误导致无权操作文件的问题；修复回答标注前端数据报错的问题；修复monaco editor默认值错误导致页面崩溃的问题。

## 升级前要确认的事
升级前需确认当前运行的FastGPT版本为v4.9.8；商业版用户需提前适配新的License管理模式；API知识库使用者需提前准备支持BasePath选择的API接口；确认登录客户端数量的控制策略符合业务需求。

## 升级步骤（照做）
按照FastGPT官方发布的v4.9.9版本升级流程完成部署，替换为对应版本的代码包或镜像。

## 升级后怎么验证
可通过以下方式验证版本升级是否成功：登录系统，验证新的登录鉴权逻辑可正常控制登录客户端数量；商业版用户验证License管理功能正常运行；调用公众号功能，触发对话错误时可正常显示错误记录；配置API知识库的BasePath，验证可正常获取文件信息；查看应用历史保存/发布记录，确认可正常获取；验证成员创建MCP工具的权限配置正常；查看来源引用内容，确认无ID传递错误导致的无权操作问题；进行回答标注操作，确认无前端数据报错；打开monaco editor组件，确认页面无崩溃问题。

> 来源: [FastGPT release notes](https://github.com/labring/FastGPT/releases/tag/v4.9.9)
