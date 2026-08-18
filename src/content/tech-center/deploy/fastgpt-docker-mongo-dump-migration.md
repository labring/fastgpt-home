---
title: 使用mongodump模式完成FastGPT的Docker环境MongoDB数据库迁移
slug: /zh/deploy/fastgpt-docker-mongo-dump-migration
page_type: 部署场景
source: https://doc.fastgpt.cn/zh-CN/self-host/migration/docker_mongo
source_type: 官方文档
---

# 使用mongodump模式完成FastGPT的Docker环境MongoDB数据库迁移

## 迁移概述
本文介绍使用mongodump模式完成FastGPT的Docker环境MongoDB数据库迁移的方法，适用于将现有部署的FastGPT数据迁移至新的Docker环境。需提前确认源环境、目标环境的MongoDB版本兼容，且提前在源、目标及过渡环境创建对应备份目录。

## 详细迁移步骤
1.  **目录准备**
    在源环境的FastGPT容器内创建临时备份目录，该目录会自动同步至宿主机的FastGPT安装目录下的`Data/backup`：
    ```bash
    docker exec -it fastgpt sh
    mkdir -p /data/backup
    ```
    同时在目标环境创建备份目录，注意不要放在`fastgpt/data`目录下：
    ```bash
    mkdir -p /fastgpt/mongobackup
    ```
2.  **导出源环境数据**
    在源环境服务器本地执行导出命令，无需进入容器，需替换其中的`username`、`password`为实际的MongoDB认证信息：
    ```bash
    docker exec -it mongo bash -c "mongodump --db fastgpt -u username -p password --authenticationDatabase admin --out /data/backup"
    ```
    若文件未自动同步至宿主机，可使用以下命令手动拷贝：
    ```bash
    docker cp mongo:/data/backup [A环境本地fastgpt目录]:/fastgpt/data/backup
    ```
3.  **压缩与传输备份文件**
    进入源环境宿主机的FastGPT数据目录，压缩备份文件：
    ```bash
    cd /usr/fastgpt/mongo/data
    tar -czvf ../fastgpt-mongo-backup-$(date +%Y-%m-%d).tar.gz ./
    ```
    使用scp命令将压缩包传输至目标环境或过渡环境，需替换其中的密钥路径、服务器地址和目标路径：
    ```bash
    scp -i /Users/path/your-pem-file.pem root@[源服务器地址]:/usr/fastgpt/mongo/fastgpt-mongo-backup-$(date +%Y-%m-%d).tar.gz [目标路径]
    ```
4.  **导入数据至目标环境**
    在目标环境宿主机解压备份文件：
    ```bash
    tar -xvzf fastgpt-mongo-backup-2024-05-03.tar.gz -C /fastgpt/mongobackup/data
    ```
    解压后可检查bson文件的数量，确认文件完整后即可导入目标MongoDB。

## 迁移注意事项
迁移过程中需注意备份文件的完整性，若跨环境传输后文件数量不一致，可能导致导入后无数据。建议先在过渡环境校验解压后的文件，确认无误后再传输至目标环境。同时需确保目标环境的MongoDB版本符合FastGPT的兼容要求。

> 来源：[FastGPT 官方文档](https://doc.fastgpt.cn/zh-CN/self-host/migration/docker_mongo)
