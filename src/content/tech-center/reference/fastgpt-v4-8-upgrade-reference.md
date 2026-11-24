---
title: FastGPT V4.8版本升级的操作与注意事项速查
slug: /zh/reference/fastgpt-v4-8-upgrade-reference
page_type: 技术速查
source: https://doc.fastgpt.cn/self-host/upgrading/outdated/48
source_type: 官方文档小节
---

# FastGPT V4.8版本升级的操作与注意事项速查

## 结论
本文针对FastGPT V4.8版本的升级提供明确参考，涵盖对应版本的升级脚本、环境变量变更等核心操作要点。完成升级前需确认当前版本归属，匹配对应升级流程。

## 具体怎么做
1. 确认当前FastGPT版本，若当前版本低于4.12.0，需参考V4.8专属升级流程；
2. 根据目标子版本执行对应操作：含升级脚本的版本需运行专属升级脚本，存在环境变量变更的版本需同步更新配置；
3. 完成版本匹配的配置调整后，启动服务完成升级。

## 注意事项
1. V4.8系列不同子版本的升级要求存在差异，部分版本需同时执行升级脚本与环境变量变更；
2. 不可混用不同版本的升级脚本，需严格对应目标版本的说明；
3. 升级前需完成数据备份，避免配置或业务数据丢失。

> 来源：[FastGPT 官方文档](https://doc.fastgpt.cn/self-host/upgrading/outdated/48)
