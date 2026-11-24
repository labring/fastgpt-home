---
title: FastGPT V4.9.14版本升级操作速查指南
slug: /zh/reference/fastgpt-v4914-upgrade-guide
page_type: 技术速查
source: https://doc.fastgpt.cn/self-host/upgrading/outdated/4914
source_type: 官方文档小节
---

# FastGPT V4.9.14版本升级操作速查指南

## 结论
本文档提供FastGPT V4.9.14版本的升级操作指引。该版本属于<4.12.0的升级分类范畴，需按照官方指定流程完成升级。

## 具体怎么做
1. 进入FastGPT自部署的版本升级页面，定位到<4.12.0分类下的V4.9.14升级说明；
2. 核对当前系统配置，若涉及环境变量变更，提前备份原有配置并更新参数；
3. 通过Docker Compose部署方式或官方升级脚本完成版本升级；
4. 升级完成后检查系统各模块运行状态，确认服务正常可用。

## 注意事项
1. 仅适用于FastGPT版本低于4.12.0的升级场景，不适用于更高版本；
2. 升级前需完成数据迁移与备份，防止出现数据丢失问题；
3. 自定义配置需对照升级说明逐一核对，避免配置错误；
4. 升级过程中请勿中断服务，以免引发系统异常。

> 来源：[FastGPT 官方文档](https://doc.fastgpt.cn/self-host/upgrading/outdated/4914)
