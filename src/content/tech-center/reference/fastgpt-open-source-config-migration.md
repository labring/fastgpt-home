---
title: FastGPT开源版config.json配置迁移为环境变量的操作指南
slug: /zh/reference/fastgpt-open-source-config-migration
page_type: 技术速查
source: https://doc.fastgpt.cn/self-host/upgrading/4-15/41507
source_type: 官方文档小节
---

# FastGPT开源版config.json配置迁移为环境变量的操作指南

## 结论
FastGPT 4.15版本开源版已移除config.json配置文件，所有原配置项需通过环境变量进行配置。本次变更覆盖MCP代理、PDF解析、向量检索及知识库并发处理等多个核心配置模块。

## 具体怎么做
1.  删除项目中原有的config.json配置文件。
2.  配置以下环境变量，所有变量名需严格匹配给定格式：
| 环境变量名 | 默认值/说明 |
| --- | --- |
| SSE_MCP_SERVER_PROXY_ENDPOINT | http://localhost:3003，用于MCP的SSE地址拼接，末尾请勿加/ |
| CUSTOM_PDF_PARSE_URL | 自定义PDF解析服务地址，可选配置 |
| CUSTOM_PDF_PARSE_KEY | 自定义PDF解析服务密钥，可选配置 |
| DOC2X_KEY | Doc2x PDF解析服务密钥，可选配置 |
| TEXTIN_APP_ID | 合合信息Textin服务App ID，可选配置 |
| TEXTIN_SECRET_CODE | 合合信息Textin服务Secret Code，可选配置 |
| HNSW_EF_SEARCH | 100，仅对PG/OB/OpenGauss数据库生效 |
| HNSW_MAX_SCAN_TUPLES | 100000，仅对PG数据库生效 |
| DATASET_PARSE_MAX_PROCESS | 10，知识库文件解析队列最大并发数 |
| VECTOR_MAX_PROCESS | 10，向量训练队列最大并发数 |
| QA_MAX_PROCESS | 10，问答拆分队列最大并发数 |
| VLM_MAX_PROCESS | 10，图片理解模型处理队列最大并发数 |

## 注意事项
1.  所有环境变量名必须严格使用大写格式，大小写不匹配将导致配置无法加载。
2.  SSE_MCP_SERVER_PROXY_ENDPOINT的末尾请勿添加斜杠，否则会导致SSE地址拼接错误。
3.  部分PDF解析相关的环境变量为可选配置，未配置时将使用内置默认解析能力。
4.  向量检索类参数仅对指定数据库生效，其他数据库无需配置此类变量。
5.  知识库并发处理参数默认值均为10，可根据服务器实际资源进行调整。

> 来源：[FastGPT 官方文档](https://doc.fastgpt.cn/self-host/upgrading/4-15/41507)
