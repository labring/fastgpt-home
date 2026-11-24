---
title: FastGPT V4.6.8版本升级操作速查指南
slug: /zh/reference/fastgpt-v468-upgrade-script-guide
page_type: 技术速查
source: https://doc.fastgpt.cn/self-host/upgrading/outdated/468
source_type: 官方文档小节
---

# FastGPT V4.6.8版本升级操作速查指南

## 结论
FastGPT V4.6.8版本升级需使用官方提供的升级脚本完成操作。该版本属于4.12.0以下的旧版本升级序列，需按照自部署环境的规范流程执行更新。

## 具体怎么做
1. 进入FastGPT基于Docker Compose部署的项目目录。
2. 从官方渠道获取V4.6.8版本对应的升级脚本文件。
3. 为升级脚本配置正确的执行权限后，执行脚本完成版本升级。
4. 升级完成后，重启FastGPT相关服务并验证系统运行状态。

## 注意事项
1. 该升级流程仅适用于FastGPT版本低于4.12.0的场景，不适用于4.12.0及以上版本的升级操作。
2. 升级前需完成现有FastGPT系统的数据备份，防止升级过程中出现数据丢失。
3. 升级过程中请勿强制终止脚本执行或断开服务器网络连接，避免导致部署异常。
4. 若升级后出现配置或运行异常，可参考官方故障排查文档进行问题定位与修复。

> 来源：[FastGPT 官方文档](https://doc.fastgpt.cn/self-host/upgrading/outdated/468)
