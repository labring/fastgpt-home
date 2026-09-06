---
title: 解决FastGPT与Aiproxy的PostgreSQL配置问题
slug: /zh/troubleshoot/fastgpt-aiproxy-postgres-config
page_type: 排错/错误码
source: https://github.com/labring/FastGPT/issues/4212
source_type: GitHub issue
---

# 解决FastGPT与Aiproxy的PostgreSQL配置问题

## 现象
当前部署中FastGPT与Aiproxy服务分别绑定独立PostgreSQL容器，存在资源浪费，或需调整配置以共用同一PostgreSQL实例。

## 可能原因
两个服务未配置为使用同一PostgreSQL实例下的不同数据库，而是各自部署独立的PostgreSQL容器，导致资源占用增加，或连接参数配置不匹配。

## 排查步骤
1. 查看docker-compose.yml配置文件，确认aiproxy_pg容器与aiproxy容器的配置及环境变量。
2. 检查当前是否为两个服务使用独立的PostgreSQL容器。
3. 确认PostgreSQL实例中是否存在对应业务数据库。

## 解决与验证
1. 编辑docker-compose.yml，注释掉aiproxy_pg容器的配置部分。
2. 修改aiproxy容器的SQL_DSN环境变量，将原地址改为同一PostgreSQL实例的不同数据库，格式示例为`postgres://postgres:aiproxy@[postgres服务地址]:5432/aiproxy`。
3. 在PostgreSQL实例中创建aiproxy数据库。
4. 重新启动相关容器，验证两个服务均可正常启动并运行。

> 来源: [FastGPT GitHub issue #4212](https://github.com/labring/FastGPT/issues/4212)
