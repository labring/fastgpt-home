---
title: FastGPT V4.6.3版本升级脚本操作说明
slug: /zh/reference/fastgpt-v463-upgrade-script
page_type: 技术速查
source: https://doc.fastgpt.cn/self-host/upgrading/outdated/463
source_type: 官方文档小节
---

# FastGPT V4.6.3版本升级脚本操作说明

## 结论
FastGPT V4.6.3版本的升级需通过官方配套的专用升级脚本完成。该版本升级流程属于FastGPT自部署版本升级体系中的标准化操作环节，仅适用于对应版本的更新需求。

## 具体怎么做
1.  确认当前FastGPT部署版本处于<4.12.0的适配区间内，确保升级兼容性。
2.  获取FastGPT官方提供的V4.6.3版本专属升级脚本。
3.  在部署服务器中执行该升级脚本，完成版本镜像拉取与配置迁移操作。
4.  脚本执行完成后，重启FastGPT相关服务以加载新版本。

## 注意事项
1.  该升级脚本仅支持FastGPT V4.6.3版本的升级操作，不可用于其他版本的升级或回滚。
2.  升级前需备份原有系统数据与配置文件，避免升级过程中出现数据丢失或配置损坏。
3.  若升级过程中出现报错，需优先排查当前部署环境与版本适配性，参考官方故障排查文档处理。
4.  该升级流程仅适用于FastGPT自部署场景，不适用于其他部署模式。

> 来源：[FastGPT 官方文档](https://doc.fastgpt.cn/self-host/upgrading/outdated/463)
