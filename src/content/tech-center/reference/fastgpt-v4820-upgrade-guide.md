---
title: FastGPT V4.8.20版本升级与环境变量变更操作说明
slug: /zh/reference/fastgpt-v4820-upgrade-guide
page_type: 技术速查
source: https://doc.fastgpt.cn/self-host/upgrading/outdated/4820
source_type: 官方文档小节
---

# FastGPT V4.8.20版本升级与环境变量变更操作说明

## 结论
FastGPT V4.8.20版本更新包含环境变量变更与配套升级脚本两项核心内容。该版本属于<4.12.0的升级分支，需通过对应升级脚本完成升级操作，确保服务符合新版本的配置要求。

## 具体怎么做
1. 确认当前FastGPT版本处于<4.12.0的范围，符合升级至V4.8.20的前置条件。
2. 查阅V4.8.20版本的环境变量变更说明，调整部署配置中的对应环境变量参数。
3. 获取V4.8.20版本对应的升级脚本文件。
4. 运行获取到的升级脚本，完成FastGPT V4.8.20版本的升级流程。

## 注意事项
升级V4.8.20需同时完成环境变量变更与升级脚本的执行操作，不可遗漏任意一项。仅可从<4.12.0的版本直接升级至V4.8.20，请勿跨多个版本越级升级。升级完成后需确认服务正常启动，验证版本更新结果。

> 来源：[FastGPT 官方文档](https://doc.fastgpt.cn/self-host/upgrading/outdated/4820)
