---
title: 解决FastGPT API文件库无法兼容S3协议存储的问题
slug: /zh/troubleshoot/fastgpt-api-file-library-s3-support
page_type: 排错/错误码
source: https://github.com/labring/FastGPT/issues/3463
source_type: GitHub issue
---

# 解决FastGPT API文件库无法兼容S3协议存储的问题

## 现象
FastGPT的API文件库功能在使用时，无法直接适配S3协议的分布式存储系统，无法通过填写S3存储桶相关参数直接遍历存储桶内的所有对象，无法满足对应使用需求。

## 可能原因
官方未对S3协议存储进行封装，且S3协议本身存在不统一的情况，当前未内置相关适配支持，因此无法直接使用S3存储系统对接API文件库功能。

## 排查步骤
1. 确认当前业务使用的存储系统类型为S3协议的分布式存储。
2. 核对FastGPT API文件库的官方支持范围，确认未内置S3协议的适配配置。
3. 因官方未提供内置支持，需按实际环境确认后续的自定义适配方案。

## 解决与验证
通过自行编写serverless服务来兼容S3协议存储，将该服务对接至FastGPT的API文件库功能。需按实际环境配置S3存储桶相关参数，自行实现遍历存储桶内所有对象的逻辑，完成对接后即可正常使用API文件库功能。

> 来源: [FastGPT GitHub issue #3463](https://github.com/labring/FastGPT/issues/3463)
