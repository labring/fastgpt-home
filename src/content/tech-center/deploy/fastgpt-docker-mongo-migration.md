---
title: FastGPT基于Docker的MongoDB数据迁移备份恢复操作
slug: /zh/deploy/fastgpt-docker-mongo-migration
page_type: 部署场景
source: https://doc.fastgpt.cn/self-host/migration/docker_mongo
source_type: 官方文档小节
---

# FastGPT基于Docker的MongoDB数据迁移备份恢复操作

### 前置准备
需提前在源环境A、目标环境B和中转环境C创建对应备份目录。在源环境A的FastGPT容器内执行`mkdir -p /data/backup`，宿主机对应创建`/fastgpt/data/backup`目录用于数据同步；在目标环境B的宿主机创建`/fastgpt/mongobackup`目录，注意不要放在fastgpt/data目录下。可通过`show dbs`命令确认源环境中存在fastgpt数据库。

### 数据导出与中转
在源环境A的服务器本地执行导出命令，导出fastgpt数据库到临时目录：
```bash
docker exec -it mongo bash -c "mongodump --db fastgpt -u 'username' -p 'password' --authenticationDatabase admin --out /data/backup"
```
导出完成后，进入源环境宿主机的`/usr/fastgpt/mongo/data`目录，执行压缩命令生成带日期的备份包：
```bash
tar -czvf ../fastgpt-mongo-backup-$(date +%Y-%m-%d).tar.gz ./
```
若需中转留存，可通过scp命令传输压缩包，示例命令如下：
```bash
scp -i /Users/path/your.pem root@old-server-ip:/usr/fastgpt/mongo/fastgptbackup-2024-05-03.tar.gz /local/path/Downloads
```
传输完成后，可在中转环境解压缩并核对文件数量，确保数据完整。

### 数据导入与恢复
在目标环境B的宿主机找到传输的压缩包，执行解压缩命令：
```bash
tar -xvzf fastgptbackup-2024-05-03.tar.gz -C /fastgpt/mongobackup/data
```
由于备份目录未自动同步到MongoDB容器，需手动将解压后的文件复制到容器内临时目录，操作前需确保容器的data目录已清理干净，否则导入会报错：
```bash
docker cp /fastgpt/mongobackup/data mongo:/tmp/backup
```

> 来源：[FastGPT 官方文档](https://doc.fastgpt.cn/self-host/migration/docker_mongo)
