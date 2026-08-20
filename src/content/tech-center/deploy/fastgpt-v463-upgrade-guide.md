---
title: FastGPT V4.6.3版本升级步骤与功能说明
slug: /zh/deploy/fastgpt-v463-upgrade-guide
page_type: 部署场景
source: https://doc.fastgpt.cn/zh-CN/self-host/upgrading/outdated/463
source_type: 官方文档
---

# FastGPT V4.6.3版本升级步骤与功能说明

FastGPT自部署环境的版本升级文档中，V4.6.3版本的升级需通过特定初始化API完成数据准备，同时该版本包含多项新增功能与体验优化。本页将详细说明升级操作步骤与版本更新内容。

## 版本升级操作步骤
执行升级需发起1个HTTP POST请求，需替换请求地址中的`{{host}}`为自身部署的域名，替换请求头中的`{{rootkey}}`为环境变量中配置的rootkey值。具体的curl命令如下：
```bash
curl --location --request POST https://{{host}}/api/admin/initv463 \
--header rootkey: {{rootkey}} \
--header Content-Type: application/json
```
该初始化操作的作用为初始化Mongo数据库中dataset、collection和data的部分字段，是升级至V4.6.3版本的必要前置步骤，完成后即可完成版本数据的适配。

## V4.6.3版本功能说明
本次V4.6.3版本的更新包含多项新增与优化内容：
1. 商业版新增功能：支持web站点同步，新增集合元数据记录功能；
2. 多项体验优化：优化url读取内容逻辑，优化流读取文件以防止内存溢出，优化4v模型自动将url转base64以支持本地调试，调整图片压缩等级；
3. 问题修复：修复图片压缩失败报错的问题，防止文件读取过程中出现卡死情况，提升系统运行稳定性。

> 来源：[FastGPT 官方文档](https://doc.fastgpt.cn/zh-CN/self-host/upgrading/outdated/463)
