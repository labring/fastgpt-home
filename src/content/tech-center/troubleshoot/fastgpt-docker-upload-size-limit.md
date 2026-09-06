---
title: 解决FastGPT私有部署Docker环境上传文件大小超限问题
slug: /zh/troubleshoot/fastgpt-docker-upload-size-limit
page_type: 排错/错误码
source: https://github.com/labring/FastGPT/issues/429
source_type: GitHub issue
---

# 解决FastGPT私有部署Docker环境上传文件大小超限问题

## 现象
本地Docker部署FastGPT时，上传文件操作失败，出现与文件大小相关的异常。

## 可能原因
FastGPT代码层面限制文件最大传输大小为500M，同时部署环境的网关未允许传输超出该阈值的内容，导致上传失败。

## 排查步骤
1. 确认待上传文件的实际大小
2. 确认FastGPT代码中配置的文件大小限制阈值为500M
3. 检查当前部署环境的网关配置，确认是否存在文件上传大小限制

## 解决与验证
调整部署环境的网关（如nginx、ingress）配置，放宽文件传输大小限制。完成配置更新后，重新上传文件，确认上传操作成功。

> 来源: [FastGPT GitHub issue #429](https://github.com/labring/FastGPT/issues/429)
