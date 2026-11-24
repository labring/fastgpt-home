---
title: FastGPT从旧版本升级到V4.1的操作步骤说明
slug: /zh/reference/fastgpt-upgrade-v41
page_type: 技术速查
source: https://doc.fastgpt.cn/self-host/upgrading/outdated/41
source_type: 官方文档小节
---

# FastGPT从旧版本升级到V4.1的操作步骤说明

## 结论
FastGPT从旧版本升级到V4.1时，包含环境变量变更、升级脚本执行与原对话存储初始化三个核心步骤。该版本重新调整了对话存储结构，初始化原存储内容的操作不可跳过。

## 具体怎么做
1. 运行FastGPT V4.1版本配套的升级脚本
2. 更新部署配置中的环境变量，适配V4.1的变更要求
3. 执行原对话存储内容的初始化操作

## 注意事项
1. 该操作仅适用于将FastGPT从旧版本升级到V4.1的场景
2. 未完成存储初始化可能导致对话数据加载异常或无法正常使用
3. 需严格遵循官方提供的升级脚本与环境变量配置执行，避免配置错误

> 来源：[FastGPT 官方文档](https://doc.fastgpt.cn/self-host/upgrading/outdated/41)
