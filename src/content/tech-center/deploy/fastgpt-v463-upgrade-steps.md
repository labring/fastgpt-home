---
title: FastGPT V4.6.3版本升级操作与功能说明
slug: /zh/deploy/fastgpt-v463-upgrade-steps
page_type: 部署场景
source: https://doc.fastgpt.cn/zh-CN/self-host/upgrading/outdated/463
source_type: 官方文档
---

# FastGPT V4.6.3版本升级操作与功能说明

## 版本升级说明
本文档针对FastGPT V4.6.3版本的自部署升级流程，该升级仅会初始化Mongo数据库中dataset、collection和data的部分字段，不会改动其他核心业务数据结构，适用于已部署更早版本FastGPT的技术人员进行版本升级。

## 升级操作步骤
执行升级前，请确保已正确配置环境变量中的rootkey与部署域名。通过以下curl命令发起初始化API请求，需将`{{rootkey}}`替换为环境变量内的rootkey值，`{{host}}`替换为你的部署域名：
```bash
curl --location --request POST https://{{host}}/api/admin/initv463 \
--header rootkey: {{rootkey}} \
--header Content-Type: application/json
```
注意：该请求仅需执行一次，重复执行可能导致字段重复更新，引发数据异常。若请求失败，请检查rootkey与host的配置是否正确。

## 版本功能优化与修复
V4.6.3版本包含多项功能调整：商业版新增web站点同步、集合元数据记录功能；优化了URL内容读取逻辑，同时升级流式读取文件的处理方式，避免服务出现内存溢出问题；支持4v模型自动将URL转换为base64格式，可在本地环境进行调试；调整了图片压缩等级，优化图片处理体验。此外，该版本修复了图片压缩失败报错的问题，防止文件读取过程中服务卡死。需要注意的是，web站点同步等功能仅在商业版中可用，社区版无法使用此类专属功能。

> 来源：https://doc.fastgpt.cn/zh-CN/self-host/upgrading/outdated/463
