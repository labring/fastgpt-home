---
title: 解决FastGPT与One-API容器间网络连接不通的问题
slug: /zh/troubleshoot/fastgpt-oneapi-network-troubleshooting
page_type: 排错/错误码
source: https://github.com/labring/FastGPT/issues/722
source_type: GitHub issue
---

# 解决FastGPT与One-API容器间网络连接不通的问题

## 现象
在Docker环境中部署FastGPT与One-API后，无法正常建立服务连接。在容器内执行ping本地回环地址的操作正常，但跨容器连接仍无法正常工作。

## 可能原因
默认情况下，FastGPT与One-API容器会被分配到不同的Docker网络，导致无法通过容器名称直接互相通信。

## 排查步骤
1.  执行命令 `docker network ls`，查看当前Docker环境中的所有可用网络。
2.  分别确认FastGPT容器与One-API容器所属的网络，检查二者是否处于不同的网络中。

## 解决与验证
提供两种解决方式。
第一种方式：修改FastGPT的Docker Compose配置文件。在FastGPT服务的`networks`配置项中添加`- one-api_default`，同时在配置文件顶层添加网络配置块：
```yaml
networks:
  one-api_default:
    external: true
```
确认服务的环境变量中配置了`OPENAI_BASE_URL=http://one-api:3000/v1`。
第二种方式：直接将FastGPT容器连接到One-API所在的网络，执行命令：`docker network connect one-api_default fastgpt`。
完成配置或执行命令后，验证FastGPT可正常通过容器名称访问One-API服务，相关功能恢复正常。

> 来源: [FastGPT GitHub issue #722](https://github.com/labring/FastGPT/issues/722)
