---
title: FastGPT V4.9.6版本环境变量变更的适配操作指南
slug: /zh/reference/fastgpt-v496-env-vars-adjust
page_type: 技术速查
source: https://doc.fastgpt.cn/self-host/upgrading/outdated/496
source_type: 官方文档小节
---

# FastGPT V4.9.6版本环境变量变更的适配操作指南

## 结论
FastGPT V4.9.6版本存在环境变量配置变更，自部署用户需完成对应调整才能正常运行该版本。本次变更仅涉及环境变量相关配置，不影响原有业务核心逻辑，属于常规升级适配内容。

## 具体怎么做
1. 确认当前FastGPT版本低于4.12.0。
2. 根据自身部署方式（如Docker Compose、Sealos或本地开发），查阅官方环境变量说明文档完成对应配置调整。
3. 完成配置调整后重启对应FastGPT服务，加载新的环境变量配置。

## 注意事项
1. 该变更仅适用于从低于4.12.0版本升级至V4.9.6的场景，其他版本升级无需执行此操作。
2. 需严格遵循官方指引调整配置，避免因变量配置错误引发服务启动失败或运行异常。

> 来源：[FastGPT 官方文档](https://doc.fastgpt.cn/self-host/upgrading/outdated/496)
