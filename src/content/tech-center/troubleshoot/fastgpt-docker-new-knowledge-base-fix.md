---
title: 解决FastGPT Docker部署后无法新建知识库的问题
slug: /zh/troubleshoot/fastgpt-docker-new-knowledge-base-fix
page_type: 排错/错误码
source: https://github.com/labring/FastGPT/issues/119
source_type: GitHub issue
---

# 解决FastGPT Docker部署后无法新建知识库的问题

## 现象
Docker部署FastGPT后，可正常进入系统、完成注册账号操作，但无法新建知识库。使用最新版docker-compose镜像部署时，进入PostgreSQL容器并连接数据库后，输入init.sql无任何输出。

## 可能原因
首次部署时init.sql会自动执行以完成数据库初始化，若该自动执行流程失败，会导致数据库缺少必要配置，进而无法新建知识库。

## 排查步骤
1. 进入FastGPT部署所使用的PostgreSQL Docker容器。
2. 执行数据库连接操作。
3. 输入init.sql语句，查看命令执行后是否有输出反馈。

## 解决与验证
若init.sql未自动执行，手动复制对应的SQL语句并在数据库中执行。执行完成后，重新尝试新建知识库，验证功能是否恢复正常。

> 来源: [FastGPT GitHub issue #119](https://github.com/labring/FastGPT/issues/119)
