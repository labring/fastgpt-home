---
title: 解决本地FastGPT前端连接Docker内数据库失败问题
slug: /zh/troubleshoot/fastgpt-local-db-docker-connect-fix
page_type: 排错/错误码
source: https://github.com/labring/FastGPT/issues/1072
source_type: GitHub issue
---

# 解决本地FastGPT前端连接Docker内数据库失败问题

## 现象
本地Mac Intel环境下，通过Docker部署完整FastGPT（含前端、Mongo、PG），可正常登录、上传知识库、使用机器人聊天。之后尝试本地启动FastGPT前端，连接Docker内的Mongo与PG容器以省去本地安装数据库的步骤，但无法完成连接。本地可ping通Mongo、PG容器，容器也可ping通本机，端口无冲突；尝试使用本地主机名10.0.9.248、127.0.0.1、localhost作为数据库连接主机名，仍出现登录报错。

## 可能原因
1. MongoDB连接字符串未添加`directConnection=true`参数，无法适配Docker端口映射的本地连接场景。
2. 数据库连接字符串中的账号、密码、主机名、端口与Docker内数据库的实际配置不匹配。
3. 本地前端服务的网络配置未正确指向Docker映射后的数据库端口。

## 排查步骤
1. 核对Docker容器的端口映射配置：查看`docker-compose.yml`中的`ports`字段，确认Mongo、PG的容器端口与本地端口的映射关系正确，例如示例中PG容器端口5432映射为本地5433。
2. 检查`.env.local`中的数据库连接参数：
   - 确认`MONGODB_URI`中的用户名、密码、数据库名、主机名、端口与Docker内Mongo的配置一致，例如示例中用户名为`myusername`，密码为`mypassword`，数据库为`fastgpt`。
   - 确认`PG_URL`中的用户名、密码、数据库名、主机名、端口与Docker内PG的配置一致，例如示例中用户名为`username`，密码为`password`，数据库为`postgres`。
3. 验证MongoDB连接适配参数：根据官方提示，本地开发连接Docker内Mongo时，需在`MONGODB_URI`末尾添加`&directConnection=true`参数。
4. 使用本地数据库工具测试连接：通过MongoDB Compass、PGAdmin等工具，使用`.env.local`中的连接字符串测试是否可正常连接Docker内的数据库，排除数据库本身的连接问题。

## 解决与验证
1. 修正MongoDB连接字符串：在原`MONGODB_URI`末尾添加`&directConnection=true`，例如修改为`mongodb://myusername:mypassword@10.0.9.248:27017/fastgpt?authSource=admin&directConnection=true`。
2. 确认PG连接参数无误，确保`PG_URL`中的端口与Docker映射的本地端口一致，例如示例中映射为5433，则`PG_URL`中的端口应为5433。
3. 重新启动本地FastGPT前端服务，尝试登录系统，若可正常登录、上传知识库、使用机器人聊天，则问题解决。
4. 若仍无法连接，需按实际环境确认防火墙配置、容器网络策略是否允许本地连接。

> 来源：[FastGPT GitHub issue](https://github.com/labring/FastGPT/issues/1072)
