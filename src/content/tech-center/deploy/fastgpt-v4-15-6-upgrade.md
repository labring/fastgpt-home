---
title: FastGPT V4.15.6版本升级操作与修复内容说明
slug: /zh/deploy/fastgpt-v4-15-6-upgrade
page_type: 部署场景
source: https://doc.fastgpt.cn/zh-CN/self-host/upgrading/4-15/4156
source_type: 官方文档
---

# FastGPT V4.15.6版本升级操作与修复内容说明

## 升级镜像说明
本次V4.15.6版本属于FastGPT 4.15.x系列的迭代更新，仅涉及核心服务的镜像标签更新，未新增任何功能模块，也未变更原有环境变量配置。用户在升级过程中无需调整之前部署的环境变量，可直接沿用现有配置。需要更新的两个核心服务镜像分别为：fastgpt-app（FastGPT主服务）的镜像tag需替换为v4.15.6，fastgpt-pro（FastGPT商业版服务）的镜像tag同样需更新为v4.15.6。相较于该系列更早的版本，本次更新仅针对已知交互问题进行修复，没有其他结构性变更。

## 可执行升级步骤
1. 打开你的FastGPT部署配置文件，若使用Docker Compose部署则对应`docker-compose.yml`文件，若使用其他部署方式则对应各自的容器配置文件；
2. 找到配置文件中对应fastgpt-app和fastgpt-pro的image字段，将原有镜像tag替换为v4.15.6，例如将`image: fastgpt/fastgpt-app:旧版本号`修改为`image: fastgpt/fastgpt-app:v4.15.6`，商业版服务的镜像配置同理进行修改；
3. 保存配置文件后，执行容器重启命令以拉取最新镜像并启动服务。若使用Docker Compose部署，可直接执行`docker compose up -d`命令完成更新，该命令会自动拉取新镜像并重启相关容器。若为单容器部署，则需手动停止原有容器后重新运行带有新tag的镜像命令。

## 本次修复的问题
本次V4.15.6版本修复了一个高频交互问题：当用户首次直接通过链接打开对话页面时，无法正常加载历史对话记录的问题。该问题曾导致部分用户首次访问对话页面时出现页面加载异常，无法查看过往的对话内容。本次修复后，首次直接打开对话页面的用户可正常加载历史对话记录，提升了整体使用体验。此外，本次升级未涉及其他功能或配置的变更，用户升级后可正常使用原有所有功能。

> 来源：[FastGPT 官方文档](https://doc.fastgpt.cn/zh-CN/self-host/upgrading/4-15/4156)
