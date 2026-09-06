---
title: 解决WSL2+Docker环境下FastGPT源码连接容器数据库异常
slug: /zh/troubleshoot/fastgpt-wsl2-docker-db-config
page_type: 排错/错误码
source: https://github.com/labring/FastGPT/issues/910
source_type: GitHub issue
---

# 解决WSL2+Docker环境下FastGPT源码连接容器数据库异常

## 现象
用户在Windows+WSL2+Docker环境中，按照官方文档部署FastGPT相关组件。部署数据库相关容器后，localhost:3000可正常访问，但用户希望使用容器内的数据库，同时本地运行Next.js源码进行调试。此时出现无法正常连接数据库的问题，同时涉及MongoDB副本集配置和数据库连接字符串的适配问题。

## 可能原因
1. MongoDB副本集的配置host地址不匹配：容器内默认配置使用容器服务名mongo:27017，但本地源码运行时需要通过宿主机或WSL2的地址访问，无法直接使用容器服务名。
2. 数据库连接字符串未适配本地运行环境：官方默认的连接字符串使用容器服务名，本地运行时需要替换为可访问的地址。
3. PG数据库的连接参数同样需要适配本地环境，否则无法正常建立连接。

## 排查步骤
1. 登录MongoDB容器，执行`rs.conf()`查看当前副本集配置的members.host地址，确认是否为`mongo:27017`。
2. 若配置为`mongo:27017`，执行修改命令：`rs.initiate({_id: "rs0", members: [{_id: 0, host: "0.0.0.0:27017"}]})`，完成后重启MongoDB容器使配置生效。
3. 检查本地Next.js源码的环境变量配置，将MongoDB连接字符串修改为`MONGODB_URI=mongodb://myname:mypassword@0.0.0.0:27017/fastgpt?authSource=admin`。
4. 检查PG数据库的环境变量配置，将连接字符串修改为`PG_URL=postgresql://username:password@0.0.0.0:5432/postgres`。
5. 确认容器已正确暴露27017和5432端口，且本地环境可以访问这些端口。

## 解决与验证
完成上述配置修改后，重启本地的Next.js服务，访问localhost:3000。若可以正常加载FastGPT页面，且数据库相关功能（如知识库创建、对话存储）可正常使用，则说明问题已解决。若仍无法连接，需按实际环境确认端口映射、容器运行状态等配置是否正确。

> 来源：[FastGPT GitHub issue](https://github.com/labring/FastGPT/issues/910)
