---
title: FastGPT V4.6.3版本升级操作与变更说明
slug: /zh/deploy/upgrade-v4-6-3
page_type: 部署与升级
source: https://doc.fastgpt.cn/zh-CN/self-host/upgrading/outdated/463
source_type: 官方文档
---

# FastGPT V4.6.3版本升级操作与变更说明

## 这个版本改了什么
本版本新增多项功能与优化。商业版新增web站点同步功能；新增集合元数据记录功能；优化URL读取内容、流读取文件逻辑以防止内存溢出；优化4v模型自动将URL转base64的逻辑，支持本地调试；优化图片压缩等级；修复图片压缩失败报错问题，防止文件读取过程卡死。

## 升级前要确认的事
需确认已获取环境变量中的rootkey值，以及当前FastGPT部署的访问域名，用于替换初始化API请求中的对应参数。

## 升级步骤（照做）
执行以下HTTP POST请求，替换`{{host}}`为实际部署的FastGPT访问域名，`{{rootkey}}`为环境变量中配置的rootkey值：
```bash
curl --location --request POST 'https://{{host}}/api/admin/initv463' \
--header 'rootkey: {{rootkey}}' \
--header 'Content-Type: application/json'
```
该请求用于初始化Mongo数据库中dataset、collection和data的部分字段。

## 升级后怎么验证
可通过以下方式验证升级效果：测试URL读取内容功能是否正常；测试图片上传压缩流程，确认无报错且流程顺畅；商业版用户可测试web站点同步功能是否可用；确认集合元数据记录已正常生成。

> 来源： [FastGPT 官方来源](https://doc.fastgpt.cn/zh-CN/self-host/upgrading/outdated/463)

## 适用性与版本范围

本页适用于官方来源记录的 部署与升级 场景。执行变更前，需核对 FastGPT、依赖、API 与部署版本。

## 安全护栏

凭证与私密数据使用 [REDACTED_CREDENTIAL] 占位符。执行操作前需核对文档的环境与版本。

## 回滚指引

恢复变更前的技术内容权威快照、已保存配置与数据快照，再执行最小验证场景。
