---
title: 完成FastGPT Docker部署的数据库备份与迁移操作
slug: /zh/deploy/fastgpt-docker-db-migration
page_type: 部署场景
source: https://doc.fastgpt.cn/zh-CN/self-host/migration/docker_db
source_type: 官方文档
---

# 完成FastGPT Docker部署的数据库备份与迁移操作

当你需要对Docker部署的FastGPT进行数据库备份或跨环境迁移时，可通过本文档的方法完成操作。FastGPT的Docker部署中，PostgreSQL和MongoDB数据库均通过volume挂载本地目录的方式存储数据，无需借助额外的导出导入工具即可完成操作，整体流程简单易执行。

## 标准操作步骤
1. 停止当前服务：在FastGPT的Docker部署根目录下，执行命令 `docker-compose down`，该命令会停止所有相关容器进程，确保数据库文件处于未被占用的安全状态。
2. 复制数据库目录：部署目录下的`pg/data`为PostgreSQL的数据存储目录，`mongo/data`为MongoDB的数据存储目录，直接完整复制这两个目录即可完成数据库备份；若需迁移到其他环境，将复制后的目录放置到目标环境的对应部署位置即可。

## 操作说明补充
该操作属于无额外配置的简单迁移方式，仅依赖本地目录的复制，无需调整任何数据库配置参数。操作过程中需确保复制操作完整，避免出现目录缺失或文件损坏的情况，保障数据的完整性。此外，该操作适用于同版本的FastGPT数据库迁移与备份场景，若涉及跨版本升级，需参考对应版本的升级文档。

> 来源：[FastGPT 官方文档](https://doc.fastgpt.cn/zh-CN/self-host/migration/docker_db)
