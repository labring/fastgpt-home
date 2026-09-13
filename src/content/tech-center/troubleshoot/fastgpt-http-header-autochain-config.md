---
title: FastGPT HTTP请求头添加与AutoChain功能实现方法
slug: /zh/troubleshoot/fastgpt-http-header-autochain-config
page_type: 排错/错误码
source: https://github.com/labring/FastGPT/issues/557
source_type: GitHub issue
---

# FastGPT HTTP请求头添加与AutoChain功能实现方法

## 现象
用户已确认使用最新版本的FastGPT，并完整查阅过官方文档，在本地部署并完成基础试玩后，仍无法明确HTTP模块添加请求头的操作方法，同时不清楚如何实现类似AutoChain的功能。

## 可能原因
早期版本的FastGPT HTTP模块不支持添加请求头，后续版本已更新支持该功能；AutoChain功能的交互实现方式仍在探索中，暂无直接可用的方案，相关规划将通过后续版本的功能模块替代实现。

## 排查步骤
1. 确认当前使用的FastGPT版本是否为官方发布的最新版本。
2. 进入对应应用的HTTP模块配置页面，查找与请求头相关的配置入口。
3. 查阅FastGPT官方文档或社区讨论内容，确认AutoChain功能的当前实现状态。

## 解决与验证
HTTP模块请求头配置：FastGPT已支持添加请求头功能，可在对应HTTP模块的配置界面中找到对应设置项完成配置。AutoChain功能：当前暂无直接的实现方式，该功能预计将被FastGPT 4.7版本的tool模块替代，需等待对应版本更新后再使用相关功能。

> 来源: [FastGPT GitHub issue #557](https://github.com/labring/FastGPT/issues/557)
