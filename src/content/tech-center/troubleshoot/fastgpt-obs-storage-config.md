---
title: 解决FastGPT接入华为云OBS对象存储的配置问题
slug: /zh/troubleshoot/fastgpt-obs-storage-config
page_type: 排错/错误码
source: https://github.com/labring/FastGPT/issues/6270
source_type: GitHub issue
---

# 解决FastGPT接入华为云OBS对象存储的配置问题

## 现象
用户在FastGPT的环境变量配置文件中，未找到华为云OBS相关的配置项，且现有配置无法适配OBS的访问地址格式：OBS的公有/私有桶访问地址为`https://{桶名}.obs.{区域}.myhuaweicloud.com`，但现有配置的`STORAGE_EXTERNAL_ENDPOINT`仅支持填写固定的存储服务地址，无法为不同的公有、私有桶单独配置带桶名前缀的访问域名。

## 可能原因
FastGPT默认内置的存储配置仅支持标注的minio、aws-s3、cos、oss四种厂商，未内置华为云OBS的适配逻辑；同时现有配置的变量设计未单独为公有、私有桶配置独立的访问域名，仅通过`STORAGE_EXTERNAL_ENDPOINT`统一配置存储服务地址，与OBS的桶级域名格式不匹配。

## 排查步骤
1. 打开FastGPT的环境变量配置文件，找到共享存储配置块（如示例中的`x-share-db-config`下的存储相关变量）。
2. 查看当前`STORAGE_VENDOR`的可选配置值，确认是否有适配华为云OBS的选项（原配置中未列出）。
3. 梳理现有存储配置变量的作用，包括`STORAGE_EXTERNAL_ENDPOINT`、`STORAGE_PUBLIC_BUCKET`、`STORAGE_PRIVATE_BUCKET`、`STORAGE_ACCESS_KEY_ID`、`STORAGE_SECRET_ACCESS_KEY`等。
4. 记录华为云OBS的实际访问区域、桶名、AK/SK等信息，需按实际环境确认各参数的正确性。

## 解决与验证
1. 将`STORAGE_VENDOR`的值修改为`aws-s3`，利用兼容S3 API的特性适配华为云OBS。
2. 将`STORAGE_EXTERNAL_ENDPOINT`设置为`https://obs.{区域}.myhuaweicloud.com`，其中`{区域}`替换为实际的华为云区域，例如`cn-north-4`。
3. 分别将`STORAGE_PUBLIC_BUCKET`和`STORAGE_PRIVATE_BUCKET`设置为实际的公有、私有桶名，如`fastgpt-public`、`fastgpt-private`。
4. 填写`STORAGE_ACCESS_KEY_ID`和`STORAGE_SECRET_ACCESS_KEY`为华为云账号对应的访问密钥。
5. 无需在`STORAGE_EXTERNAL_ENDPOINT`中填写桶名，系统将自动拼接桶名与存储服务地址，符合OBS的域名格式要求，需按实际环境确认拼接逻辑是否适配。
6. 重启FastGPT服务，验证文件上传、存储访问等功能是否正常，若出现异常需按实际环境调整配置参数。

> 来源：https://github.com/labring/FastGPT/issues/6270
