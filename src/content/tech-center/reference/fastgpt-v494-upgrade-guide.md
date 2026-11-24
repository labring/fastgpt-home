---
title: FastGPT V4.9.4版本升级与环境变量变更处理指南
slug: /zh/reference/fastgpt-v494-upgrade-guide
page_type: 技术速查
source: https://doc.fastgpt.cn/self-host/upgrading/outdated/494
source_type: 官方文档小节
---

# FastGPT V4.9.4版本升级与环境变量变更处理指南

## 结论
FastGPT V4.9.4版本升级包含环境变量变更与配套升级脚本。该版本升级需严格按照官方指定流程处理环境变量调整，并运行对应升级脚本，以确保服务正常启动与数据兼容。完成升级后需重启部署服务，使新的环境变量配置生效。

## 具体怎么做
1. 备份当前FastGPT部署的数据库数据与配置文件，避免升级过程中出现数据丢失
2. 查阅官方提供的V4.9.4环境变量变更说明，调整部署配置中的对应环境变量项
3. 获取并运行适配当前部署的V4.9.4升级脚本
4. 按照脚本提示完成版本更新与配置同步，重启FastGPT服务

## 注意事项
升级操作需适配当前版本的官方升级路径，不可直接跳过多个大版本执行升级。环境变量变更后必须重启部署服务，确保新配置正常加载。升级过程中需保持网络连接稳定，避免中断导致部署异常。本指南仅适用于FastGPT V4.9.4版本的升级场景。

> 来源：[FastGPT 官方文档](https://doc.fastgpt.cn/self-host/upgrading/outdated/494)
