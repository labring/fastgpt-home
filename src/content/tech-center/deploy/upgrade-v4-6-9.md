---
title: FastGPT V4.6.9版本升级内容与操作验证指南
slug: /zh/deploy/upgrade-v4-6-9
page_type: 部署与升级
source: https://doc.fastgpt.cn/zh-CN/self-host/upgrading/outdated/469
source_type: 官方文档
---

# FastGPT V4.6.9版本升级内容与操作验证指南

## 这个版本改了什么
功能新增包括商业版知识库新增“增强处理”训练模式，HTTP模块完善变量提示并支持OpenAI单接口导入，全局变量支持通过分享链接Query或API的variables参数传入外部变量，内容提取模块增加默认值。优化项包括问题补全新增英文类型并可设置为独立复用模块，重写计量模式，Token过滤历史记录保持偶数条以避免部分模型报错，优化分享链接SEO可直接展示应用名和头像。修复项包括标注功能、qa生成线程计数错误、问题分类连线类型错误。此外商业版环境变量新增oneapi地址和令牌配置项，分享链接对话上报接口调整：price字段替换为totalPoints字段，不再提供inputToken和outputToken，仅保留总token数量的token字段。

## 升级前要确认的事
需要获取部署环境中的rootkey环境变量，知晓当前FastGPT应用的访问域名。商业版部署需提前准备OneAPI的地址与令牌，用于后续配置新增的环境变量。

## 升级步骤（照做）
1.  修改商业版环境变量，添加以下配置：
```
OPENAI_BASE_URL=http://oneapi:3000/v1
CHAT_API_KEY=[REDACTED_CREDENTIAL]
```
2.  在任意终端执行初始化HTTP请求，将`{{rootkey}}`替换为环境变量中的rootkey，`{{host}}`替换为应用的访问域名：
```bash
curl --location --request POST 'https://{{host}}/api/admin/initv469' \
--header 'rootkey: {{rootkey}}' \
--header 'Content-Type: application/json'
```
该请求执行后会自动重置计量表，并执行脏数据清理，包括清理无效的文件、无效的图片、无效的知识库集合、无效的向量。

## 升级后怎么验证
1.  检查商业版环境变量配置是否生效，确认OneAPI相关配置正确加载。
2.  测试分享链接对话上报接口，确认返回字段包含totalPoints和token，不再包含price、inputToken、outputToken。
3.  验证新增功能：启用知识库的“增强处理”训练模式，确认HTTP模块变量提示正常、OpenAI单接口导入可用，全局变量可通过分享链接Query或API参数传入，内容提取模块存在默认值，问题补全模块支持英文类型与独立复用。
4.  验证优化与修复项：确认计量功能运行正常，Token过滤历史记录保持偶数条，分享链接正确展示应用名和头像，标注功能可用，qa生成线程计数无误，问题分类连线显示正常。

> 来源： [FastGPT 官方来源](https://doc.fastgpt.cn/zh-CN/self-host/upgrading/outdated/469)

## 适用性与版本范围

本页适用于官方来源记录的 部署与升级 场景。执行变更前，需核对 FastGPT、依赖、API 与部署版本。

## 安全护栏

凭证与私密数据使用 [REDACTED_CREDENTIAL] 占位符。执行操作前需核对文档的环境与版本。

## 回滚指引

恢复变更前的技术内容权威快照、已保存配置与数据快照，再执行最小验证场景。
