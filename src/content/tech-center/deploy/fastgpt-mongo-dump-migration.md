---
title: 使用dump模式完成FastGPT的MongoDB数据库跨环境迁移
slug: /zh/deploy/fastgpt-mongo-dump-migration
page_type: 部署场景
source: https://doc.fastgpt.cn/zh-CN/self-host/migration/docker_mongo
source_type: 官方文档
---

# 使用dump模式完成FastGPT的MongoDB数据库跨环境迁移

本文介绍使用mongodump的dump模式完成FastGPT的MongoDB数据库跨环境迁移的方法，适用于从现有FastGPT部署环境迁移到新环境的场景，包括跨云服务器、NAS部署等情况。需注意，NAS部署的FastGPT环境要求MongoDB版本为4.2或4.4，云端环境可使用默认版本。

### 迁移操作步骤
1.  **环境准备**：在源环境（A）、过渡环境（C）和目标环境（B）创建备份目录。源环境中进入FastGPT容器执行`mkdir -p /data/backup`，宿主机创建`/fastgpt/data/backup`目录用于同步容器内文件；过渡环境宿主机创建对应同步目录；目标环境需创建`/fastgpt/mongobackup`目录，注意不要在fastgpt/data目录下创建。
2.  **导出源环境数据**：在源环境执行mongodump导出命令，可直接在服务器本地运行：`docker exec -it mongo bash -c "mongodump --db fastgpt -u username -p password --authenticationDatabase admin --out /data/backup"`。若容器内目录未自动同步到宿主机，可使用`docker cp mongo:/data/backup [A环境本地fastgpt目录]:/fastgpt/data/backup`手动拷贝文件。
3.  **压缩与传输**：进入源环境宿主机的fastgpt/mongo/data目录，执行`tar -czvf ../fastgpt-mongo-backup-$(date +%Y-%m-%d).tar.gz ./`生成压缩包。可通过scp命令将压缩包传输到本地过渡环境或目标环境，示例命令：`scp -i /Users/path/[user.pem换成你自己的pem文件链接] root@[fastgpt所在云服务器地址]:/usr/fastgpt/mongo/fastgpt-mongo-backup-$(date +%Y-%m-%d).tar.gz /[本地电脑路径]/Downloads/fastgpt`。
4.  **校验与上传**：将压缩包上传到目标环境后，在过渡环境或目标环境解压缩：`tar -xvzf fastgpt-mongo-backup-2024-05-03.tar.gz -C /fastgpt/mongobackup/data`，检查解压后的bson文件数量是否完整。

### 注意事项
跨环境scp传输可能出现数据丢失，需校验压缩包完整性后再进行后续操作；若未自动同步容器内的备份目录，需使用docker cp命令手动完成文件拷贝；导出数据时需确认数据库名称为fastgpt，并正确配置MongoDB的用户名和密码。

> 来源：https://doc.fastgpt.cn/zh-CN/self-host/migration/docker_mongo
