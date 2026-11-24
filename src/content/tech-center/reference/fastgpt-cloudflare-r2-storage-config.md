---
title: 配置FastGPT对接Cloudflare R2对象存储的参数与步骤
slug: /zh/reference/fastgpt-cloudflare-r2-storage-config
page_type: 技术速查
source: https://doc.fastgpt.cn/self-host/config/object-storage
source_type: 官方文档小节
---

# 配置FastGPT对接Cloudflare R2对象存储的参数与步骤

## 结论
FastGPT支持通过S3兼容API对接Cloudflare R2对象存储。完成对应环境变量配置后，即可正常使用R2存储与访问文件。

## 具体怎么做
1. 将`STORAGE_VENDOR`设置为`r2`
2. 配置以下必填环境变量：
| 环境变量 | 取值要求 |
| --- | --- |
| `STORAGE_REGION` | 固定为`auto` |
| `STORAGE_S3_ENDPOINT` | 填写Cloudflare控制台提供的账户级S3 endpoint，格式为`https://<account-id>.r2.cloudflarestorage.com` |
| `STORAGE_R2_PUBLIC_ENDPOINT` | 公开Bucket的自定义域名或已绑定的公开HTTPS域名，如`https://assets.example.com` |
| `STORAGE_ACCESS_KEY_ID` | R2的访问密钥ID |
| `STORAGE_SECRET_ACCESS_KEY` | R2的秘密访问密钥 |
| `STORAGE_PUBLIC_BUCKET` | 提前创建的公开Bucket名称 |
| `STORAGE_PRIVATE_BUCKET` | 提前创建的私有Bucket名称 |
| `STORAGE_S3_FORCE_PATH_STYLE` | 固定为`false` |

## 注意事项
1. R2不支持通过FastGPT的`STORAGE_S3_CDN_ENDPOINT`重写预签名URL，私有对象建议使用默认的`short-proxy`下载模式。
2. `STORAGE_R2_PUBLIC_ENDPOINT`不能是R2的S3 API endpoint，也不应包含查询参数。
3. 生产环境建议使用自定义域名，不建议使用受速率限制的`r2.dev`公共开发URL。
4. 需提前创建公开与私有Bucket，FastGPT启动时仅检查Bucket是否存在，不会自动创建。

> 来源：[FastGPT 官方文档](https://doc.fastgpt.cn/self-host/config/object-storage)
