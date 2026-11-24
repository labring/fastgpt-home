---
title: FastGPT V4.15.0-beta3版本环境变量变更升级指引
slug: /zh/reference/fastgpt-beta3-env-upgrade
page_type: 技术速查
source: https://doc.fastgpt.cn/self-host/upgrading/4-15/41503
source_type: 官方文档小节
---

# FastGPT V4.15.0-beta3版本环境变量变更升级指引

## 结论
FastGPT V4.15.0-beta3版本存在环境变量变更，属于4.15.x系列升级版本。升级该版本需调整对应环境变量配置，配合官方提供的升级脚本可顺利完成升级流程。

## 具体怎么做
1. 备份当前FastGPT系统的运行数据，避免升级过程中数据丢失；
2. 调用V4.15.0-beta3版本配套的升级脚本；
3. 根据版本变更要求更新环境变量配置；
4. 按照对应部署方式重启FastGPT服务，完成版本升级。

## 注意事项
1. 该版本仅适用于V4.15.0-beta3版本的升级操作，不适用于其他FastGPT版本；
2. 环境变量变更需严格匹配官方要求，配置错误可能导致服务启动异常；
3. 升级过程需遵循官方给出的4.15.x系列升级规范，避免出现兼容性问题。

> 来源：[FastGPT 官方文档](https://doc.fastgpt.cn/self-host/upgrading/4-15/41503)
