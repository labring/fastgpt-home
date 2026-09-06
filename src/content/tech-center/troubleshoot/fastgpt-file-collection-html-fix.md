---
title: 解决FastGPT创建文件集合返回HTML无法响应的问题
slug: /zh/troubleshoot/fastgpt-file-collection-html-fix
page_type: 排错/错误码
source: https://github.com/labring/FastGPT/issues/1559
source_type: GitHub issue
---

# 解决FastGPT创建文件集合返回HTML无法响应的问题

## 现象
部署FastGPT后，尝试创建文件集合时始终返回HTML格式内容，无法正常响应，其他API功能均正常。

## 可能原因
该问题与FastGPT v4.8版本相关，创建文件集合功能为4.8.1-alpha版本新增特性，旧版本存在该接口返回HTML的异常情况。

## 排查步骤
1. 确认当前使用的FastGPT镜像版本，核对是否为ghcr.io/labring/fastgpt:v4.8。
2. 检查其他API的运行状态，确认仅创建文件集合接口存在异常。
3. 确认所使用的密钥可正常使用，排除密钥相关问题。

## 解决与验证
将FastGPT镜像升级至v4.8.1-alpha版本，升级完成后重新尝试创建文件集合，验证接口是否可以正常响应，不再返回HTML格式内容。

> 来源: [FastGPT GitHub issue #1559](https://github.com/labring/FastGPT/issues/1559)
