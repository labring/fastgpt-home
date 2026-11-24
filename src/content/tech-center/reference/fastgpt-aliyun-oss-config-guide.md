---
title: FastGPT 阿里云OSS对象存储配置方法速查
slug: /zh/reference/fastgpt-aliyun-oss-config-guide
page_type: 技术速查
source: https://doc.fastgpt.cn/self-host/config/object-storage
source_type: 官方文档小节
---

# FastGPT 阿里云OSS对象存储配置方法速查

## 结论
本文整理了FastGPT对接阿里云OSS存储的标准配置方案，按照给定参数与步骤操作即可完成配置。公有与私有存储桶可共用同一套访问密钥，但需使用不同名称。

## 具体怎么做
1. 配置基础存储参数：
   - 设置`STORAGE_VENDOR = oss`
   - 配置`STORAGE_REGION`为对应地区标识，例如`oss-cn-hangzhou`
   - 填入`STORAGE_ACCESS_KEY_ID`与`STORAGE_SECRET_ACCESS_KEY`
2. 设置存储桶信息：
   - 配置`STORAGE_PUBLIC_BUCKET`为公有存储桶名称
   - 配置`STORAGE_PRIVATE_BUCKET`为私有存储桶名称，不可与公有桶同名
3. 配置OSS专属参数：
   - 填入`STORAGE_OSS_ENDPOINT`，可使用厂商默认域名或自定义域名
   - 配置`STORAGE_OSS_CNAME`：未使用自定义域名时设为`false`，使用时设为`true`
   - 配置`STORAGE_OSS_SECURE`：开启TLS证书时设为`true`，无证书时设为`false`
   - 可选配置`STORAGE_OSS_INTERNAL`：服务部署在阿里云内网时开启以节省流量，默认值为`false`
4. 可参考官方完整配置示例：
```
STORAGE_VENDOR = oss
STORAGE_REGION = oss-cn-hangzhou
STORAGE_ACCESS_KEY_ID = your_access_key
STORAGE_SECRET_ACCESS_KEY = your_secret_key
STORAGE_PUBLIC_BUCKET = fastgpt-public
STORAGE_PRIVATE_BUCKET = fastgpt-private
STORAGE_OSS_ENDPOINT = oss-cn-hangzhou.aliyuncs.com
STORAGE_OSS_CNAME = false
STORAGE_OSS_SECURE = false
STORAGE_OSS_INTERNAL = false
```

## 注意事项
1. 公有存储桶需设置为公开读权限，私有存储桶保持私有权限。
2. 公有与私有存储桶可使用同一组Access Key，但不可同名。
3. 若使用自定义域名，需将`STORAGE_OSS_CNAME`设为`true`，并将域名填入`STORAGE_OSS_ENDPOINT`。
4. 未配置TLS证书时，需将`STORAGE_OSS_SECURE`设为`false`。

> 来源：[FastGPT 官方文档](https://doc.fastgpt.cn/self-host/config/object-storage)
