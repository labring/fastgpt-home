---
title: FastGPT V4.9.9版本自部署升级操作速查指南
slug: /zh/reference/fastgpt-v499-upgrade-quickref
page_type: 技术速查
source: https://doc.fastgpt.cn/self-host/upgrading/outdated/499
source_type: 官方文档小节
---

# FastGPT V4.9.9版本自部署升级操作速查指南

## 结论
本页面提供FastGPT V4.9.9版本的自部署升级速查参考。该升级条目归类于<4.12.0版本的升级说明中，面向版本低于4.12.0的FastGPT自部署用户。该页面属于官方旧版本升级文档的一部分，仅聚焦V4.9.9版本的升级操作。

## 具体怎么做
1. 确认当前FastGPT部署版本低于4.12.0；
2. 提前完成FastGPT实例的数据备份，可参考官方迁移备份流程；
3. 准备对应版本的升级脚本，该版本升级需使用专属升级脚本；
4. 检查并适配环境变量配置，该版本涉及环境变量变更相关调整；
5. 按照官方自部署流程执行升级脚本，完成版本升级。

## 注意事项
1. 该升级仅适用于版本低于4.12.0的FastGPT自部署实例，不适用于更高版本；
2. 升级过程需严格遵循环境变量的适配要求，避免因配置错误导致服务异常；
3. 升级前需完成数据备份，防止升级过程中出现数据丢失；
4. 升级操作需按照自部署流程的规范执行。

> 来源：[FastGPT 官方文档](https://doc.fastgpt.cn/self-host/upgrading/outdated/499)
