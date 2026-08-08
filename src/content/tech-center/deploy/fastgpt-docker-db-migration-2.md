---
title: FastGPT Docker部署环境的数据库备份与迁移操作方法
slug: /zh/deploy/fastgpt-docker-db-migration-2
page_type: 部署场景
source: https://doc.fastgpt.cn/zh-CN/self-host/migration/docker_db
source_type: 官方文档
---

# FastGPT Docker部署环境的数据库备份与迁移操作方法

本操作指南针对Docker Compose部署的FastGPT场景，用于完成内置PG和Mongo数据库的备份与迁移，属于官方推荐的无脑迁移方案，仅适用于使用本地挂载卷存储数据库的部署配置，不适用于外接独立数据库的部署方案。

### 标准迁移操作步骤
1. 停止服务：在FastGPT的部署根目录下执行`docker-compose down`命令，确保所有相关服务完全停止，避免运行时写入数据导致文件不一致或损坏。
2. 复制数据目录：Docker部署的PG数据库数据存储在本地`pg/data`目录，Mongo数据库数据存储在本地`mongo/data`目录，直接完整复制这两个目录即可完成数据备份，复制后的目录可用于迁移到新的部署环境。

执行该操作时还有几个需要注意的易错点：必须在服务完全停止后进行，若在服务运行时复制目录，可能导致数据文件损坏或不一致，引发后续服务启动异常。该方案无需额外工具，操作流程简单，但仅适用于同架构的数据库迁移，若需跨大版本升级，需参考对应版本的升级说明文档，避免出现兼容性问题。

> 来源：https://doc.fastgpt.cn/zh-CN/self-host/migration/docker_db
