---
title: FastGPT V4.6.5版本升级配置变更与功能详细说明
slug: /zh/deploy/upgrade-v4-6-5
page_type: 部署与升级
source: https://doc.fastgpt.cn/zh-CN/self-host/upgrading/outdated/465
source_type: 官方文档
---

# FastGPT V4.6.5版本升级配置变更与功能详细说明

## 这个版本改了什么
本版本包含配置文件变更与功能更新两部分。配置层面，因OpenAI弃用function call改用toolChoice，需将config.json中的functionCall字段修改为toolChoice；设置为true的模型将默认使用OpenAI tools模式，未设置或设置为false的模型将使用提示词生成模式。问题优化模型与内容提取模型使用同一组配置，同时新增"ReRankModels": []配置项。功能层面，新增问题优化、文本编辑、判断器、自定义反馈四个工作流模块，内容提取模块支持选择模型与设置字段枚举；优化docx读取功能，兼容表格转换为markdown格式，优化高级编排连接线交互，修复html2md导致的CPU密集计算阻断线程问题，修复高级编排提示词提取描述问题。

## 升级前要确认的事
升级前需备份原有config.json配置文件，确认文件中存在functionCall字段及相关模型配置；确认旧版config.json配置说明不再维护，需参考官方最新的模型配置方案；确认业务涉及docx文件上传、高级编排流程、内容提取等场景，需适配本次配置变更。

## 升级步骤（照做）
1. 备份原有config.json配置文件，避免配置丢失。
2. 打开config.json文件，将所有functionCall字段修改为toolChoice。
3. 在配置文件中添加"ReRankModels": []配置项。
4. 重启FastGPT服务，加载新的配置文件。

## 升级后怎么验证
1. 查看服务启动日志，确认无配置相关报错信息。
2. 调用支持toolChoice的模型，测试工具调用功能是否正常。
3. 进入工作流编排页面，确认新增的四个模块可正常添加与配置。
4. 上传包含表格的docx文件，确认表格可正确转换为markdown格式。
5. 在高级编排中测试连接线交互是否正常。
6. 创建内容提取节点，确认可选择模型并设置字段枚举。

> 来源： [FastGPT 官方来源](https://doc.fastgpt.cn/zh-CN/self-host/upgrading/outdated/465)

## 适用性与版本范围

本页适用于官方来源记录的 部署与升级 场景。执行变更前，需核对 FastGPT、依赖、API 与部署版本。

## 安全护栏

凭证与私密数据使用 [REDACTED_CREDENTIAL] 占位符。执行操作前需核对文档的环境与版本。

## 回滚指引

恢复变更前的技术内容权威快照、已保存配置与数据快照，再执行最小验证场景。
