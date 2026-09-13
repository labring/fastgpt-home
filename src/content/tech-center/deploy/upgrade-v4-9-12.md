---
title: FastGPT V4.9.12版本升级内容与操作说明
slug: /zh/deploy/upgrade-v4-9-12
page_type: 部署与升级
source: https://doc.fastgpt.cn/zh-CN/self-host/upgrading/outdated/4912
source_type: 官方文档
---

# FastGPT V4.9.12版本升级内容与操作说明

## 这个版本改了什么
本版本包含新增功能、体验优化与问题修复。新增功能包括：AI proxy监控完善，支持以图表或表格形式查看模型调用和性能情况；HTTP节点和MCP支持单独鉴权配置，鉴权配置明文不会二次返回客户端；问题分类和内容提取的提示词自动加入上一轮结果进行引导；判断器支持变量引用；商业版支持知识库分块时LLM自动分段识别；新增Admin管理员数据看板；更新豆包1.6系列模型及qwen模型配置。优化项包括：密码校验增加更多特殊字符；后端全量计算知识库chunk参数，避免自动模式下部分参数未正确使用默认值；将文本分块移至worker线程，避免阻塞；展示更多套餐用量信息；优化输入框样式，更新桌面和移动端语音输入样式；MCP工具调用使用Raw schema保障完整性；删除知识库文件时，文件不存在不会阻断删除；升级MCP SDK兼容最新HTTPStreamable；语雀文档库支持递归获取文档类型目录下的数据。修复问题包括：自定义问答提取提示词被覆盖的问题；模板导入时空indexes导致数据插入失败的问题；登录页可能存在的XSS攻击问题；输入框语音输入时丢失文件列表的问题；知识库文档中图片TTL字段未清除导致图片过期的问题；MCP工具存储时未转义int类型数据的问题。

## 升级前要确认的事
升级前需确认需配置的环境变量与各组件的更新范围。需在fastgpt和fastgpt-pro镜像的环境变量中加入AES256_SECRET_KEY=变量。本次升级仅需更新FastGPT、FastGPT商业版与AIProxy镜像，mcp_server与Sandbox无需执行更新操作。

## 升级步骤（照做）
1. 配置环境变量：在fastgpt和fastgpt-pro镜像环境变量中加入AES256_SECRET_KEY=变量。
2. 更新镜像：将FastGPT镜像tag更新为v4.9.12；将FastGPT商业版镜像tag更新为v4.9.12；将AIProxy镜像tag更新为v0.2.2。mcp_server与Sandbox无需更新。

## 升级后怎么验证
1. 检查fastgpt与fastgpt-pro镜像的环境变量中已添加AES256_SECRET_KEY=变量。
2. 确认各镜像tag正确：FastGPT与FastGPT商业版镜像为v4.9.12，AIProxy镜像为v0.2.2。
3. 测试AIProxy监控页面，确认可通过图表或表格查看模型调用和性能情况。
4. 测试HTTP节点与MCP的鉴权配置，确认配置明文不会返回至客户端。
5. 测试知识库分块、管理员数据看板、语音输入等功能，确认运行正常。

> 来源： [FastGPT 官方来源](https://doc.fastgpt.cn/zh-CN/self-host/upgrading/outdated/4912)

## 适用性与版本范围

本页适用于官方来源记录的 部署与升级 场景。执行变更前，需核对 FastGPT、依赖、API 与部署版本。

## 安全护栏

凭证与私密数据使用 [REDACTED_CREDENTIAL] 占位符。执行操作前需核对文档的环境与版本。

## 回滚指引

恢复变更前的技术内容权威快照、已保存配置与数据快照，再执行最小验证场景。
