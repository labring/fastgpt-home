---
title: FastGPT V4.14.4版本升级脚本使用说明
slug: /zh/reference/fastgpt-v4-14-4-upgrade-script
page_type: 技术速查
source: https://doc.fastgpt.cn/self-host/upgrading/4-14/4144
source_type: 官方文档小节
---

# FastGPT V4.14.4版本升级脚本使用说明

## 结论
FastGPT V4.14.4版本属于4.14.x系列，官方提供专属升级脚本用于该版本的更新。按照规范操作可完成合规升级，确保系统版本符合官方更新要求。

## 具体怎么做
1. 确认当前FastGPT部署为Docker Compose模式。
2. 获取并运行V4.14.4版本对应的专属升级脚本。
3. 完成脚本执行后，核对系统环境变量配置，确保匹配版本更新要求。

## 注意事项
1. 该升级脚本仅适用于4.14.x系列版本的升级操作，不适用于其他大版本的FastGPT部署。
2. 执行升级脚本前需确认系统处于稳定状态，避免异常操作引发配置问题。
3. 若当前部署涉及标注有环境变量变更的版本，需同步更新对应配置项。

> 来源：[FastGPT 官方文档](https://doc.fastgpt.cn/self-host/upgrading/4-14/4144)
