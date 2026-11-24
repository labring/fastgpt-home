---
title: FastGPT接入企业微信机器人的配置方法说明
slug: /zh/reference/fastgpt-wecom-bot-integration-guide
page_type: 技术速查
source: https://doc.fastgpt.cn/guide/build/publish/wecom
source_type: 官方文档小节
---

# FastGPT接入企业微信机器人的配置方法说明

## 结论
本页说明FastGPT接入企业微信机器人的支持范围与配置方式。FastGPT商业版从4.12.4版本起支持直接接入企微机器人，无需额外API。FastGPT云服务版从4.14.4版本起，可通过配置自定义域名接入企微智能机器人。

## 具体怎么做
1. 确认部署类型与版本：当前FastGPT需为商业版且版本≥4.12.4，或为云服务版且版本≥4.14.4。
2. 商业版用户：直接关联企微机器人，无需添加额外API配置。
3. 云服务版用户：先完成自定义域名配置，再关联企微智能机器人。

## 注意事项
1. 仅符合版本要求的商业版与云服务版支持该接入功能，社区版暂不支持。
2. 商业版接入无额外API步骤，请勿配置非必要的API参数。
3. 云服务版未完成自定义域名配置时，无法完成企微智能机器人接入。
4. 低于4.12.4的商业版、低于4.14.4的云服务版，均无法支持该接入方式。

> 来源：[FastGPT 官方文档](https://doc.fastgpt.cn/guide/build/publish/wecom)
