---
title: FastGPT 4.15版本升级的环境变量变更配置方法
slug: /zh/reference/fastgpt-415-env-vars-changes
page_type: 技术速查
source: https://doc.fastgpt.cn/self-host/upgrading/4-15/41501
source_type: 官方文档小节
---

# FastGPT 4.15版本升级的环境变量变更配置方法

## 结论
FastGPT 4.15版本升级后存在环境变量变更，需按新规范调整配置。本次变更覆盖文件解析、数据库索引、反向代理校验三类相关参数。

## 具体怎么做
可通过配置以下可选环境变量完成适配：
1.  文件解析类参数
    - PARSE_FILE_WORKERS = 10：文件解析worker并发数
    - PARSE_FILE_TIMEOUT_SECONDS = 600：文件解析超时时间（秒）
    - HTML_TO_MARKDOWN_WORKERS = 10：HTML转Markdown worker并发数
    - TEXT_TO_CHUNKS_WORKERS = 10：文本切块worker并发数
2.  数据库索引同步参数
    - SYNC_INDEX = true：自动同步mongo数据库索引，需使用布尔字符串值
3.  反向代理校验参数
    - TRUSTED_PROXY_ENABLE = false：是否启用可信反向代理客户端IP校验
    - TRUSTED_PROXY_IPS = ：可信反向代理IP/CIDR列表，逗号或空白分隔。仅当TRUSTED_PROXY_ENABLE为true时生效，仅显式可信代理传入的X-Forwarded-For/X-Real-IP会用于客户端IP解析

## 注意事项
1.  SYNC_INDEX需使用布尔字符串值，不可使用原0或1格式。
2.  TRUSTED_PROXY_IPS仅在TRUSTED_PROXY_ENABLE开启时生效，需按要求格式填写IP或CIDR列表。
3.  所有配置参数均为可选，可根据实际业务需求调整。

> 来源：[FastGPT 官方文档](https://doc.fastgpt.cn/self-host/upgrading/4-15/41501)
