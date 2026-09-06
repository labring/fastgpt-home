---
title: FastGPT V4.8.14版本升级内容与操作步骤说明
slug: /zh/deploy/upgrade-v4-8-14
page_type: 部署与升级
source: https://doc.fastgpt.cn/zh-CN/self-host/upgrading/outdated/4814
source_type: 官方文档
---

# FastGPT V4.8.14版本升级内容与操作步骤说明

## 这个版本改了什么
新增自动触发工作流功能，支持用户加载对话时自动触发一轮工作流，可用于快速引导用户使用。重写chatContext模块，对话测试新增日志记录且刷新后不会丢失对话内容。新增分享链接查看原文配置选项、doc2x插件、繁体中文语言包，分析链接与chat API支持传入自定义uid。商业版新增微软oauth登录功能。优化工作流UI细节、应用编辑记录采用diff存储避免浏览器溢出、代码入口新增register入口无需等待首次访问执行、工作流缺失值检查逻辑、知识库训练最大重试次数限制、图片路径与示意图任务、Milvus描述。修复四级标题丢失问题并新增五级标题支持、MongoDB知识库集合唯一索引、反选知识库引用报错、简易模式转工作流未使用最新编辑记录、表单输入说明文字不显示、API无法使用base64图片等问题。

## 升级前要确认的事
升级前需完成数据备份。确认需更新的镜像信息：FastGPT镜像tag为v4.8.14-fix，FastGPT商业版fastgpt-pro镜像tag为v4.8.14，Milvus镜像使用v4.8.14-milvus-fix，Sandbox镜像可无需更新。

## 升级步骤（照做）
1. 完成数据备份。
2. 修改镜像配置：更新FastGPT镜像tag为v4.8.14-fix；更新FastGPT商业版镜像tag为v4.8.14（fastgpt-pro镜像）；Sandbox镜像可无需更新；milvus版本使用v4.8.14-milvus-fix镜像。

## 升级后怎么验证
验证工作流配置页面新增自动触发选项。检查对话测试日志正常生成且刷新后不丢失对话内容。测试分享链接可配置查看原文权限。确认繁体中文界面正常显示。验证分析链接与chat API可传入自定义uid。商业版用户确认微软oauth登录功能可用。检查知识库四级、五级标题处理正常。验证API可正常使用base64图片。

> 来源： [FastGPT 官方来源](https://doc.fastgpt.cn/zh-CN/self-host/upgrading/outdated/4814)

## 适用性与版本范围

本页适用于官方来源记录的 部署与升级 场景。执行变更前，需核对 FastGPT、依赖、API 与部署版本。

## 安全护栏

凭证与私密数据使用 [REDACTED_CREDENTIAL] 占位符。执行操作前需核对文档的环境与版本。

## 回滚指引

恢复变更前的技术内容权威快照、已保存配置与数据快照，再执行最小验证场景。
