---
title: FastGPT V4.8.3版本升级操作与更新内容说明
slug: /zh/deploy/fastgpt-v4-8-3-upgrade-guide
page_type: 部署场景
source: https://doc.fastgpt.cn/zh-CN/self-host/upgrading/outdated/483
source_type: 官方文档
---

# FastGPT V4.8.3版本升级操作与更新内容说明

## 版本升级操作步骤
首先修改部署使用的docker-compose配置文件，将其中fastgpt、fastgpt-sandbox以及商业版镜像的tag统一修改为v4.8.3。若需要使用Milvus数据库作为存储方案，需替换为配套的docker-compose-milvus.yml文件进行部署配置，确保数据库适配正常。完成配置修改后，重启部署服务即可完成版本升级。

## V4.8.3版本更新内容
本次更新包含多项功能新增与问题修复。功能新增方面，支持Milvus数据库，可通过专用配置文件适配；为chat接口的empty answer场景增加日志输出，便于快速排查模型相关问题；新增ifelse判断器，支持对字符串进行正则匹配校验；代码运行环节新增console.log输出能力，可用于调试代码执行逻辑。问题修复方面，修复了Debug模式下变量更新出错的问题，提升了调试环节的稳定性。

## 升级注意事项
升级前需备份当前的配置文件与业务数据，避免因配置修改失误或版本不兼容导致数据丢失。需确认当前部署环境的依赖版本与新版本匹配，若存在自定义的镜像拉取策略，需同步调整以适配v4.8.3版本的镜像。若未使用Milvus数据库作为存储方案，请勿直接替换为docker-compose-milvus.yml的配置，防止存储路径、连接参数等配置出现冲突，导致服务无法正常连接存储组件。同时，升级过程中需确保所有相关镜像均拉取到v4.8.3版本，避免部分组件使用旧版本导致功能异常。

> 来源：https://doc.fastgpt.cn/zh-CN/self-host/upgrading/outdated/483
