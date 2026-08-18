---
title: FastGPT V4.14.25版本升级操作与变更说明
slug: /zh/deploy/fastgpt-v41425-upgrade-note
page_type: 部署场景
source: https://doc.fastgpt.cn/zh-CN/self-host/upgrading/4-14/41425
source_type: 官方文档
---

# FastGPT V4.14.25版本升级操作与变更说明

## 版本基本信息
V4.14.25属于FastGPT 4.14.x系列的迭代版本，根据官方标注，该版本当前已被弃用。该版本未涉及环境变量、配置项的新增或变更，仅包含单次功能修复项。若需使用该版本，需按照官方指定的升级流程完成部署更新。

## 升级操作步骤
执行升级前，请确认当前部署环境已完成基础配置，且可正常拉取官方镜像。具体升级操作仅需更新对应服务的镜像Tag：
1.  更新fastgpt-app（FastGPT主服务）的镜像Tag为`v4.14.25`；
2.  更新fastgpt-pro（FastGPT商业版）的镜像Tag为`v4.14.25`。
若使用Docker Compose部署，可直接修改docker-compose.yml文件中对应服务的image字段值，重新执行`docker-compose up -d`即可完成升级。若使用其他部署方式，需同步更新对应服务的镜像配置。

## 版本变更说明
本次V4.14.25版本的变更内容仅为修复已知问题：修复了门户页的日志权限异常问题，修复后可正常访问和管理门户相关的日志信息，无其他功能调整或新增内容。由于该版本已被弃用，官方不再提供该版本的后续维护或更新支持。

> 来源：[FastGPT 官方文档](https://doc.fastgpt.cn/zh-CN/self-host/upgrading/4-14/41425)
