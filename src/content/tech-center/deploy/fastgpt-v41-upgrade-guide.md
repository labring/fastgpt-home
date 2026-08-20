---
title: FastGPT从旧版本升级到V4.1的详细完整操作指南
slug: /zh/deploy/fastgpt-v41-upgrade-guide
page_type: 部署场景
source: https://doc.fastgpt.cn/zh-CN/self-host/upgrading/outdated/41
source_type: 官方文档
---

# FastGPT从旧版本升级到V4.1的详细完整操作指南

### 升级前提说明
FastGPT V4.1版本重构了对话存储结构，优化了底层数据存储逻辑，同时统一了数据库连接的环境变量配置。从旧版本升级到该版本时，需要完成原有存储内容的初始化操作，否则可能出现对话数据异常或功能异常的问题，同时需同步更新数据库连接的环境变量配置。

### 具体操作步骤
1. **更新数据库环境变量**：该版本将原有分开的MongoDB和PostgreSQL连接配置合并为单个URL变量，简化了部署配置。替换原有连接变量为以下格式，其中`/fastgpt`和`/postgres`为数据库名称，需与旧版配置保持一致：
```bash
# MongoDB 连接配置
MONGODB_URI=mongodb://username:password@mongo:27017/fastgpt?authSource=admin
# PostgreSQL 连接配置
PG_URL=postgresql://username:password@pg:5432/postgres
```
若出现MongoDB连接失败的情况，可尝试移除URL末尾的`?authSource=admin`参数。
2. **执行存储初始化**：完成新版项目部署后，发起HTTP请求`https://xxxxx/api/admin/initChatItem`，请求需携带`headers.rootkey`，该值对应环境变量中配置的rootkey参数，用于验证管理员权限。

### 注意事项
该升级流程仅适用于从旧版本升级到V4.1的场景，首次部署V4.1无需执行该初始化操作。配置过程中需确保数据库名称与旧版一致，否则会出现数据库连接错误；若未正确携带rootkey参数，初始化请求会返回权限错误。若执行初始化后仍存在异常，需检查环境变量配置是否正确，以及数据库服务是否正常运行。

> 来源：[FastGPT 官方文档](https://doc.fastgpt.cn/zh-CN/self-host/upgrading/outdated/41)
