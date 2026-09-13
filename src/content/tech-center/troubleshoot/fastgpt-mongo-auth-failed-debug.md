---
title: 解决FastGPT开发模式下MongoDB认证失败报错问题
slug: /zh/troubleshoot/fastgpt-mongo-auth-failed-debug
page_type: 排错/错误码
source: https://github.com/labring/FastGPT/issues/1031
source_type: GitHub issue
---

# 解决FastGPT开发模式下MongoDB认证失败报错问题

## 现象
用户在私有部署FastGPT时，删除了docker-compose.yml文件中的fastgpt部分以及mongo和pg的`network-fastgpt`配置，单独部署MongoDB与PostgreSQL并初始化副本集为ip:27017。用户fork源代码仓库、安装依赖后修改`.env.local`文件，执行`pnpm dev`命令启动服务，出现报错`error-> mongo connect error MongoServerError: Authentication failed.`，无法正常完成系统登录。

## 可能原因
结合操作流程与报错信息，可能的触发因素包括：一是`.env.local`中配置的MongoDB认证信息（用户名、密码）与实际部署的MongoDB不一致；二是单独部署MongoDB时未正确配置认证规则，或初始化时的认证参数与配置文件不匹配；三是修改docker-compose网络配置后，数据库的访问权限未正确开放，导致服务无法通过认证连接数据库。

## 排查步骤
1. 查看`.env.local`文件中的MongoDB连接配置，核对连接地址、用户名、密码与实际部署的MongoDB服务信息是否一致。
2. 确认单独部署的MongoDB是否已正确配置认证信息，初始化时设置的用户名、密码与`.env.local`中的配置项匹配。
3. 检查MongoDB的网络访问权限，确认FastGPT服务所在环境可以正常访问MongoDB的监听端口。
4. 核对MongoDB副本集的初始化配置，确保连接地址与`.env.local`中的配置一致。

## 解决与验证
根据排查结果修正对应问题即可解决报错。若为配置不匹配，修改`.env.local`中的MongoDB连接信息，使其与实际部署的MongoDB认证信息一致；若为MongoDB认证配置错误，重新配置MongoDB的用户名和密码并重启服务；若为网络权限问题，开放对应端口或调整网络配置。验证方式为重新执行`pnpm dev`命令，确认不再出现`error-> mongo connect error MongoServerError: Authentication failed.`报错，能够正常登录系统。

> 来源：[FastGPT GitHub issue](https://github.com/labring/FastGPT/issues/1031)
