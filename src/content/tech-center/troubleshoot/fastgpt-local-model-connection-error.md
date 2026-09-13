---
title: 解决FastGPT私有部署版对接本地大模型的连接失败问题
slug: /zh/troubleshoot/fastgpt-local-model-connection-error
page_type: 排错/错误码
source: https://github.com/labring/FastGPT/issues/2016
source_type: GitHub issue
---

# 解决FastGPT私有部署版对接本地大模型的连接失败问题

## 现象
用户在Windows11+WSL2+Ubuntu22.04环境下，使用Docker部署FastGPT（镜像ghcr.io/labring/fastgpt:v4.8.5）与OneAPI（镜像ghcr.io/songquanpeng/one-api:latest），本地部署Chatglm3-6b-base大模型，服务监听127.0.0.1:8000，本地post请求可正常访问并获得响应。但在OneAPI渠道中配置该大模型时，连接失败，测试多IP端口均无效。此时Windows和WSL2防火墙已关闭，FastGPT容器端口映射为9091:3000，环境变量配置OPENAI_BASE_URL为http://172.20.0.1:3000/v1，容器网络IP为172.21.0.7:3000，OneAPI容器端口映射为3001:3000，网络IP为172.21.0.1。

## 可能原因
核心问题源于Docker容器的网络隔离特性。容器内部的127.0.0.1指向容器自身的loopback地址，无法直接访问宿主机或其他容器的本地服务。此外，WSL2的网络转发配置、Docker桥接网络的跨容器访问限制，也可能导致FastGPT、OneAPI与本地大模型之间无法建立正常连接。

## 排查步骤
1. 验证本地大模型服务可用性：在WSL2终端中执行post请求，访问127.0.0.1:8000，确认服务可正常返回响应。
2. 查看容器网络配置：通过docker inspect命令查看FastGPT与OneAPI容器的网络IP段，确认两者是否处于同一桥接网络。
3. 测试容器间网络连通性：进入FastGPT容器内部，执行curl命令访问OneAPI的容器地址与端口，再尝试访问WSL2宿主机的实际IP+8000端口，验证网络通路。
4. 检查防火墙状态：确认WSL2、Windows宿主机关闭防火墙，或放开8000、3000、9091等相关端口。
5. 核对OneAPI渠道配置：检查OneAPI中大模型渠道的Base URL配置，确认未使用容器内部的127.0.0.1地址。

## 解决与验证
1. 修改OneAPI渠道的Base URL：将原配置的127.0.0.1:8000替换为WSL2宿主机的实际IP地址（可通过WSL2终端执行ip a命令获取），或使用Docker支持的host.docker.internal地址（需确认Docker版本支持）。
2. 调整FastGPT环境变量：确认OPENAI_BASE_URL配置指向OneAPI的服务地址，格式为http://[OneAPI容器IP或宿主机IP]:3000/v1。
3. 测试连接：在FastGPT平台的渠道管理页面，重新测试大模型连接，确认返回正常。若仍存在问题，可尝试将FastGPT容器加入宿主机网络（添加--net=host启动参数），消除网络隔离限制，但需注意避免端口冲突。
4. 验证效果：发起对话测试，确认大模型可正常返回响应，完成连接配置。

> 来源：[FastGPT GitHub issue](https://github.com/labring/FastGPT/issues/2016)
