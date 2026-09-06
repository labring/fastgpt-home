---
title: 解决FastGPT私有部署升级后的数据库与配置报错
slug: /zh/troubleshoot/fastgpt-private-upgrade-db-error-fix
page_type: 排错/错误码
source: https://github.com/labring/FastGPT/issues/491
source_type: GitHub issue
---

# 解决FastGPT私有部署升级后的数据库与配置报错

## 现象
私有部署FastGPT完成升级后，出现三类报错信息：一是启动时提示`ENOENT: no such file or directory, open '/app/data/config.json'`；二是初始化PostgreSQL时提示`access method "hnsw" does not exist`；三是运行时提示`column "data_id" does not exist`，同时日志显示MongoDB与PostgreSQL连接正常。

## 可能原因
1. 程序启动时无法找到`/app/data/config.json`配置文件，可能是目录未创建或文件丢失。
2. PostgreSQL数据库未安装hnsw访问方法扩展，导致初始化索引失败。
3. 升级后数据库表结构未完成更新，缺少`data_id`列，导致查询报错。

## 排查步骤
1. 检查服务器的`/app/data/`目录是否存在，确认目录内是否包含`config.json`文件，同时确认程序对该文件有读取权限。
2. 连接PostgreSQL数据库，执行查询语句`SELECT 1 FROM pg_am WHERE amname = 'hnsw';`，确认hnsw访问方法是否已存在，若不存在则执行对应安装命令。
3. 检查业务数据库的表结构，确认是否存在缺失的`data_id`列，若缺失则执行数据库升级脚本补全结构。
4. 重启FastGPT服务，查看日志是否仍出现上述报错。

## 解决与验证
针对配置文件缺失问题：确认`/app/data/`目录存在，若目录或文件缺失，手动创建目录并补充符合要求的`config.json`文件，或调整启动脚本使其自动生成该文件。
针对hnsw访问方法缺失问题：在PostgreSQL数据库中执行安装扩展的命令，需确保当前数据库用户有创建扩展的权限。
针对`data_id`列缺失问题：执行FastGPT升级对应的数据库脚本，补全表结构中的`data_id`列。
完成上述操作后，重启FastGPT服务，查看日志无上述报错，即可验证问题已解决。

> 来源：[FastGPT GitHub issue](https://github.com/labring/FastGPT/issues/491)
