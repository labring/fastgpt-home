---
title: FastGPT V4.6.9版本升级操作与配置变更说明
slug: /zh/deploy/fastgpt-v469-upgrade-config
page_type: 部署场景
source: https://doc.fastgpt.cn/zh-CN/self-host/upgrading/outdated/469
source_type: 官方文档
---

# FastGPT V4.6.9版本升级操作与配置变更说明

## 版本核心变更与更新内容
本次V4.6.9版本主要包含环境变量变更、升级脚本支持，以及多项功能更新与修复。商业版需修改环境变量，新增OneAPI地址和令牌配置，示例配置为`OPENAI_BASE_URL=http://oneapi:3000/v1`、`CHAT_API_KEY=sk-fastgpt`。本次更新新增多项功能：知识库新增"增强处理"训练模式，可生成更多类型索引；完善HTTP模块的变量提示，支持OpenAI单接口导入；全局变量支持增加外部变量，可通过分享链接Query或API的variables参数传入；内容提取模块新增默认值配置。同时对多项内容进行优化：重写计量模式，优化Token过滤历史记录以保持偶数条避免模型报错，优化分享链接SEO可直接展示应用名和头像。此外修复了标注功能、qa生成线程计数错误、问题分类连线类型错误等问题。

## 升级执行步骤
完成环境变量配置后，需执行以下升级操作：
1. 准备好环境变量中的`rootkey`以及部署的域名`host`，将对应参数替换至以下命令中；
2. 在任意终端发起HTTP初始化请求，重置计量表：
```bash
curl --location --request POST https://{{host}}/api/admin/initv469 \
--header rootkey: {{rootkey}} \
--header Content-Type: application/json
```
3. 执行脏数据清理操作，清理无效的文件、无效的图片、无效的知识库集合、无效的向量数据。

## 外部接口调整说明
由于计费系统变更，分享链接对话上报接口需进行对应调整：原`price`字段被`totalPoints`字段取代；`inputToken`和`outputToken`不再提供，仅保留`token`字段用于表示总token数量。

> 来源：[FastGPT 官方文档](https://doc.fastgpt.cn/zh-CN/self-host/upgrading/outdated/469)
