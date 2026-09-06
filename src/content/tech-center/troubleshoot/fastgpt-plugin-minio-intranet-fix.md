---
title: 解决FastGPT插件系统MinIO内网访问限制问题
slug: /zh/troubleshoot/fastgpt-plugin-minio-intranet-fix
page_type: 排错/错误码
source: https://github.com/labring/FastGPT/issues/5137
source_type: GitHub issue
---

# 解决FastGPT插件系统MinIO内网访问限制问题

## 现象
FastGPT私有部署版本v4.10.0的插件系统中，MinIO被要求公网可访问。部署环境为仅具备互联网访问权限的内网环境，无法将MinIO公网暴露，导致插件系统无法正常使用。

## 可能原因
FastGPT插件系统的MinIO访问配置默认适配公网访问场景，未针对仅具备互联网访问权限的内网环境提供适配方案。

## 排查步骤
1. 确认当前部署环境为仅具备互联网访问权限的内网环境，无公网暴露MinIO的条件。
2. 检查FastGPT插件系统中MinIO的访问配置参数。
3. 需按实际环境确认配置是否适配内网访问场景。

## 解决与验证
将MinIO的访问配置调整为内网可访问的地址，无需强制公网暴露。修改后按以下步骤复测：1. 修改MinIO访问配置为内网可访问的地址。2. 重启FastGPT插件系统相关服务。3. 测试插件系统的MinIO相关功能是否正常可用。

> 来源: [FastGPT GitHub issue #5137](https://github.com/labring/FastGPT/issues/5137)
