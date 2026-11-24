---
title: FastGPT V4.9.0版本自部署升级操作与配置说明
slug: /zh/reference/fastgpt-v490-upgrade-guide
page_type: 技术速查
source: https://doc.fastgpt.cn/self-host/upgrading/outdated/490
source_type: 官方文档小节
---

# FastGPT V4.9.0版本自部署升级操作与配置说明

## 结论
FastGPT V4.9.0版本的自部署升级包含环境变量变更与专属升级脚本两个必要环节，需严格按照官方指定的升级逻辑完成操作，以保障系统升级后正常运行。该版本升级是FastGPT历史版本中涉及配置与脚本同步更新的典型升级项之一。

## 具体怎么做
1. 备份当前FastGPT系统的运行数据与所有配置文件，避免升级过程中数据丢失
2. 从官方渠道获取适配V4.9.0版本的专属升级脚本
3. 对照V4.9.0的环境变量变更要求，逐一更新系统环境变量配置
4. 执行已准备好的升级脚本，完成版本部署更新并重启相关服务

## 注意事项
该升级流程仅适用于FastGPT V4.9.0版本的自部署场景，不可直接用于其他版本的升级操作。升级过程中请勿中断升级脚本的执行，否则可能导致系统部署异常或数据损坏。需严格遵循官方给出的环境变量变更规则，不可随意修改或遗漏配置项，否则可能引发系统启动失败。

> 来源：[FastGPT 官方文档](https://doc.fastgpt.cn/self-host/upgrading/outdated/490)
