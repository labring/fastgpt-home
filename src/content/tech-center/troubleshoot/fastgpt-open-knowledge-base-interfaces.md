---
title: 为FastGPT配置开放知识库查询删除更新详情接口的方法
slug: /zh/troubleshoot/fastgpt-open-knowledge-base-interfaces
page_type: 排错/错误码
source: https://github.com/labring/FastGPT/issues/705
source_type: GitHub issue
---

# 为FastGPT配置开放知识库查询删除更新详情接口的方法

## 现象
使用应用管理知识库时，无法调用查询、删除、详情、更新等知识库接口。已确认FastGPT为最新版本，查阅项目README后未找到对应接口的启用说明，同时发现代码中已存在相关接口的实现。

## 可能原因
未在项目文档中找到开放知识库查询、删除、详情、更新等接口的配置指引，且未确认代码中已有的接口是否已正确启用，具体配置要求需结合实际部署环境确认。

## 排查步骤
1. 确认已将FastGPT升级至最新版本。
2. 核对代码仓库，确认存在查询、删除、详情、更新等知识库相关接口的实现。
3. 查阅项目官方文档，查找相关接口的启用与配置要求。
4. 检查接口访问的权限配置是否符合项目要求。

## 解决与验证
当前已知代码中已包含查询、删除、详情、更新等知识库接口的实现。需按照项目文档的指引完成相关接口的启用配置，配置完成后通过测试调用验证接口可正常运行。若遇到配置异常，需结合实际部署环境进一步排查具体问题。

> 来源: [FastGPT GitHub issue #705](https://github.com/labring/FastGPT/issues/705)
