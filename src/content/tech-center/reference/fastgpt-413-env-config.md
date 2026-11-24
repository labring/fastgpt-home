---
title: FastGPT 4.13版本升级的环境变量更新配置指南
slug: /zh/reference/fastgpt-413-env-config
page_type: 技术速查
source: https://doc.fastgpt.cn/self-host/upgrading/4-13/4130
source_type: 官方文档小节
---

# FastGPT 4.13版本升级的环境变量更新配置指南

## 结论
本页针对FastGPT 4.13版本升级场景，说明需更新的环境变量配置内容。需同步调整fastgpt-plugin的环境变量命名，新增指定的S3、MongoDB、Redis相关环境参数。

## 具体怎么做
1.  找到FastGPT部署的环境变量配置文件，更新fastgpt-plugin相关的环境变量命名。
2.  补充或替换以下环境变量参数，将示例值替换为实际部署的对应配置：
| 环境变量名 | 示例值 | 说明 |
| --- | --- | --- |
| S3_EXTERNAL_BASE_URL | https://xxx.com | S3外网地址 |
| S3_ENDPOINT | localhost | S3服务端点 |
| S3_PORT | 9000 | S3服务端口 |
| S3_USE_SSL | false | 是否启用SSL |
| S3_ACCESS_KEY | minioadmin | S3访问密钥 |
| S3_SECRET_KEY | minioadmin | S3密钥 |
| S3_TOOL_BUCKET | fastgpt-tool | 系统工具临时文件存储桶，公开读私有写 |
| S3_PLUGIN_BUCKET | fastgpt-plugin | 系统插件热安装文件存储桶，私有读写 |
| RETENTION_DAYS | 15 | 系统工具临时文件保存天数 |
| MONGODB_URI | mongodb://myusername:mypassword@mongo:27017/fastgpt?authSource=admin | MongoDB连接参数 |
| REDIS_URL | redis://default:mypassword@redis:6379 | Redis连接参数 |
3.  重启FastGPT及相关服务，使新配置生效。

## 注意事项
1.  两个S3存储桶的权限要求不同：S3_TOOL_BUCKET需设置为公开读私有写，S3_PLUGIN_BUCKET需设置为私有读写。
2.  商业版fastgpt-pro也需要同步配置上述S3相关的环境变量。
3.  环境变量的名称必须严格使用原文给出的命名，不得自行修改。
4.  MONGODB_URI和REDIS_URL的格式需严格匹配示例，包含认证信息、服务地址与端口。

> 来源：[FastGPT 官方文档](https://doc.fastgpt.cn/self-host/upgrading/4-13/4130)
