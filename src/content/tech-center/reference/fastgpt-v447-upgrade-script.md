---
title: FastGPT V4.4.7版本升级脚本使用速查指南
slug: /zh/reference/fastgpt-v447-upgrade-script
page_type: 技术速查
source: https://doc.fastgpt.cn/self-host/upgrading/outdated/447
source_type: 官方文档小节
---

# FastGPT V4.4.7版本升级脚本使用速查指南

## 结论
FastGPT V4.4.7版本升级需使用官方提供的专属升级脚本。该升级方案仅适用于版本号低于4.12.0的FastGPT实例，是官方针对该版本发布的标准化升级流程，可完成从当前低版本到V4.4.7的版本更新。

## 具体怎么做
1. 确认当前FastGPT实例的版本号，确认版本低于4.12.0
2. 获取官方提供的V4.4.7专属升级脚本
3. 在部署环境中执行该升级脚本，按照脚本提示完成操作
4. 脚本执行完成后，验证FastGPT实例版本是否更新至V4.4.7

## 注意事项
1. 仅支持版本低于4.12.0的FastGPT实例升级，请勿使用该脚本升级高于或等于4.12.0的版本
2. 必须使用官方配套的V4.4.7专属升级脚本，使用其他版本脚本可能导致升级失败或实例异常
3. 升级前建议完成实例数据备份，避免升级过程中出现数据丢失风险
4. 升级过程中请勿中断脚本执行，避免出现实例损坏问题

> 来源：[FastGPT 官方文档](https://doc.fastgpt.cn/self-host/upgrading/outdated/447)
