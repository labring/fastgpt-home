---
title: FastGPT 4.8.20升级后知识库搜索text index报错排查指南
slug: /zh/troubleshoot/fastgpt-upgrade-text-index-troubleshooting
page_type: 排错/错误码
source: https://github.com/labring/FastGPT/issues/3695
source_type: GitHub issue
---

# FastGPT 4.8.20升级后知识库搜索text index报错排查指南

## 现象
使用docker-compose方式将FastGPT从4.8.19升级至4.8.20版本后，无论原有知识库还是新建知识库，均可正常创建索引，但执行知识库搜索测试时，前端控制台返回`POST http://192.168.12.144:3000/api/core/dataset/searchTest 500 (Internal Server Error)`，报错信息包含`text index required for $text query`与`AxiosError: Request failed with status code 500`，且Embedding接口可正常返回结果。

## 可能原因
该报错`text index required for $text query`是MongoDB数据库的校验提示，表明当前知识库集合缺少必要的文本索引。结合本次docker-compose版本升级的场景，推测为升级脚本未正确执行索引创建操作，导致搜索时触发校验失败。

## 排查步骤
1. 连接FastGPT部署的MongoDB数据库，进入对应业务数据库。
2. 执行`db.getCollection('<实际知识库集合名>').getIndexes()`命令，查看当前集合的所有索引，其中`<实际知识库集合名>`需按实际部署环境确认。
3. 检查返回的索引列表中是否存在类型为`text`的索引，若不存在则确认索引缺失。

## 解决与验证
1. 若确认缺失文本索引，执行索引创建命令：`db.getCollection('<实际知识库集合名>').createIndex({ content: "text" }, { default_language: "none" })`，其中`content`为知识库的文本存储字段，需按实际环境确认字段名称。
2. 完成索引创建后，重新进入FastGPT的知识库搜索测试页面，执行搜索操作，确认不再出现`text index required for $text query`报错，且搜索结果可正常返回。

> 来源：[FastGPT GitHub issue](https://github.com/labring/FastGPT/issues/3695)
