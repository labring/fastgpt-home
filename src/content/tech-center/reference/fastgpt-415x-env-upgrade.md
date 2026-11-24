---
title: FastGPT 4.15.x版本环境变量变更升级说明
slug: /zh/reference/fastgpt-415x-env-upgrade
page_type: 技术速查
source: https://doc.fastgpt.cn/self-host/upgrading/4-15/41501
source_type: 官方文档小节
---

# FastGPT 4.15.x版本环境变量变更升级说明

## 结论
FastGPT 4.15.0-beta1及后续4.15.x版本存在环境变量变更。该系列版本从首个测试版开始陆续推出相关更新，升级时需根据对应版本要求调整环境变量配置，部分版本附带专属升级脚本。

## 具体怎么做
1. 确认升级目标为FastGPT 4.15.x系列版本
2. 对照官方版本列表，确认目标版本是否附带升级脚本。带有升级脚本的版本包括V4.15.1、V4.15.0及beta5至beta7版本
3. 若目标版本带有升级脚本，先执行对应升级脚本
4. 根据对应版本的环境变量变更要求，调整系统环境变量配置

## 注意事项
仅适用于FastGPT 4.15.x系列版本的升级操作。不同子版本的环境变量变更细节需参考对应版本的官方文档。带有升级脚本的版本需优先执行脚本后再完成部署流程。请勿在无对应版本说明的情况下套用其他版本的升级配置。

> 来源：[FastGPT 官方文档](https://doc.fastgpt.cn/self-host/upgrading/4-15/41501)
