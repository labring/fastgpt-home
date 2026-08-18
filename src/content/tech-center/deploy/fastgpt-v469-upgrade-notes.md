---
title: FastGPT V4.6.9版本升级与环境变量变更说明
slug: /zh/deploy/fastgpt-v469-upgrade-notes
page_type: 部署场景
source: https://doc.fastgpt.cn/zh-CN/self-host/upgrading/outdated/469
source_type: 官方文档
---

# FastGPT V4.6.9版本升级与环境变量变更说明

## 版本核心变更与环境变量调整
本次V4.6.9版本包含环境变量变更与升级脚本相关调整，首先涉及商业版环境变量的修改，新增了oneapi相关的配置参数，具体为`OPENAI_BASE_URL=http://oneapi:3000/v1`以及`CHAT_API_KEY=sk-fastgpt`。同时外部接口存在更新：分享链接对话上报接口的`price`字段被`totalPoints`字段取代，不再提供`inputToken`和`outputToken`字段，仅保留`token`字段用于表示总token数量。

## 升级与初始化操作步骤
1. 执行初始化脚本：从任意终端发起HTTP请求，需将命令中的`{{rootkey}}`替换为环境变量内的rootkey值，`{{host}}`替换为自身部署的域名。完整命令如下：
```bash
curl --location --request POST https://{{host}}/api/admin/initv469 \
--header 'rootkey: {{rootkey}}' \
--header 'Content-Type: application/json'
```
2. 完成初始化后，需执行重置计量表与脏数据清理操作，清理范围包括无效文件、无效图片、无效知识库集合以及无效向量数据。

## 功能优化与注意事项
本次更新新增多项功能：商业版知识库新增“增强处理”训练模式，可生成更多类型的索引；HTTP模块完善了变量提示功能，同时支持OpenAI单接口导入；全局变量支持添加外部变量，可通过分享链接的Query参数或API的`variables`参数传入；内容提取模块新增默认值配置。
优化内容包括：问题补全功能新增英文类型，可设置为独立模块方便复用；重写了计量模式；Token过滤历史记录保持偶数条，防止部分模型报错；分享链接SEO优化，可直接展示应用名和头像。修复的问题包括标注功能异常、qa生成线程计数错误、问题分类连线类型错误。
需要注意的是，该升级脚本仅适用于V4.6.9版本的升级操作，执行前需确认当前部署版本符合要求，替换参数时需确保rootkey与host的正确性，避免接口调用失败。

> 来源：[FastGPT 官方文档](https://doc.fastgpt.cn/zh-CN/self-host/upgrading/outdated/469)
