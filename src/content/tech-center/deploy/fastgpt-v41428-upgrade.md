---
title: FastGPT V4.14.28版本升级操作与变更说明
slug: /zh/deploy/fastgpt-v41428-upgrade
page_type: 部署场景
source: https://doc.fastgpt.cn/zh-CN/self-host/upgrading/4-14/41428
source_type: 官方文档
---

# FastGPT V4.14.28版本升级操作与变更说明

## 版本变更说明
FastGPT V4.14.28属于4.14.x系列的维护更新版本，核心变更为修复admin服务的Node.js版本兼容问题。该问题会导致因运行环境Node.js版本不匹配，进而引发admin服务启动失败、运行异常等情况。本次更新未新增核心业务功能，仅针对兼容性问题进行修复。

## 升级操作步骤
本次升级操作仅需更新对应服务的镜像tag，具体步骤如下：1. 更新fastgpt-app（FastGPT主服务）的镜像tag为v4.14.28；2. 更新fastgpt-pro（FastGPT商业版）的镜像tag为v4.14.28。完成镜像tag更新后，重启对应服务即可生效。若你使用容器化部署方式，需根据你的部署配置调整镜像标签，确保拉取到正确版本的镜像。

## 升级注意事项
在升级前需确认当前运行的FastGPT版本为4.14.x系列，非4.14.x系列版本请勿直接升级至V4.14.28。若升级后出现admin服务相关异常，需优先检查运行环境的Node.js版本是否匹配镜像要求。此外，若此前已完成4.14.x系列其他版本的环境变量变更操作，本次升级无需额外调整环境变量配置。

> 来源：https://doc.fastgpt.cn/zh-CN/self-host/upgrading/4-14/41428
