---
title: FastGPT App与Admin共享环境变量配置参数速查
slug: /zh/reference/fastgpt-app-admin-shared-env-vars
page_type: 技术速查
source: https://doc.fastgpt.cn/self-host/config/env
source_type: 官方文档小节
---

# FastGPT App与Admin共享环境变量配置参数速查

## 结论
这些参数是FastGPT自部署时App与Admin服务共享的核心环境变量，覆盖数据库连接、加密密钥、系统权限等关键配置场景。需按文档要求填写必填参数后，才能正常启动相关服务。

## 具体怎么做
可通过以下参数表配置相关环境变量：
| 变量名 | 默认值 | 说明 |
| --- | --- | --- |
| DB_MAX_LINK | 5 | MongoDB、PG、OceanBase、openGauss 等数据库连接池最大连接数。 |
| SYNC_INDEX | true | 是否在启动时创建缺失的 MongoDB 索引并清理显式声明的废弃索引；关闭后需自行维护索引。 |
| FILE_TOKEN_KEY | 无，必填 | 文件读取、文件鉴权相关密钥，长度至少 6 位。 |
| AES256_SECRET_KEY | 无，必填 | AES 加解密密钥，长度至少 6 位。 |
| INVOKE_TOKEN_SECRET | 无，必填 | Invoke 反向调用 JWT 密钥，长度至少 32 位。 |
| ROOT_KEY | fastgpt_root_key | 当前系统管理员 API 密钥，可用于调用 /api/admin/** 接口，长度至少 6 位。 |
| PRO_TOKEN | 空 | FastGPT app 服务端调用 pro/admin 内部接口的凭证，需与 pro/admin 配置一致；App 配置 PRO_URL 时必填。 |
| PRO_URL | 空 | 商业版服务地址，配置后 App 可调用 Pro API，也会作为文件 URL 安全校验允许域名。 |

## 注意事项
1. 所有标记为必填的参数需填写符合长度要求的内容，否则服务无法正常启动。
2. 若关闭SYNC_INDEX参数，需自行维护MongoDB索引，否则可能出现查询异常。
3. PRO_TOKEN需与pro/admin服务的配置保持一致，当配置PRO_URL时，必须填写PRO_TOKEN。
4. 密钥类参数需严格遵守文档指定的长度限制，否则会引发加解密、鉴权失败等问题。

> 来源：[FastGPT 官方文档](https://doc.fastgpt.cn/self-host/config/env)
