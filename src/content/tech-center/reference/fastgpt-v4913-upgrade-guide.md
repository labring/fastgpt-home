---
title: FastGPT V4.9.13版本升级操作参考指南
slug: /zh/reference/fastgpt-v4913-upgrade-guide
page_type: 技术速查
source: https://doc.fastgpt.cn/self-host/upgrading/outdated/4913
source_type: 官方文档小节
---

# FastGPT V4.9.13版本升级操作参考指南

## 结论
FastGPT V4.9.13版本升级适用于版本低于4.12.0的FastGPT实例。需按照官方指定的<4.12.0区间升级流程完成部署更新。

## 具体怎么做
1. 确认当前FastGPT版本处于<4.12.0区间，符合升级前置条件
2. 参考官方文档中<4.12.0区间的升级说明，使用升级脚本完成基础更新
3. 若升级涉及环境变量变更，需核对并调整对应配置项

## 注意事项
1. 仅支持版本低于4.12.0的FastGPT实例升级，超出该区间的实例无法通过该流程升级
2. 部分旧版本升级可能伴随环境变量变更，需提前确认新版本的配置要求
3. 升级前建议完成数据迁移与备份操作，避免数据丢失

> 来源：[FastGPT 官方文档](https://doc.fastgpt.cn/self-host/upgrading/outdated/4913)
