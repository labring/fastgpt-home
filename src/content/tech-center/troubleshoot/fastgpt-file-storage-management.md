---
title: FastGPT对话上传文件图片的存储位置与管理方法
slug: /zh/troubleshoot/fastgpt-file-storage-management
page_type: 排错/错误码
source: https://github.com/labring/FastGPT/issues/3743
source_type: GitHub issue
---

# FastGPT对话上传文件图片的存储位置与管理方法

## 现象
用户关注FastGPT对话过程中上传的图片与文件的存储位置，询问除对话日志外统一查看这些文件内容的途径，同时提出当积累大量文件与图片时，如何进行统一管理与清理。

## 可能原因
未明确FastGPT上传文件、图片的存储载体与默认清理规则，且不清楚非对话日志场景下统一查看文件的方式。

## 排查步骤
1. 确认FastGPT上传的文件与图片的存储载体为MongoDB数据库
2. 查找MongoDB中用于存储对话上传文件的相关集合，具体集合需按实际环境确认
3. 核对MongoDB中该集合的过期删除配置，确认默认清理周期

## 解决与验证
FastGPT对话上传的图片与文件存储于MongoDB数据库中。可通过MongoDB客户端连接对应数据库，查询存储对话上传文件的集合以统一查看文件内容，具体集合需按实际环境确认。系统默认配置为上传的文件与图片7天后自动过期删除，如需调整该清理周期，需按实际环境确认MongoDB的相关配置。

> 来源: [FastGPT GitHub issue #3743](https://github.com/labring/FastGPT/issues/3743)
