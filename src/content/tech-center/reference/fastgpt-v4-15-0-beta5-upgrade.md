---
title: FastGPT V4.15.0-beta5版本升级与环境变量变更说明
slug: /zh/reference/fastgpt-v4-15-0-beta5-upgrade
page_type: 技术速查
source: https://doc.fastgpt.cn/self-host/upgrading/4-15/41505
source_type: 官方文档小节
---

# FastGPT V4.15.0-beta5版本升级与环境变量变更说明

## 结论
FastGPT V4.15.0-beta5版本包含环境变量变更内容，需通过官方配套的升级脚本完成升级。该版本属于4.15.x系列的升级分支，其升级逻辑与同系列的V4.15.0及beta1-beta7版本一致，均需配合升级脚本与环境变量更新完成升级操作。

## 具体怎么做
1. 确认当前运行的FastGPT版本属于4.15.x系列
2. 拉取对应部署方式的V4.15.0-beta5版本官方资源
3. 执行官方提供的V4.15.0-beta5升级脚本
4. 更新环境变量配置，适配该版本的变更要求

## 注意事项
1. 升级前需确认当前版本属于4.15.x系列，不可跨大版本直接升级
2. 升级过程必须同步更新环境变量配置，否则可能影响服务启动
3. 需使用官方配套的升级脚本完成升级，不可自行修改脚本内容
4. 该版本的升级要求与同系列的V4.15.0及beta1-beta7版本相同

> 来源：[FastGPT 官方文档](https://doc.fastgpt.cn/self-host/upgrading/4-15/41505)
