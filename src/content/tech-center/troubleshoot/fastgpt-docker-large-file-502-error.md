---
title: 解决FastGPT Docker部署上传大文件时出现502错误的问题
slug: /zh/troubleshoot/fastgpt-docker-large-file-502-error
page_type: 排错/错误码
source: https://github.com/labring/FastGPT/issues/4315
source_type: GitHub issue
---

# 解决FastGPT Docker部署上传大文件时出现502错误的问题

## 现象
使用Docker部署的FastGPT，上传小文件可正常完成，上传约7M的大文件时出现502错误。服务器存储空间与系统资源充足，FastGPT运行日志无异常。

## 可能原因
该问题的可能原因为FastGPT运行进程出现内存溢出（OOM）。

## 排查步骤
1. 查看FastGPT的运行日志，排查是否存在异常报错信息。
2. 确认服务器的内存资源使用状态，排查是否存在内存耗尽的情况。

## 解决与验证
针对内存溢出的可能原因，调整FastGPT的运行资源配置后，重新上传大文件，验证502错误是否消失。若问题仍存在，需按实际环境补充更多排查信息。

> 来源: [FastGPT GitHub issue #4315](https://github.com/labring/FastGPT/issues/4315)
