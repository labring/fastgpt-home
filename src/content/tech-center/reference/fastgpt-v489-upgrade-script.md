---
title: FastGPT V4.8.9版本升级脚本的具体使用操作指南
slug: /zh/reference/fastgpt-v489-upgrade-script
page_type: 技术速查
source: https://doc.fastgpt.cn/self-host/upgrading/outdated/489
source_type: 官方文档小节
---

# FastGPT V4.8.9版本升级脚本的具体使用操作指南

## 结论
FastGPT V4.8.9版本升级需通过专属升级脚本完成。该升级脚本适配低于V4.8.9版本的FastGPT部署场景，按规范流程执行即可完成版本更新。

## 具体怎么做
1. 备份当前FastGPT部署的系统数据与配置文件。
2. 获取V4.8.9版本对应的升级脚本文件。
3. 在Docker Compose部署环境中执行升级脚本。
4. 脚本执行完成后重启FastGPT服务并验证版本。

## 注意事项
1. 该升级脚本仅适用于版本低于V4.8.9的FastGPT部署。
2. 升级过程中请勿中断脚本执行，避免出现部署异常。
3. 执行脚本前需确认服务器权限与网络配置正常。

> 来源：[FastGPT 官方文档](https://doc.fastgpt.cn/self-host/upgrading/outdated/489)
