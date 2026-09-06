---
title: 解决FastGPT部署时runtime/cgo: pthread_create failed报错问题
slug: /zh/troubleshoot/fastgpt-deployment-pthread-error-fix
page_type: 排错/错误码
source: https://github.com/labring/FastGPT/issues/4213
source_type: GitHub issue
---

# 解决FastGPT部署时runtime/cgo: pthread_create failed报错问题

## 现象
部署FastGPT的过程中，出现报错runtime/cgo: pthread_create failed: Operation not permitted。用户已完成例行检查，确认当前无类似issue，完整查看过项目文档，且自身密钥可正常使用，使用的Docker版本为20.10.7，部署场景为私有部署。

## 可能原因
该报错由Docker版本过低引发，当前使用的Docker版本为20.10.7，属于低于要求的版本范围，无法正常处理相关线程创建请求，从而触发该报错。

## 排查步骤
1. 执行docker --version命令，查看当前环境的Docker版本号。
2. 核对当前Docker版本是否为20.10.7或更早的版本，确认是否符合低版本触发报错的条件。

## 解决与验证
将Docker升级到20.10.24或更新版本。升级完成后，重新部署FastGPT，确认报错runtime/cgo: pthread_create failed: Operation not permitted不再出现。

> 来源: [FastGPT GitHub issue #4213](https://github.com/labring/FastGPT/issues/4213)
