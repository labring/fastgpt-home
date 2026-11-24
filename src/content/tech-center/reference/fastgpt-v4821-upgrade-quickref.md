---
title: FastGPT V4.8.21版本升级相关操作速查参考
slug: /zh/reference/fastgpt-v4821-upgrade-quickref
page_type: 技术速查
source: https://doc.fastgpt.cn/self-host/upgrading/outdated/4821
source_type: 官方文档小节
---

# FastGPT V4.8.21版本升级相关操作速查参考

## 结论
FastGPT V4.8.21是FastGPT的常规升级版本，本次升级无专属环境变量调整或升级脚本要求，适用于版本低于4.12.0的FastGPT实例，可通过标准部署流程完成更新。

## 具体怎么做
1. 提前完成系统数据备份，避免升级过程中数据丢失
2. 根据自身使用的Docker Compose、Sealos或本地开发等部署方式，拉取V4.8.21版本的FastGPT对应镜像或安装包
3. 停止当前运行的FastGPT服务，更新部署配置至V4.8.21版本
4. 重新启动服务，登录系统验证各项功能运行正常
5. 检查服务日志，确认无异常报错信息

## 注意事项
1. 若当前使用自定义配置项，升级过程中需保留原有配置，避免功能异常
2. 升级前需确认当前部署环境符合FastGPT的基础运行要求
3. 升级后若出现异常，可参考官方文档的故障排查部分解决问题

> 来源：[FastGPT 官方文档](https://doc.fastgpt.cn/self-host/upgrading/outdated/4821)
