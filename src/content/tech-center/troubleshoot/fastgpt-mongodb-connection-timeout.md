---
title: 解决FastGPT私有部署登录时users.findOne()超时报错的问题
slug: /zh/troubleshoot/fastgpt-mongodb-connection-timeout
page_type: 排错/错误码
source: https://github.com/labring/FastGPT/issues/906
source_type: GitHub issue
---

# 解决FastGPT私有部署登录时users.findOne()超时报错的问题

## 现象
部署FastGPT 4.6.8私有版本后，访问系统并点击登录时出现报错，报错文本为`Operation 'users.findOne() buffering timed out after 10000ms'`。用户确认未修改docker-compose.yml配置，且所有容器均正常启动，通过Navicat可成功连接MongoDB数据库，但应用仍无法完成数据库连接验证。

## 可能原因
结合现有排查信息，可能的触发原因包括：一是FastGPT应用容器无法通过容器网络访问MongoDB服务，尽管宿主机可直接连接数据库；二是应用的数据库连接配置与MongoDB容器的实际服务地址、端口不匹配；三是Docker容器间的网络策略限制了应用与数据库的通信。具体原因需结合实际部署环境进一步确认。

## 排查步骤
1.  核对docker-compose.yml中的数据库连接配置，未修改默认配置的情况下，应用应使用`mongo`作为数据库地址，端口为`27017`，确认配置未被误改。
2.  进入FastGPT应用容器的命令行，执行基础的MongoDB连接测试命令，验证容器内部是否可连通MongoDB服务。
3.  检查所有容器是否处于同一Docker自定义网络中，避免因跨网络导致的连接失败。
4.  确认MongoDB容器启动时配置的认证用户名、密码，与应用连接配置中的认证信息完全一致。

## 解决与验证
根据排查结果修正对应问题后，重启FastGPT应用容器。重新访问系统并尝试登录，确认不再出现`Operation 'users.findOne() buffering timed out after 10000ms'`报错，且可正常完成登录流程，即为问题解决。

> 来源：[FastGPT GitHub issue](https://github.com/labring/FastGPT/issues/906)
