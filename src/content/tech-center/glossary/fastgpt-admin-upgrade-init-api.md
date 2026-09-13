---
title: FastGPT版本升级初始化API的使用说明与注意事项
slug: /zh/glossary/fastgpt-admin-upgrade-init-api
page_type: 术语表
source: https://doc.fastgpt.cn/zh-CN/self-host/upgrading/4-13/4132
source_type: 官方文档
---

# FastGPT版本升级初始化API的使用说明与注意事项

## 一句话定义
FastGPT版本升级初始化API，用于执行指定FastGPT版本的系统数据迁移与初始化操作。

## 在FastGPT里怎么用
需从任意终端发起HTTP POST请求，替换请求中的`{{rootkey}}`为环境变量中的rootkey，`{{host}}`为FastGPT域名。请求格式为：
```bash
curl --location --request POST 'https://{{host}}/api/admin/initvX' \
--header 'rootkey: {{rootkey}}' \
--header 'Content-Type: application/json'
```
其中`initvX`为对应版本的初始化接口，如`initv4132`、`initv4144`。不同接口对应不同操作：`initv4132`会删除原先S3的circleLife策略；`initv4144`会将4.14.3遗留的Dataset/local接口上传的文件迁移到S3，并全量计算旧chat中的反馈以增加flags值，该操作异步执行，需关注日志是否打印`Migration feedback completed!`。

## 容易搞错的地方
使用外部S3存储时，若外部S3不支持circleLife操作，执行`initv4132`脚本会报错，可忽略该错误，因为设置策略本身会失败。`initv4144`的反馈计算操作执行较慢，接口不会返回结果，需通过日志确认完成状态。

> 来源： [FastGPT 官方来源](https://doc.fastgpt.cn/zh-CN/self-host/upgrading/4-13/4132)

> 来源： [FastGPT 官方来源](https://doc.fastgpt.cn/zh-CN/self-host/upgrading/4-14/4144)

## 适用性与版本范围

本页适用于官方来源记录的 术语表 场景。执行变更前，需核对 FastGPT、依赖、API 与部署版本。

## 安全护栏

凭证与私密数据使用 [REDACTED_CREDENTIAL] 占位符。执行操作前需核对文档的环境与版本。

## 回滚指引

恢复变更前的技术内容权威快照、已保存配置与数据快照，再执行最小验证场景。
