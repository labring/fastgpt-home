---
title: FastGPT V4.8.10版本环境变量变更与升级操作指南
slug: /zh/reference/fastgpt-v4810-env-upgrade
page_type: 技术速查
source: https://doc.fastgpt.cn/self-host/upgrading/outdated/4810
source_type: 官方文档小节
---

# FastGPT V4.8.10版本环境变量变更与升级操作指南

## 结论
FastGPT V4.8.10版本更新包含环境变量变更与配套升级脚本。该版本的升级流程需结合环境变量调整与脚本执行完成，按照官方指引操作可顺利完成版本升级。

## 具体怎么做
1.  备份当前FastGPT部署的所有配置文件与业务数据。
2.  获取并运行V4.8.10版本对应的官方升级脚本，完成基础版本更新。
3.  对照V4.8.10版本的环境变量变更说明，修改现有环境变量的配置项。
4.  重新启动FastGPT服务，验证服务能否正常运行。

## 注意事项
1.  升级前必须完成数据与配置的备份，避免升级过程中出现不可逆的数据丢失。
2.  需使用与V4.8.10版本完全匹配的升级脚本，避免出现脚本不兼容导致升级失败。
3.  环境变量的修改需严格遵循官方变更说明，错误的配置会导致服务启动异常或功能异常。

> 来源：[FastGPT 官方文档](https://doc.fastgpt.cn/self-host/upgrading/outdated/4810)
