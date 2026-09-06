---
title: FastGPT配置代理后无法正常使用的排查与解决方法
slug: /zh/troubleshoot/fastgpt-proxy-troubleshooting
page_type: 排错/错误码
source: https://github.com/labring/FastGPT/issues/139
source_type: GitHub issue
---

# FastGPT配置代理后无法正常使用的排查与解决方法

## 现象
完成服务器代理配置后，FastGPT仍无法正常使用。

## 可能原因
未在docker-compose.yml中正确配置代理相关环境变量。默认桥接网络模式下，FastGPT容器无法直接访问本机代理服务。若修改为host网络模式以解决访问问题，需同步调整数据库连接参数，操作复杂度较高。

## 排查步骤
1.  查看docker-compose.yml文件中fastgpt服务的environment配置段，确认是否存在AXIOS_PROXY_HOST与AXIOS_PROXY_PORT参数。
2.  验证本地代理服务运行状态，确认监听地址与配置的AXIOS_PROXY_HOST、AXIOS_PROXY_PORT匹配。
3.  检查docker-compose.yml中fastgpt服务的网络模式，默认桥接模式下容器无法直接访问本机代理。
4.  核对数据库连接参数，若计划使用host网络模式，需将原使用容器名的数据库连接地址替换为实际主机地址与端口。

## 解决与验证
在docker-compose.yml的fastgpt服务environment段中，添加以下代理配置参数：
- AXIOS_PROXY_HOST=127.0.0.1
- AXIOS_PROXY_PORT=7890
若默认桥接网络无法访问本机代理，可将fastgpt服务的网络模式修改为host模式，但需同步调整数据库连接参数，将原使用容器名的连接地址替换为实际主机地址。也可选择配置中转BASE_URL的方式，无需额外代理配置。
完成配置后，重启FastGPT容器，发起相关请求验证代理生效且服务正常运行。

> 来源: [FastGPT GitHub issue #139](https://github.com/labring/FastGPT/issues/139)
