---
title: FastGPT V4.9.9版本升级内容与操作步骤说明
slug: /zh/deploy/upgrade-v4-9-9
page_type: 版本解读
source: https://doc.fastgpt.cn/zh-CN/self-host/upgrading/outdated/499
source_type: 官方文档
---

# FastGPT V4.9.9版本升级内容与操作步骤说明

本文记录历史版本的配置与变更，适用于定位该版本的升级背景。部署与升级时，请结合当前安装版本的官方发布说明核对依赖、配置格式和迁移步骤。

## 这个版本改了什么
包含新增内容、优化项与修复问题。新增内容包括：切换SessionId替代JWT实现登录鉴权，可控制最大登录客户端数量；新的商业版License管理模式；公众号调用显示记录chat对话错误，方便排查；API知识库支持BasePath选择，需增加API接口，具体可见../../../guide/dataset/third-party/api_dataset.mdx#4-获取文件详情。优化项包括：优化工具调用的新工具判断逻辑；调整Cite引用提示词。修复问题包括：无法正常获取应用历史保存/发布记录；成员创建MCP工具权限问题；来源引用展示存在ID传递错误，导致提示无权操作该文件；回答标注前端数据报错。

## 升级前要确认的事
需提前做好数据备份。商业版用户需联系FastGPT团队支持同学，获取License替换方案。

## 升级步骤（照做）
1. 做好数据备份。
2. 商业版用户完成License替换后，升级系统时管理后台会提示输入新License。
3. 更新镜像tag：将FastGPT镜像tag设为v4.9.9，FastGPT商业版镜像tag设为v4.9.9。mcp_server、Sandbox、AIProxy无需更新。

## 升级后怎么验证
可通过以下方式验证升级效果：确认登录鉴权逻辑变更，可配置最大登录客户端数量；商业版用户确认管理后台可正常提示输入新License；测试公众号调用，查看是否正常记录chat对话错误；测试API知识库，确认支持BasePath选择；检查应用历史保存/发布记录能否正常获取；测试成员创建MCP工具，确认权限正常；查看来源引用展示，无ID传递错误导致的无权操作提示；测试回答标注，确认前端无数据报错。

> 来源: [FastGPT 官方文档与源码](https://doc.fastgpt.cn/zh-CN/self-host/upgrading/outdated/499)
