---
title: FastGPT V4.8.1版本升级与数据初始化清理操作指南
slug: /zh/deploy/fastgpt-v481-upgrade-steps
page_type: 部署场景
source: https://doc.fastgpt.cn/zh-CN/self-host/upgrading/outdated/481
source_type: 官方文档
---

# FastGPT V4.8.1版本升级与数据初始化清理操作指南

## 版本升级前置说明
FastGPT V4.8.1版本升级需执行专用初始化脚本与脏数据清理操作。由于该版本修复了集合名不规范的问题，初始化操作会重置相关表名，因此在执行初始化前，需确保`dataset.trainings`表无任何数据。为避免数据冲突与异常，建议在更新版本时暂停所有正在进行的业务流程，再开展后续的升级操作。

## 可执行操作步骤
### 初始化脚本执行
从任意终端发起HTTP请求，替换参数后执行以下命令：
```bash
curl --location --request POST https://{{host}}/api/admin/initv481 \
--header rootkey: {{rootkey}} \
--header Content-Type: application/json
```
其中`{{rootkey}}`需替换为环境变量中配置的rootkey值，`{{host}}`需替换为FastGPT的访问域名。
### 脏数据清理执行
初始化完成后，可执行脏数据清理命令，修复此前定时清理定时器存在的问题，手动清理未被自动清理的残留数据：
```bash
curl --location --request POST https://{{host}}/api/admin/clearInvalidData \
--header rootkey: {{rootkey}} \
--header Content-Type: application/json
```

## 版本更新细节
V4.8.1版本的Chat API接口新增了`event: updateVariables`事件，用于实现变量更新功能。此前系统内置的定时脏数据清理定时器存在异常，导致部分数据未被自动清理，因此需在初始化完成后手动执行脏数据清理命令，完成数据清理工作。

> 来源：[FastGPT 官方文档](https://doc.fastgpt.cn/zh-CN/self-host/upgrading/outdated/481)
