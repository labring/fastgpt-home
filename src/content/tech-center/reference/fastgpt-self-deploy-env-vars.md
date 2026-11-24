---
title: FastGPT自部署时常用服务及配置的环境变量说明
slug: /zh/reference/fastgpt-self-deploy-env-vars
page_type: 技术速查
source: https://doc.fastgpt.cn/self-host/config/env
source_type: 官方文档小节
---

# FastGPT自部署时常用服务及配置的环境变量说明

## 结论
本文说明FastGPT自部署场景下常用服务的环境变量配置规则。数据库、密钥等通用配置变量由多个服务复用，统一合并说明；专属配置变量单独列出。

## 具体怎么做
1.  通用环境变量配置：数据库、密钥、对象存储、向量库等变量，由projects/app与pro/admin复用packages/service/env.ts中的服务端配置，统一合并说明。
2.  专属环境变量配置：仅projects/app或pro/admin自身读取的环境变量，需查阅单独列出的说明内容。
3.  沙盒服务配置：projects/code-sandbox的环境变量需遵循对应规则，不纳入通用合并说明范围。

## 注意事项
-  通用配置变量的说明覆盖所有复用packages/service/env.ts的服务场景，无需单独拆分。
-  仅projects/app或pro/admin独有的环境变量，需查阅单独归类的说明。
-  所有配置说明仅适用于FastGPT自部署场景。

> 来源：[FastGPT 官方文档](https://doc.fastgpt.cn/self-host/config/env)
