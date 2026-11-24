---
title: FastGPT从低于4.12.0版本升级至V4.5.2的操作说明
slug: /zh/reference/fastgpt-v452-upgrade-guide
page_type: 技术速查
source: https://doc.fastgpt.cn/self-host/upgrading/outdated/452
source_type: 官方文档小节
---

# FastGPT从低于4.12.0版本升级至V4.5.2的操作说明

## 结论
本文档针对FastGPT从低于4.12.0版本升级至V4.5.2提供官方标准操作指引。该升级路径需严格匹配FastGPT官方版本升级列表中的各版本变更要求，完成对应配置与服务的更新操作，确保升级后系统正常运行。

## 具体怎么做
1. 确认当前FastGPT的运行版本低于4.12.0，确认符合升级前置条件
2. 打开FastGPT官方版本升级列表，按照版本从低到高的顺序，依次执行各对应版本的升级操作：包含执行升级脚本、调整环境变量等标注的变更步骤
3. 完成所有中间版本的升级操作后，执行V4.5.2版本的最终更新流程，完成整体升级

## 注意事项
1. 该升级仅适用于FastGPT版本低于4.12.0的场景，不适用于更高版本的升级操作
2. 每个版本的升级需对应处理其标注的变更项，包括环境变量调整、升级脚本执行等要求
3. 升级过程中需严格遵循版本顺序，不得跳过任意中间版本，否则可能导致系统异常

> 来源：[FastGPT 官方文档](https://doc.fastgpt.cn/self-host/upgrading/outdated/452)
