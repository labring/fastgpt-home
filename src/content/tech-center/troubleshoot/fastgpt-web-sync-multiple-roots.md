---
title: 解决FastGPT在线版知识库网页同步仅支持单个根地址的问题
slug: /zh/troubleshoot/fastgpt-web-sync-multiple-roots
page_type: 排错/错误码
source: https://github.com/labring/FastGPT/issues/805
source_type: GitHub issue
---

# 解决FastGPT在线版知识库网页同步仅支持单个根地址的问题

## 现象
在FastGPT在线版的知识库管理中，网页同步功能的配置界面仅允许填写单个网站根地址。当需要同步多个不同根地址的网页内容时，需为每个根地址单独创建知识库，导致配置流程繁琐，提升了使用复杂度，增加了知识库的管理成本。

## 可能原因
当前网页同步功能的配置逻辑未开放多网站根地址的并行输入支持，仅支持单个根地址的配置，具体的限制规则需结合实际部署环境进一步确认。

## 排查步骤
1. 登录FastGPT在线平台，进入需要配置网页同步的目标知识库详情页
2. 找到网页同步功能的配置区域，查看根地址输入框的交互限制，确认是否仅支持单个地址填写
3. 核对当前使用的FastGPT版本是否为最新正式发布版本，确认是否存在版本更新带来的功能调整

## 解决与验证
目前该功能暂无公开的多网站根地址配置方案。若需实现多个网站根地址的同步配置，需等待官方功能迭代更新，或结合实际部署环境探索自定义配置的可行方式。

> 来源: [FastGPT GitHub issue #805](https://github.com/labring/FastGPT/issues/805)
