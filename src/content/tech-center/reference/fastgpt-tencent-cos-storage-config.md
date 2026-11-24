---
title: FastGPT腾讯云COS对象存储的配置参数与操作步骤
slug: /zh/reference/fastgpt-tencent-cos-storage-config
page_type: 技术速查
source: https://doc.fastgpt.cn/self-host/config/object-storage
source_type: 官方文档小节
---

# FastGPT腾讯云COS对象存储的配置参数与操作步骤

## 结论
本文整理了FastGPT对接腾讯云COS对象存储的官方配置参数与步骤。可直接参考本文完成FastGPT的腾讯云COS存储配置。

## 具体怎么做
1.  设置全局存储厂商变量：`STORAGE_VENDOR = cos`
2.  配置基础必填参数：
    - `STORAGE_REGION`：存储桶地域，如ap-shanghai
    - `STORAGE_ACCESS_KEY_ID`：腾讯云访问密钥ID
    - `STORAGE_SECRET_ACCESS_KEY`：腾讯云访问密钥
3.  配置存储桶名称，需添加账号App ID后缀，例如`fastgpt-public-1250000000`：
    - `STORAGE_PUBLIC_BUCKET`：公共存储桶名称
    - `STORAGE_PRIVATE_BUCKET`：私有存储桶名称
4.  配置可选参数：
    - `STORAGE_COS_PROTOCOL`：协议，可选`https:`或`http:`，自定义域名无证书时请勿使用`https:`
    - `STORAGE_COS_USE_ACCELERATE`：是否启用全球加速，默认`false`，启用前需存储桶开启加速功能
    - `STORAGE_COS_CNAME_DOMAIN`：自定义域名，如`your-domain.com`
    - `STORAGE_COS_PROXY`：代理服务器地址，如`http://localhost:7897`
5.  可参考完整配置示例：
    ```
    STORAGE_VENDOR = cos
    STORAGE_REGION = ap-shanghai
    STORAGE_ACCESS_KEY_ID = your_access_key
    STORAGE_SECRET_ACCESS_KEY = your_secret_key
    STORAGE_PUBLIC_BUCKET = fastgpt-public
    STORAGE_PRIVATE_BUCKET = fastgpt-private
    STORAGE_COS_PROTOCOL = http:
    STORAGE_COS_USE_ACCELERATE = false
    STORAGE_COS_CNAME_DOMAIN =
    STORAGE_COS_PROXY =
    ```

## 注意事项
1.  存储桶名称必须包含账号App ID后缀，格式示例为`fastgpt-public-1250000000`。
2.  公共存储桶需配置匿名读权限，私有存储桶保持私有状态。
3.  `STORAGE_COS_PROTOCOL`的枚举值必须携带冒号，不可省略。
4.  启用`STORAGE_COS_USE_ACCELERATE`前，需确认对应存储桶已开启全球加速功能。
5.  若自定义域名未上传SSL证书，请勿将`STORAGE_COS_PROTOCOL`设置为`https:`。

> 来源：[FastGPT 官方文档](https://doc.fastgpt.cn/self-host/config/object-storage)
