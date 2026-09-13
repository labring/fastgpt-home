---
title: 解决阿里云PAI平台非Docker部署FastGPT的相关问题
slug: /zh/troubleshoot/alibaba-pai-non-docker-fastgpt-troubleshooting
page_type: 排错/错误码
source: https://github.com/labring/FastGPT/issues/1546
source_type: GitHub issue
---

# 解决阿里云PAI平台非Docker部署FastGPT的相关问题

## 现象
在阿里云PAI平台尝试非Docker部署FastGPT时，出现部署失败情况。另有用户反馈，使用Docker部署FastGPT到PAI平台也无法成功。同时PAI平台存在网络限制：无法对外提供API服务，但可访问外部互联网服务。

## 可能原因
部署失败的可能原因包括：PAI平台限制无法对外暴露API服务，导致FastGPT的对外服务无法被访问；非Docker部署未适配PAI平台的运行环境；未正确配置网络访问规则，以允许PAI访问外部API服务。

## 排查步骤
1. 确认PAI平台的网络权限，检查是否允许访问外部互联网服务，以及是否限制对外暴露端口。
2. 核对非Docker部署FastGPT的配置，确保适配PAI平台的运行环境参数。
3. 验证PAI平台是否可正常访问外部API服务。
4. 记录部署过程中的报错信息，用于后续排查。

## 解决与验证
将大模型部署为可被PAI访问的API服务，通过API接入FastGPT。FastGPT可通过Docker或sealos方式部署。验证时，确认PAI可正常访问外部接入的API服务，测试FastGPT的功能是否正常运行。

> 来源: [FastGPT GitHub issue #1546](https://github.com/labring/FastGPT/issues/1546)
