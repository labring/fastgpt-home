---
title: FastGPT V4.10.0版本环境变量变更的升级操作说明
slug: /zh/reference/fastgpt-v4100-env-upgrade
page_type: 技术速查
source: https://doc.fastgpt.cn/self-host/upgrading/outdated/4100
source_type: 官方文档小节
---

# FastGPT V4.10.0版本环境变量变更的升级操作说明

## 结论
FastGPT V4.10.0版本更新包含环境变量变更内容，自部署升级至该版本时需完成对应配置调整方可正常运行。该变更是该版本升级的核心配置项，仅适用于从低于V4.10.0版本升级的场景，未完成调整可能导致服务异常。

## 具体怎么做
1. 备份当前FastGPT部署的环境变量配置文件，包括Docker Compose配置或独立环境变量文件。
2. 查阅V4.10.0版本的官方环境变量变更说明，修改旧版环境变量的名称或取值为新版格式。
3. 应用新的环境变量配置，重启FastGPT服务以加载更新后的参数。

## 注意事项
1. 该变更仅针对V4.10.0版本的自部署升级，从其他版本升级无需执行此操作。
2. 未完成环境变量调整直接升级，可能出现服务启动失败、功能无法正常使用等问题。
3. 需严格按照官方给出的变更规则修改参数，避免误改无关配置。
4. 升级前需确认当前部署版本低于V4.10.0，避免重复执行变更操作。

> 来源：[FastGPT 官方文档](https://doc.fastgpt.cn/self-host/upgrading/outdated/4100)
