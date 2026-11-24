---
title: FastGPT V4.6.2版本升级脚本的使用操作指南
slug: /zh/reference/fastgpt-v4-6-2-upgrade-script
page_type: 技术速查
source: https://doc.fastgpt.cn/self-host/upgrading/outdated/462
source_type: 官方文档小节
---

# FastGPT V4.6.2版本升级脚本的使用操作指南

## 结论
FastGPT V4.6.2版本属于4.12.0之前的版本区间，需使用官方提供的专属升级脚本完成升级。该版本的升级流程适配Docker Compose、Sealos以及本地开发三种部署方式，可通过官方文档获取对应升级资源。

## 具体怎么做
1. 确认当前部署的FastGPT版本为V4.6.2，且整体版本低于4.12.0。
2. 根据自身的部署类型，获取官方提供的V4.6.2专属升级脚本。
3. 执行升级脚本，按照脚本提示完成全部升级操作步骤。
4. 升级完成后，验证系统版本是否更新至V4.6.2。

## 注意事项
1. 该升级流程仅适用于版本低于4.12.0的FastGPT部署，不可用于4.12.0及以上版本。
2. V4.6.2版本必须使用专属升级脚本，不可混用其他版本的升级脚本。
3. 升级前可参考官方迁移&备份相关内容完成数据备份，避免升级过程中出现数据丢失。
4. 升级过程中需确保部署环境网络稳定，避免中断导致升级失败。

> 来源：[FastGPT 官方文档](https://doc.fastgpt.cn/self-host/upgrading/outdated/462)
