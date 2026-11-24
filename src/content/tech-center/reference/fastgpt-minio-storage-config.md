---
title: FastGPT MinIO对象存储配置参数与操作说明
slug: /zh/reference/fastgpt-minio-storage-config
page_type: 技术速查
source: https://doc.fastgpt.cn/self-host/config/object-storage
source_type: 官方文档小节
---

# FastGPT MinIO对象存储配置参数与操作说明

## 结论
FastGPT可通过配置环境变量接入MinIO作为对象存储服务，其他兼容AWS S3协议的对象存储服务也可参照该配置方式设置。完成基础配置后即可正常使用文件存储功能，支持使用公有与私有两类存储桶。

## 具体怎么做
需配置以下必填与可选环境变量，不同场景的参数配置说明如下：
1.  必填环境变量：
   - STORAGE_VENDOR：MinIO场景设为`minio`，AWS S3兼容场景设为`aws-s3`
   - STORAGE_REGION：MinIO场景默认`us-east-1`，AWS S3场景可根据实际区域设置，例如`ap-southeast-1`
   - STORAGE_ACCESS_KEY_ID = 你的访问密钥ID
   - STORAGE_SECRET_ACCESS_KEY = 你的秘密访问密钥
   - STORAGE_PUBLIC_BUCKET = 公共存储桶名称
   - STORAGE_PRIVATE_BUCKET = 私有存储桶名称
   - STORAGE_S3_ENDPOINT：MinIO场景为内网连接地址，例如`http://fastgpt-minio:9000`或`http://127.0.0.1:9000`；AWS S3场景为对应区域的端点，例如`https://s3.ap-southeast-1.amazonaws.com`
2.  可选环境变量：
   - STORAGE_EXTERNAL_ENDPOINT：服务器与客户端均可访问的存储桶地址，请勿使用本地回环地址
   - STORAGE_S3_CDN_ENDPOINT：临时下载使用的CDN地址，需同时配置STORAGE_EXTERNAL_ENDPOINT
   - STORAGE_S3_FORCE_PATH_STYLE：MinIO场景下固定为`true`；AWS S3场景下默认或根据实际设为`false`
   - STORAGE_S3_MAX_RETRIES：请求最大重试次数，默认值为3次

完整配置示例：
### MinIO场景完整配置
```
STORAGE_VENDOR = minio
STORAGE_REGION = us-east-1
STORAGE_ACCESS_KEY_ID = your_access_key
STORAGE_SECRET_ACCESS_KEY = your_secret_key
STORAGE_PUBLIC_BUCKET = fastgpt-public
STORAGE_PRIVATE_BUCKET = fastgpt-private
STORAGE_S3_ENDPOINT = http://127.0.0.1:9000
STORAGE_S3_FORCE_PATH_STYLE = true
STORAGE_S3_MAX_RETRIES = 3
```

### AWS S3兼容场景完整配置
```
STORAGE_VENDOR = aws-s3
STORAGE_REGION = ap-southeast-1
STORAGE_ACCESS_KEY_ID = your_access_key
STORAGE_SECRET_ACCESS_KEY = your_secret_key
STORAGE_PUBLIC_BUCKET = fastgpt-public
STORAGE_PRIVATE_BUCKET = fastgpt-private
STORAGE_S3_ENDPOINT = https://s3.ap-southeast-1.amazonaws.com
STORAGE_S3_FORCE_PATH_STYLE = false
STORAGE_S3_MAX_RETRIES = 3
```

## 注意事项
- STORAGE_EXTERNAL_ENDPOINT 不可使用127.0.0.1或localhost，否则容器内无法访问该地址。
- 配置STORAGE_S3_CDN_ENDPOINT时，必须同时配置STORAGE_EXTERNAL_ENDPOINT，上传文件仍通过FastGPT后端代理，不使用CDN。
- MinIO场景下STORAGE_S3_FORCE_PATH_STYLE参数固定为true，无需手动修改。
- 兼容AWS S3协议的对象存储服务，可将STORAGE_VENDOR设为minio后接入。
- 生产环境建议提前创建公有、私有两个存储桶。公有存储桶需配置公开读取策略，或关联自定义域名、CloudFront。需确保各环境变量的参数值与实际存储服务配置一致。

> 来源：[FastGPT 官方文档](https://doc.fastgpt.cn/self-host/config/object-storage)
> 来源：[FastGPT 官方文档](https://doc.fastgpt.cn/self-host/config/object-storage)
