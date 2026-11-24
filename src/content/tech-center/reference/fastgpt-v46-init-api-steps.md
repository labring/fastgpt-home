---
title: FastGPT v46版本初始化API的标准执行步骤说明
slug: /zh/reference/fastgpt-v46-init-api-steps
page_type: 技术速查
source: https://doc.fastgpt.cn/self-host/upgrading/outdated/46
source_type: 官方文档小节
---

# FastGPT v46版本初始化API的标准执行步骤说明

## 结论
本页说明FastGPT v46版本的初始化API执行流程，需按顺序完成两个接口调用。该操作用于完成系统默认团队、数据库资源等核心初始化配置。

## 具体怎么做
1. 替换参数：将`{{rootkey}}`替换为环境变量中的rootkey，`{{host}}`替换为部署的域名。
2. 执行第一个初始化接口：发起POST请求到`https://{{host}}/api/admin/initv46`，请求头需包含`rootkey: {{rootkey}}`和`Content-Type: application/json`，可使用以下curl命令：
```
curl --location --request POST 'https://{{host}}/api/admin/initv46' \
--header 'rootkey: {{rootkey}}' \
--header 'Content-Type: application/json'
```
3. 确认第一个接口执行成功后，执行第二个初始化接口：发起POST请求到`https://{{host}}/api/admin/initv46-2`，请求头同上，可使用以下curl命令：
```
curl --location --request POST 'https://{{host}}/api/admin/initv46-2' \
--header 'rootkey: {{rootkey}}' \
--header 'Content-Type: application/json'
```

## 注意事项
1. 初始化接口执行速度可能较慢，若返回超时无需处理，需通过日志确认执行结果。
2. 必须严格按顺序执行两个接口，需确认`initv46`执行成功后，再执行`initv46-2`。
3. 本次初始化包含四项内容：创建默认团队、初始化Mongo所有资源的团队字段、初始化Pg的字段、初始化Mongo Data。

> 来源：[FastGPT 官方文档](https://doc.fastgpt.cn/self-host/upgrading/outdated/46)
