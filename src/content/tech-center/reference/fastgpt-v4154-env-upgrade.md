---
title: FastGPT V4.15.4版本环境变量变更的升级处理指南
slug: /zh/reference/fastgpt-v4154-env-upgrade
page_type: 技术速查
source: https://doc.fastgpt.cn/self-host/upgrading/4-15/4154
source_type: 官方文档小节
---

# FastGPT V4.15.4版本环境变量变更的升级处理指南

## 结论
FastGPT V4.15.4版本属于4.15.x系列升级版本，本次更新核心调整为环境变量配置变更。升级至该版本或从该版本进行跨版本升级时，必须调整对应环境变量配置，否则可能引发服务启动异常或功能异常。

## 具体怎么做
1. 备份当前FastGPT部署的环境变量配置文件，不同部署方式对应不同配置文件：若使用Docker Compose部署，备份docker-compose.yml；若使用其他官方支持的部署方式，备份对应配置文件
2. 查阅V4.15.4版本的环境变量变更说明，对照修改对应环境变量参数
3. 重启FastGPT服务，若为重新部署则执行对应部署命令，使新的环境变量配置生效

## 注意事项
1. 该环境变量变更仅针对V4.15.4版本的升级流程，其他版本升级无需执行此操作
2. 未完成环境变量调整的情况下启动服务，可能出现无法正常初始化的问题
3. 升级前需确认当前部署环境与V4.15.4版本的兼容性，避免出现配置不匹配的情况

> 来源：[FastGPT 官方文档](https://doc.fastgpt.cn/self-host/upgrading/4-15/4154)
