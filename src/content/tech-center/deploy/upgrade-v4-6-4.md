---
title: FastGPT V4.6.4版本升级操作与功能变更说明
slug: /zh/deploy/upgrade-v4-6-4
page_type: 部署与升级
source: https://doc.fastgpt.cn/zh-CN/self-host/upgrading/outdated/464
source_type: 官方文档
---

# FastGPT V4.6.4版本升级操作与功能变更说明

## 这个版本改了什么
重写分享链接身份逻辑，采用localID记录用户ID。
商业版新增分享链接SSO方案，通过身份鉴权地址，仅需3个接口即可接入已有用户系统，参考分享链接身份鉴权文档。
新增分享链接更多嵌入方式提示，支持更多DIY方式。
优化历史记录模块，弃用旧模块，直接在对应位置填写数值。
调整知识库搜索模块topk逻辑，采用MaxToken计算，兼容不同长度文本块。
调整鉴权顺序，提高apikey优先级，避免cookie抢占apikey鉴权。
链接读取支持多选择器，参考Web站点同步用法文档。
修复分享链接图片上传鉴权问题。
修复Mongo连接池未释放问题。
修复Dataset Intro无法更新问题。
修复md代码块问题。
修复root权限问题。
优化docker file。

## 升级前要确认的事
需确认已获取环境变量中的rootkey值，以及自身部署的FastGPT服务的域名host。需确保可正常发起HTTP POST请求至目标服务地址。

## 升级步骤（照做）
替换以下curl命令中的{{host}}为自身部署的域名，{{rootkey}}替换为环境变量中的rootkey值：
```bash
curl --location --request POST 'https://{{host}}/api/admin/initv464' \
--header 'rootkey: {{rootkey}}' \
--header 'Content-Type: application/json'
```
执行替换后的命令，发起初始化请求。

## 升级后怎么验证
确认初始化请求执行成功，可通过数据库检查PG数据库相关表的createTime字段、Mongo数据库chat集合的feedback字段已完成初始化。测试分享链接功能，确认身份验证逻辑正常，图片上传鉴权无异常。测试知识库搜索功能，确认搜索结果按MaxToken计算的topk逻辑生效。测试apikey鉴权，确认apikey优先级高于cookie鉴权。检查Dataset Intro可正常更新，md代码块渲染无异常，root权限操作正常。确认Mongo连接池运行正常，无未释放问题。

> 来源： [FastGPT 官方来源](https://doc.fastgpt.cn/zh-CN/self-host/upgrading/outdated/464)

## 适用性与版本范围

本页适用于官方来源记录的 部署与升级 场景。执行变更前，需核对 FastGPT、依赖、API 与部署版本。

## 安全护栏

凭证与私密数据使用 [REDACTED_CREDENTIAL] 占位符。执行操作前需核对文档的环境与版本。

## 回滚指引

恢复变更前的技术内容权威快照、已保存配置与数据快照，再执行最小验证场景。
