---
title: 配置FastGPT Compose部署以使用外部数据库并移除内置应用
slug: /zh/troubleshoot/fastgpt-compose-remove-builtin-services
page_type: 排错/错误码
source: https://github.com/labring/FastGPT/issues/3057
source_type: GitHub issue
---

# 配置FastGPT Compose部署以使用外部数据库并移除内置应用

## 现象
使用Compose方式部署FastGPT时，存在需要复用已有的外部数据库，且避免部署额外Docker应用的场景，需对默认部署配置进行调整。

## 可能原因
默认的Compose部署配置内置了数据库与相关应用组件，未提供直接复用外部已有服务以及移除指定内置应用的原生支持。

## 排查步骤
1. 确认已有的外部数据库服务处于正常可用状态，且部署环境可通过网络正常访问该数据库服务。
2. 定位FastGPT的Compose部署配置文件，找到其中内置数据库与相关应用的服务配置段落。
3. 对原始的Compose配置文件进行备份，防止修改后出现异常问题。
4. 需按实际部署环境确认配置文件的具体路径与内置服务的配置段名称。

## 解决与验证
移除Compose配置中与内置API相关的服务配置段落。修改FastGPT的数据库连接配置，将默认的内置数据库地址替换为已有的外部数据库地址。启动Compose部署后，检查服务是否正常运行，且无额外的内置应用容器启动，确认数据库连接状态正常。

> 来源: [FastGPT GitHub issue #3057](https://github.com/labring/FastGPT/issues/3057)
