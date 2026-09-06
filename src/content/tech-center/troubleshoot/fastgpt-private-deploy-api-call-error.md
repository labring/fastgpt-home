---
title: FastGPT私有部署容器内API渠道调用失败的排错方法
slug: /zh/troubleshoot/fastgpt-private-deploy-api-call-error
page_type: 排错/错误码
source: https://github.com/labring/FastGPT/issues/1294
source_type: GitHub issue
---

# FastGPT私有部署容器内API渠道调用失败的排错方法

## 现象
FastGPT私有部署版本4.7.1的用户反馈，本地环境中渠道测试可正常通过，迁移到服务器后渠道测试失败。服务器主机可通过curl命令正常访问外部API接口，但FastGPT容器内无法正常调用外部API渠道，页面返回渠道测试失败的报错提示。

## 可能原因
结合问题描述，核心可能原因是FastGPT容器未配置代理相关环境变量。由于服务器主机与容器的网络环境存在隔离，主机可直接访问外部API，但容器内请求无法直接连通外部接口，需通过配置AXIOS_PROXY_HOST和AXIOS_PROXY_PORT环境变量，让容器内的请求通过指定代理访问外部服务。

## 排查步骤
1.  登录FastGPT部署的服务器，进入FastGPT容器内部，执行curl命令测试外部API访问，确认容器内是否存在访问障碍。
2.  查看FastGPT的部署配置文件或启动脚本，检查是否已配置AXIOS_PROXY_HOST和AXIOS_PROXY_PORT环境变量。
3.  核对代理服务器的地址与端口参数，确保与服务器主机上可用的代理配置保持一致。
4.  若未找到对应环境变量的配置，记录当前部署的启动方式，准备修改配置添加环境变量。

## 解决与验证
解决方法：在FastGPT的部署配置中添加AXIOS_PROXY_HOST和AXIOS_PROXY_PORT环境变量，分别设置为代理服务器的主机地址和端口号。完成配置后重启FastGPT容器，使新配置生效。验证方法：再次进入FastGPT容器内执行curl命令测试外部API访问，确认可正常连通；随后在FastGPT平台内重新进行渠道测试，确认报错提示消失，调用流程正常完成。

> 来源：[FastGPT GitHub issue](https://github.com/labring/FastGPT/issues/1294)
