---
title: FastGPT V4.6.1版本升级操作与功能说明
slug: /zh/deploy/fastgpt-v461-upgrade-feature
page_type: 部署场景
source: https://doc.fastgpt.cn/zh-CN/self-host/upgrading/outdated/461
source_type: 官方文档
---

# FastGPT V4.6.1版本升级操作与功能说明

## V4.6.1版本核心功能
本版本新增两项官方功能：GPT4-v模型支持与whisper语音输入；同时优化了两项TTS相关能力，分别为TTS流传输与TTS缓存。使用新增功能时，需确保对应服务端已适配相关能力。

## 版本升级前置准备
在升级至V4.6.1前，需确认当前运行版本的升级适配要求。对于标注有升级脚本的历史版本，需使用对应升级脚本完成过渡。同时需提前备份配置文件与相关数据，避免升级过程中出现配置丢失或数据异常。

## 版本升级操作步骤
1. 停止当前正在运行的FastGPT服务进程；
2. 获取V4.6.1版本对应的升级脚本；
3. 执行升级脚本完成版本更新；
4. 启动服务并验证GPT4-v、whisper语音输入等新增功能是否正常可用。

## 使用注意事项
部分历史版本升级至V4.6.1时，若涉及环境变量变更，需同步更新对应配置项，否则可能出现服务启动异常的情况。若升级后出现功能异常，需检查对应服务的适配性与原有配置是否正确。

> 来源：[FastGPT 官方文档](https://doc.fastgpt.cn/zh-CN/self-host/upgrading/outdated/461)
