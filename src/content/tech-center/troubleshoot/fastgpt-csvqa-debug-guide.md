---
title: FastGPT csvQA源码查找与私有化部署排错指南
slug: /zh/troubleshoot/fastgpt-csvqa-debug-guide
page_type: 排错/错误码
source: https://github.com/labring/FastGPT/issues/1500
source_type: GitHub issue
---

# FastGPT csvQA源码查找与私有化部署排错指南

## 现象
用户在GitHub代码页面未找到csvQA的文档接入、向量搜索、问题优化相关的.py文件，同时向维护者询问私有化部署的两种部署方式的便捷性差异。

## 可能原因
FastGPT项目使用TypeScript作为开发语言，因此不存在.py后缀的对应源码文件；用户对两种私有化部署方式的维护要求不明确，无法快速明确部署方案的选择方向。

## 排查步骤
1. 查看项目代码文件的后缀名，确认开发语言类型。
2. 梳理两种私有化部署方式的维护要求，明确各自的基础特性。

## 解决与验证
1. 源码查找：项目采用TypeScript开发，需查找.ts后缀的对应文件，下载完整项目源码即可进行修改。
2. 部署选型：Sealos无需自行维护云资源；Docker Compose需自行维护云资源、备份和监控等工作。可根据实际环境需求选择对应部署方式。

> 来源: [FastGPT GitHub issue #1500](https://github.com/labring/FastGPT/issues/1500)
