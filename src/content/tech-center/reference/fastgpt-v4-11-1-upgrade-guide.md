---
title: FastGPT从低于4.12.0升级至V4.11.1操作速查
slug: /zh/reference/fastgpt-v4-11-1-upgrade-guide
page_type: 技术速查
source: https://doc.fastgpt.cn/self-host/upgrading/outdated/4111
source_type: 官方文档小节
---

# FastGPT从低于4.12.0升级至V4.11.1操作速查

## 结论
本页针对FastGPT从低于4.12.0版本升级至V4.11.1提供标准化操作指引。遵循对应版本的配置要求完成前置操作后，可顺利部署V4.11.1版本的FastGPT服务。

## 具体怎么做
1. 确认当前FastGPT版本低于4.12.0，可通过系统日志或内置版本查询接口确认版本号
2. 查阅FastGPT版本升级列表，若当前版本存在环境变量变更，需提前更新对应环境变量配置
3. 若当前版本附带升级脚本，执行对应升级脚本完成前置数据或配置更新
4. 选择Docker Compose或Sealos部署方式，拉取V4.11.1版本的镜像并完成服务部署

## 注意事项
1. 升级前需完成原有数据的迁移或备份，避免升级过程中数据丢失
2. 不同版本的环境变量变更要求不同，需严格按照对应版本的说明更新配置，避免服务启动失败
3. 仅支持从低于4.12.0的版本升级至V4.11.1，跨大版本升级需按中间版本的要求分步操作
4. 部署过程中需确保服务器环境符合FastGPT V4.11.1的运行要求

> 来源：[FastGPT 官方文档](https://doc.fastgpt.cn/self-host/upgrading/outdated/4111)
