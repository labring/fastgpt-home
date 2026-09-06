---
title: 解决FastGPT私有部署中S3预签名URL创建失败问题
slug: /zh/troubleshoot/fastgpt-s3-ipv6-connect-error
page_type: 排错/错误码
source: https://github.com/labring/FastGPT/issues/6093
source_type: GitHub issue
---

# 解决FastGPT私有部署中S3预签名URL创建失败问题

## 现象
用户在FastGPT 4.14.3私有部署版本中，配置了`S3_EXTERNAL_BASE_URL`为S3公网访问地址后，执行文件上传操作时容器抛出报错。报错日志显示`Failed to create post presigned url`，具体错误信息为`connect ENETUNREACH 2409:8a55:************:e207:20f9:443 - Local (:::0)`，系统同时弹出`System unexpected error: /api/core/dataset/presignDatasetFilePostUrl, Failed to create post presigned url`的意外错误提示。

## 可能原因
该报错源于系统尝试通过IPv6地址连接S3服务时失败。当前部署环境可能未配置IPv6网络访问能力，或DNS解析返回了S3服务的IPv6地址，导致连接请求无法正常完成，最终触发预签名URL创建失败。

## 排查步骤
1. 确认当前FastGPT部署环境是否支持IPv6网络访问。
2. 查看`S3_EXTERNAL_BASE_URL`对应的域名解析结果，确认是否包含IPv6地址。
3. 检查FastGPT容器的网络配置，确认是否存在IPv6访问限制。
4. 核对S3服务的公网访问地址配置是否与实际可用地址一致。

## 解决与验证
如果当前部署环境不支持IPv6网络，可调整网络配置优先使用IPv4，或修改域名解析策略使`S3_EXTERNAL_BASE_URL`仅返回IPv4地址。完成配置调整后，重新执行文件上传操作，验证是否不再出现预签名URL创建失败的报错，确认文件上传流程恢复正常。若环境支持IPv6，则需检查S3服务的IPv6地址是否可正常访问，或调整相关网络策略放行IPv6连接。

> 来源：[FastGPT GitHub issue](https://github.com/labring/FastGPT/issues/6093)
