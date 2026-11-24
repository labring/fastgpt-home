---
title: FastGPT V4.8.7版本升级的操作参考指南
slug: /zh/reference/fastgpt-v487-upgrade-reference
page_type: 技术速查
source: https://doc.fastgpt.cn/self-host/upgrading/outdated/487
source_type: 官方文档小节
---

# FastGPT V4.8.7版本升级的操作参考指南

## 结论
FastGPT V4.8.7版本适用于从低于4.12.0的现有FastGPT版本升级。升级需遵循官方指定的部署与更新流程，完成系统版本更新。

## 具体怎么做
1. 确认当前FastGPT版本低于4.12.0。
2. 通过Docker Compose部署方式拉取V4.8.7版本的系统镜像。
3. 完成对应配置更新后，执行升级操作。

## 注意事项
升级前需确认当前FastGPT版本低于4.12.0，不可跨过多版本直接升级。若当前版本存在环境变量变更，需同步调整对应配置项。升级过程需遵循官方部署流程，避免修改核心配置文件。

> 来源：[FastGPT 官方文档](https://doc.fastgpt.cn/self-host/upgrading/outdated/487)
