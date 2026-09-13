---
title: FastGPT 4.6私有部署版MongoDB数据库迁移指南
slug: /zh/troubleshoot/fastgpt-private-mongo-migration-guide
page_type: 排错/错误码
source: https://github.com/labring/FastGPT/issues/1359
source_type: GitHub issue
---

# FastGPT 4.6私有部署版MongoDB数据库迁移指南

## 现象
FastGPT 4.6私有部署版本在跨环境迁移时，缺乏官方的MongoDB数据库迁移指引，多名用户包括部署者在内多次尝试迁移均失败。

## 可能原因
1. 项目未提供官方MongoDB数据库迁移文档；
2. 原环境与目标环境的MongoDB容器持久化目录配置存在差异；
3. 数据库导出、导入的命令参数配置错误；
4. 目标环境MongoDB版本需为4.2或4.4，需按实际环境确认。

## 排查步骤
1. 进入原环境的MongoDB容器，确认数据库名称：执行`docker exec -it mongo sh`，再执行`mongo -u 'username' -p 'password'`，运行`show dbs`确认fastgpt数据库存在。
2. 创建备份目录：在原环境Mongo容器执行`mkdir -p /data/backup`，在过渡宿主机执行`mkdir -p /fastgpt/data/backup`。
3. 导出MongoDB数据：在原环境容器执行`mongodump --db fastgpt -u 'username' -p 'password' --authenticationDatabase admin --out /data/backup`，或使用`docker cp mongo:/data/backup <过渡宿主机目录>`直接拷贝文件。
4. 压缩并转移备份文件：进入原环境fastgpt/mongo/data目录，执行`tar -czvf ../fastgpt-mongo-backup-$(date +%Y-%m-%d).tar.gz ./`，通过scp等方式转移到目标环境宿主机。
5. 解压备份文件：在目标环境宿主机执行`tar -xvzf fastgpt-mongo-backup-xxx.tar.gz -C <目标目录>`。
6. 将备份文件上传到目标环境Mongo容器：执行`docker cp <宿主机备份目录> mongo:/tmp/backup`。

## 解决与验证
在目标环境的MongoDB容器中执行导入命令：`mongorestore --db fastgpt -u 'username' -p 'password' --authenticationDatabase admin /tmp/backup/fastgpt`。完成导入后启动FastGPT服务，验证应用功能是否正常加载数据库数据。

> 来源：[FastGPT GitHub issue](https://github.com/labring/FastGPT/issues/1359)
