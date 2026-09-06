---
title: 说明FastGPT中group参数相关的HTTP插件请求失败问题
slug: /zh/glossary/fastgpt-group-parameter-failure
page_type: 术语表
source: https://github.com/labring/FastGPT/issues/4066
source_type: 官方文档
---

# 说明FastGPT中group参数相关的HTTP插件请求失败问题

## 一句话定义
在FastGPT 4.9版本中，group是HTTP插件请求体中的分组标识参数，当请求体包含未转义换行符时会触发请求失败。

## 在FastGPT里怎么用（参数 / 位置 / 步骤）
group参数以group_id的形式出现在HTTP插件的请求体中，用于标识请求所属分组。当请求体的msg字段包含未转义的换行符时，会生成不符合标准的JSON内容，触发报错Invalid JSON body。对应的异常请求体示例为{"subagent": "*", "msg": "你好\n你是谁", "group_id": 10404621, "username": "zhengtianyun", "source": ""}，其中group_id的取值为10404621。

## 容易搞错的地方
容易直接将换行符写入请求体的msg字段，未意识到JSON字符串中的换行符需要转义处理。未转义的换行符会破坏整个请求体的JSON语法结构，导致请求无法正常发起，进而影响group参数的正常传递。

> 来源： [FastGPT 官方来源](https://github.com/labring/FastGPT/issues/4066)

## 适用性与版本范围

本页适用于官方来源记录的 术语表 场景。执行变更前，需核对 FastGPT、依赖、API 与部署版本。

## 安全护栏

凭证与私密数据使用 [REDACTED_CREDENTIAL] 占位符。执行操作前需核对文档的环境与版本。

## 回滚指引

恢复变更前的技术内容权威快照、已保存配置与数据快照，再执行最小验证场景。
