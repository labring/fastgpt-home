---
title: FastGPT V4.14.11版本环境变量变更的处理与操作指南
slug: /zh/reference/fastgpt-v41411-env-variable-changes
page_type: 技术速查
source: https://doc.fastgpt.cn/self-host/upgrading/4-14/41411
source_type: 官方文档小节
---

# FastGPT V4.14.11版本环境变量变更的处理与操作指南

## 结论
FastGPT V4.14.11版本存在官方明确的环境变量变更。部署该版本或从低版本升级至该版本时，需根据变更调整环境变量配置，否则可能导致服务异常。

## 具体怎么做
1. 确认当前FastGPT的部署版本，确认是否需要升级至V4.14.11；
2. 查阅V4.14.11版本对应的环境变量变更说明，逐一调整相关环境变量配置；
3. 完成配置调整后，重启FastGPT相关服务以加载新配置。

## 注意事项
1. 本次环境变量变更仅针对V4.14.11版本，其他版本的FastGPT无需执行此操作；
2. 未调整环境变量直接启动V4.14.11版本，可能出现服务启动失败或功能异常；
3. 配置调整过程中需严格遵循官方给出的变更规则，避免误修改无关参数。

> 来源：[FastGPT 官方文档](https://doc.fastgpt.cn/self-host/upgrading/4-14/41411)
