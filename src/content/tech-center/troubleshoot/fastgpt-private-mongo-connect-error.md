---
title: FastGPT私有部署登录时报MongoDB连接错误的排查方法
slug: /zh/troubleshoot/fastgpt-private-mongo-connect-error
page_type: 排错/错误码
source: https://github.com/labring/FastGPT/issues/1753
source_type: GitHub issue
---

# FastGPT私有部署登录时报MongoDB连接错误的排查方法

## 现象
使用FastGPT私有部署4.8.3版本时，使用默认账号密码root/1234登录失败。后台日志显示编译了`/api/support/user/account/loginByPassword`接口后，抛出`MongooseServerSelectionError: getaddrinfo EAI_AGAIN mongo`错误，具体报错栈指向MongoDB连接初始化环节。

## 可能原因
报错中的`EAI_AGAIN`表示域名解析临时失败，本次报错中识别的目标主机名为`mongo`，说明FastGPT服务无法解析名为`mongo`的MongoDB服务地址。可能的原因包括：MongoDB服务未正常启动、MongoDB连接字符串中的主机名配置错误、部署环境的网络配置导致无法解析主机名，或容器编排的网络配置不匹配。

## 排查步骤
1.  检查MongoDB服务的运行状态，确认服务是否处于正常启动状态。
2.  查看FastGPT的配置文件，确认MongoDB连接地址中的主机名是否为`mongo`，或是否替换为了实际可用的IP/域名。
3.  在FastGPT服务所在的环境中，执行域名解析测试，确认能否正常解析主机名`mongo`。
4.  检查容器编排文件，确认MongoDB服务的服务名是否为`mongo`，且FastGPT服务与MongoDB服务处于同一可互通的网络中。

## 解决与验证
根据排查结果修正对应问题：若MongoDB服务未启动，启动MongoDB服务；若连接字符串配置错误，修改为正确的主机名或IP地址；若网络解析异常，修复DNS配置或调整容器网络设置。修正完成后，重启FastGPT服务，再次使用默认账号root/1234尝试登录，查看后台是否仍出现MongoDB连接错误日志，登录成功则问题解决。

> 来源：[FastGPT GitHub issue](https://github.com/labring/FastGPT/issues/1753)
