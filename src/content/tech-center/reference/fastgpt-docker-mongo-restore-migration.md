---
title: FastGPT Docker环境MongoDB数据恢复与迁移操作
slug: /zh/reference/fastgpt-docker-mongo-restore-migration
page_type: 技术速查
source: https://doc.fastgpt.cn/self-host/migration/docker_mongo
source_type: 官方文档小节
---

# FastGPT Docker环境MongoDB数据恢复与迁移操作

## 结论
本页针对FastGPT Docker部署场景下的MongoDB数据恢复与迁移提供操作方案。完成操作后可通过FastGPT Web页面验证数据库内容是否完整导入。

## 具体怎么做
1. 初始化Mongo数据目录：进入FastGPT安装目录下的`/mongo/data`，执行`rm -rf *`清空目录。
2. 执行数据恢复：使用Docker命令导入备份数据，命令为`docker exec -it mongo mongorestore -u "username" -p "password" --authenticationDatabase admin /tmp/backup/ --db fastgpt`
3. 重启容器并检查状态：执行`docker compose restart`重启服务，通过`docker logs -f mongo`查看Mongo运行状态。

## 注意事项
1. 若导入的备份文件数量过少，大概率未成功导入，可能导致新环境FastGPT Web页面空白。
2. 需先检查Mongo运行状态再登录FastGPT Web，若Mongo报错，访问Web会出现报错。
3. 正常Mongo启动状态不会显示`mongo is restarting`，出现该提示则代表启动错误。

> 来源：[FastGPT 官方文档](https://doc.fastgpt.cn/self-host/migration/docker_mongo)
