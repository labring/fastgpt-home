---
title: 解决FastGPT登录时MongoDB数据库连接权限异常问题
slug: /zh/troubleshoot/fastgpt-mongodb-connection-permission-fix
page_type: 排错/错误码
source: https://github.com/labring/FastGPT/issues/367
source_type: GitHub issue
---

# 解决FastGPT登录时MongoDB数据库连接权限异常问题

## 现象
用户部署FastGPT后，登录环节出现MongoDB数据库连接权限异常，无法正常建立数据库连接，经初步排查怀疑docker-compose.yml中的MongoDB相关配置存在错误。登录时会弹出数据库连接权限相关的错误提示，具体报错文本需按实际运行环境获取。

## 可能原因
核心问题出在FastGPT服务的数据库连接配置与MongoDB服务的初始化配置不匹配：本次部署中，MongoDB服务初始化配置的账号为root，密码为abc@123，但FastGPT服务的environment配置项中的MONGODB_URI直接使用了`username:password`作为占位符，未替换为实际的root与abc@123，导致连接时身份验证失败。此外需确认容器间网络配置是否正常，本次部署中两者已配置在同一docker网络fastgpt中，网络层面无异常。

## 排查步骤
1.  进入docker-compose.yml文件所在的部署目录，查看fastgpt服务的environment配置项中的MONGODB_URI参数内容。
2.  查看MongoDB服务的environment配置，确认MONGO_INITDB_ROOT_USERNAME和MONGO_INITDB_ROOT_PASSWORD的实际取值。
3.  对比MONGODB_URI中的`username:password`部分，确认是否未替换为MongoDB服务实际配置的用户名和密码。
4.  执行`docker network inspect fastgpt`命令，确认FastGPT服务与MongoDB服务是否在同一docker网络中。
5.  执行`docker logs fastgpt`命令查看容器日志，确认是否存在数据库连接相关的报错信息。

## 解决与验证
### 解决方法
修改fastgpt服务的environment配置中的MONGODB_URI参数，将`username:password`替换为MongoDB服务实际配置的root账号与密码，即修改为`mongodb://root:abc@123@mongo:27017/?authSource=admin`。保存修改后，执行`docker-compose up -d`命令重启相关服务。
### 验证步骤
1.  等待容器启动完成后，访问FastGPT的登录页面。
2.  使用默认的root账号与`DEFAULT_ROOT_PSW=1234`配置的密码进行登录，确认可以正常登录且无数据库连接报错。
3.  再次执行`docker logs fastgpt`命令查看容器日志，确认MongoDB连接日志正常，无权限相关报错。

> 来源：[FastGPT GitHub issue](https://github.com/labring/FastGPT/issues/367)
