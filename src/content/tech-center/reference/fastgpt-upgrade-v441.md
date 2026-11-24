---
title: FastGPT从旧版本升级到V4.4.1的操作指南
slug: /zh/reference/fastgpt-upgrade-v441
page_type: 技术速查
source: https://doc.fastgpt.cn/self-host/upgrading/outdated/441
source_type: 官方文档小节
---

# FastGPT从旧版本升级到V4.4.1的操作指南

## 结论
本页提供FastGPT从版本低于4.12.0的旧版本升级到V4.4.1的标准操作方法，需使用对应版本的升级脚本完成更新。该升级流程仅适用于指定范围的旧版本，升级后需验证系统版本是否符合预期。

## 具体怎么做
1. 确认当前FastGPT版本低于4.12.0
2. 获取V4.4.1版本对应的升级脚本
3. 在部署服务器执行该升级脚本
4. 重启FastGPT相关服务或容器
5. 访问系统确认版本已更新至V4.4.1

## 注意事项
1. 该升级流程仅适用于版本低于4.12.0的FastGPT部署
2. 执行升级脚本前需确保服务器拥有足够的操作权限
3. 升级过程中请勿中断服务或断开网络连接，避免更新失败
4. 升级后需检查系统配置是否适配新版本，确保功能正常

> 来源：[FastGPT 官方文档](https://doc.fastgpt.cn/self-host/upgrading/outdated/441)
