---
title: FastGPT 4.6.3版本知识库简介保存后不显示的问题排查
slug: /zh/troubleshoot/fastgpt-kb-intro-display-problem
page_type: 故障排查
source: https://github.com/labring/FastGPT/issues/579
source_type: GitHub issue
---

# FastGPT 4.6.3版本知识库简介保存后不显示的问题排查

## 现象
使用docker-compose部署的FastGPT 4.6.3版本中，在知识库配置页面设置intro字段，点击保存后页面提示更新成功，但返回知识库列表页时，简介展示仍为空。
## 可能原因
目前无明确指向的已知诱因，需结合实际部署环境、代码逻辑与数据存储情况排查。
## 排查步骤
1. 确认当前使用的FastGPT版本为4.6.3，且采用docker-compose部署方式。
2. 重新进入出现问题的知识库配置页面，检查intro字段的输入内容，再次执行保存操作并确认页面弹出更新成功的提示。
3. 刷新知识库列表页，观察简介的展示状态。
4. 核对对应知识库的配置数据，确认intro字段的存储值是否正确。
## 解决与验证
若为数据同步延迟问题，刷新页面或重启相关服务即可恢复显示。若为配置字段绑定或存储异常，需结合部署代码与数据库配置进行修正。验证方式为再次保存intro字段，确认列表页正确显示输入内容。
> 来源： [FastGPT 官方来源](https://github.com/labring/FastGPT/issues/579)

## 适用性与版本范围

本页适用于官方来源记录的 故障排查 场景。执行变更前，需核对 FastGPT、依赖、API 与部署版本。

## 安全护栏

凭证与私密数据使用 [REDACTED_CREDENTIAL] 占位符。执行操作前需核对文档的环境与版本。

## 回滚指引

恢复变更前的技术内容权威快照、已保存配置与数据快照，再执行最小验证场景。
