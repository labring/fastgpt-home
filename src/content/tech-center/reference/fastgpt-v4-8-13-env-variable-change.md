---
title: FastGPT V4.8.13版本环境变量变更的适配操作说明
slug: /zh/reference/fastgpt-v4-8-13-env-variable-change
page_type: 技术速查
source: https://doc.fastgpt.cn/self-host/upgrading/outdated/4813
source_type: 官方文档小节
---

# FastGPT V4.8.13版本环境变量变更的适配操作说明

## 结论
FastGPT V4.8.13版本存在环境变量配置变更，需调整部署配置以正常运行该版本。该变更仅涉及环境变量相关配置，不影响核心业务逻辑的基础框架。

## 具体怎么做
1. 备份当前FastGPT部署的环境变量配置文件
2. 参照V4.8.13版本的环境变量变更指引修改对应配置
3. 重启FastGPT服务或重新部署使配置生效

## 注意事项
1. 该适配仅适用于升级至V4.8.13版本的场景
2. 未按要求调整环境变量可能导致服务启动异常
3. 需确保配置修改后重新加载服务配置

> 来源：[FastGPT 官方文档](https://doc.fastgpt.cn/self-host/upgrading/outdated/4813)
