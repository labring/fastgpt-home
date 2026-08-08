---
title: FastGPT V4.4.5版本升级操作与功能变更说明
slug: /zh/deploy/fastgpt-v445-upgrade-guide
page_type: 部署场景
source: https://doc.fastgpt.cn/zh-CN/self-host/upgrading/outdated/445
source_type: 官方文档
---

# FastGPT V4.4.5版本升级操作与功能变更说明

## 版本升级前提与核心操作
本页面面向已部署旧版本FastGPT的自部署用户，针对V4.4.5版本升级需求，需执行指定初始化API完成模块整合。该API的作用是初始化variable模块，将其合并到用户引导模块中，完成版本升级后的配置适配。

## 标准化升级操作步骤
执行以下HTTP POST请求即可完成初始化：
```bash
curl --location --request POST https://{{host}}/api/admin/initv445 \
--header rootkey: {{rootkey}} \
--header Content-Type: application/json
```
请将`{{host}}`替换为实际部署的服务域名，`{{rootkey}}`替换为环境变量中配置的rootkey值，请求必须携带这两个指定请求头，否则初始化流程将无法正常完成。

## 功能变更与注意事项
FastGPT V4.4.5版本带来多项更新：新增可通过模型生成3个预测问题的下一步指引选项；商业版新增分享链接限制及hook身份校验功能，可对接现有用户系统；同时新增带别名、额度限制和过期时间的Api Key功能，且该Api Key自带appId，无需额外连接；此外优化了全局变量与开场白，将二者合并为同一模块。
需注意以下要点：该初始化操作仅适用于从旧版本升级至V4.4.5的场景，请勿在其他版本的FastGPT中执行；必须正确配置并携带rootkey请求头，否则初始化请求会失败；商业版新增功能仅限商业版用户使用，开源版本不包含相关功能。

> 来源：https://doc.fastgpt.cn/zh-CN/self-host/upgrading/outdated/445
