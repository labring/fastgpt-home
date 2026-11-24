---
title: FastGPT从旧版本升级至V4.3的完整操作指南
slug: /zh/reference/fastgpt-upgrade-v43
page_type: 技术速查
source: https://doc.fastgpt.cn/self-host/upgrading/outdated/43
source_type: 官方文档小节
---

# FastGPT从旧版本升级至V4.3的完整操作指南

## 结论
FastGPT从旧版本升级到V4.3需处理两项核心调整：环境变量变更与升级脚本执行。该版本的升级流程已收录在官方版本升级说明中，需严格按照对应步骤操作。

## 具体怎么做
1.  确认当前FastGPT部署版本低于V4.3，避免跨大版本直接升级导致异常
2.  备份原有部署的配置文件与业务数据，防止升级过程中数据丢失
3.  查阅官方环境变量说明，更新适配V4.3的环境变量配置，完成变量调整
4.  拉取V4.3版本的FastGPT部署包或对应官方镜像
5.  运行官方提供的V4.3升级脚本，完成版本升级操作

## 注意事项
1.  该升级流程仅适用于版本低于V4.3的FastGPT部署，不支持跨大版本直接升级
2.  V4.3存在环境变量变更，原有配置可能失效，需提前核对变更内容
3.  执行升级脚本前需确认部署环境拥有足够的操作权限，避免执行失败

> 来源：[FastGPT 官方文档](https://doc.fastgpt.cn/self-host/upgrading/outdated/43)
