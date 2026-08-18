---
title: FastGPT V4.4及各旧版本升级操作与配置指南
slug: /zh/deploy/fastgpt-old-version-upgrade
page_type: 部署场景
source: https://doc.fastgpt.cn/zh-CN/self-host/upgrading/outdated/44
source_type: 官方文档
---

# FastGPT V4.4及各旧版本升级操作与配置指南

FastGPT自部署版本升级需严格匹配当前使用的版本号执行对应操作，不同版本的升级要求存在明显差异：部分版本需要执行专属升级脚本、调整环境变量配置，部分版本则需要调用初始化API完成数据库字段的初始化。若未按照对应版本的升级流程操作，可能会导致服务启动失败、数据异常甚至业务中断，因此需参照官方文档中对应版本的专属指引完成升级。

### 对应版本升级操作步骤
首先需获取两个关键参数：FastGPT部署的主机地址`{{host}}`，以及环境变量中配置的`rootkey`值。随后通过HTTP POST请求调用初始化API，完成Mongo数据库部分字段的初始化。具体命令如下：
```bash
curl --location --request POST https://{{host}}/api/admin/initv44 \
--header rootkey: {{rootkey}} \
--header Content-Type: application/json
```
执行该命令前，需确保FastGPT服务已正常启动，且`rootkey`值与环境变量中的配置完全一致，否则请求会返回认证失败的报错。该请求执行成功后，会完成Mongo数据库相关字段的初始化，为对应版本的运行提供必要的数据库支持。

除V4.4版本外，官方文档中还整理了多个历史版本的升级说明，例如V4.4.1、V4.3、V4.10.0等版本，其中部分版本存在环境变量变更的要求，需在升级前提前调整对应环境变量的配置；带有升级脚本标注的版本，则需先执行对应脚本完成前置操作，再完成镜像更新与服务重启。在正式升级前，需先确认当前运行的FastGPT版本，查找对应版本的升级指引，避免遗漏必要的操作步骤。同时，升级过程中需做好数据备份，以防出现异常导致数据丢失，影响业务正常运行。

> 来源：[FastGPT 官方文档](https://doc.fastgpt.cn/zh-CN/self-host/upgrading/outdated/44)
