---
title: 解决FastGPT调用getPreviewChunks接口返回name未定义的500错误
slug: /zh/troubleshoot/fastgpt-getpreviewchunks-name-error
page_type: 排错/错误码
source: https://github.com/labring/FastGPT/issues/6678
source_type: GitHub issue
---

# 解决FastGPT调用getPreviewChunks接口返回name未定义的500错误

## 现象
在FastGPT 4.14.7.2私有部署版本中，创建知识库并上传任意文件（如.txt）后，点击「分块预览」按钮，前端会调用POST /api/core/dataset/file/getPreviewChunks接口，接口返回{"code":500,"statusText":"error","message":"name is not defined","data":null}。后端错误日志显示ReferenceError: name is not defined，调用链路涉及OSS存储的文件存在性检查逻辑。

## 可能原因
根据错误日志与代码调用栈，报错源于OSS存储相关的请求创建环节，未定义的`name`变量大概率是代码中未正确传递存储文件的相关参数，或是OSS存储配置存在缺失项，导致在检查目标文件是否存在时无法获取必要的文件名参数。

## 排查步骤
1. 确认当前FastGPT版本为4.14.7.2，且使用阿里云OSS作为存储服务，已配置`STORAGE_VENDOR=oss`相关环境变量。
2. 检查OSS存储的环境配置参数，确认`STORAGE_REGION`、`STORAGE_PUBLIC_BUCKET`、`STORAGE_PRIVATE_BUCKET`、`STORAGE_OSS_ENDPOINT`、`STORAGE_OSS_CNAME`、`STORAGE_OSS_SECURE`、`STORAGE_OSS_INTERNAL`等参数均已正确配置且无缺失。
3. 查看调用`getPreviewChunks`接口的请求负载，确认`sourceId`参数格式符合`dataset/[datasetId]/[文件名]`的规范，且未携带非法字符。
4. 检查当前使用的OSS密钥是否拥有对应Bucket的读写权限。
5. 查看后端服务的详细错误日志，定位抛出`ReferenceError: name is not defined`的具体代码位置，确认未定义变量对应的参数来源。

## 解决与验证
该问题需根据具体原因修复：若为配置缺失则补充完整OSS存储的必要环境变量；若为代码逻辑漏洞则需更新至官方修复后的版本。验证时，重新配置正确的OSS存储参数后，重新上传文件并点击「分块预览」按钮，确认接口不再返回500错误，且能正常展示文件分块内容，同时后端日志无`name is not defined`相关报错。

> 来源：https://github.com/labring/FastGPT/issues/6678
