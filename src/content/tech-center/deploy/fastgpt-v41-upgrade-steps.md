---
title: FastGPT从旧版本升级到V4.1的配置与操作步骤
slug: /zh/deploy/fastgpt-v41-upgrade-steps
page_type: 部署场景
source: https://doc.fastgpt.cn/zh-CN/self-host/upgrading/outdated/41
source_type: 官方文档
---

# FastGPT从旧版本升级到V4.1的配置与操作步骤

### 升级前置说明
FastGPT V4.1版本重新设计了对话存储结构，同时优化了数据库连接的环境变量配置，从旧版本升级至该版本时，需要完成环境变量更新与原有存储内容初始化两个核心操作，否则可能出现对话数据异常或服务启动失败的问题。

### 标准化升级步骤
这是可直接照做的操作流程：
1.  **更新环境变量**：V4.1将MongoDB和PostgreSQL的多参数连接配置合并为单个URL格式，无需再拆分配置多个独立参数。官方推荐的配置示例如下：
    ```bash
    # MongoDB 连接配置，若连接失败可移除?authSource=admin参数
    MONGODB_URI=mongodb://username:password@mongo:27017/fastgpt?authSource=admin
    # PostgreSQL 连接配置
    PG_URL=postgresql://username:password@pg:5432/postgres
    ```
    请将示例中的`username`、`password`替换为你实际的数据库账号密码，`mongo`、`pg`替换为你的数据库服务地址，数据库名称`fastgpt`和`postgres`需与旧版本配置保持一致。
2.  **执行存储初始化**：完成环境变量更新并启动新版服务后，需要发起一次HTTP请求完成原有对话存储结构的初始化。请求地址为`https://你的部署域名/api/admin/initChatItem`，请求头需携带`rootkey`，其值为部署环境中配置的`ROOT_KEY`环境变量值。

### 升级后续注意事项
执行初始化请求后，系统将自动完成原有存储结构的适配，无需额外手动干预。请确保部署的新版服务可以正常访问数据库实例，若出现连接报错，请检查环境变量中的数据库URL配置是否正确，或尝试移除MongoDB连接中的`authSource`参数。初始化请求仅需执行一次，重复执行不会对系统造成影响。

> 来源：https://doc.fastgpt.cn/zh-CN/self-host/upgrading/outdated/41
