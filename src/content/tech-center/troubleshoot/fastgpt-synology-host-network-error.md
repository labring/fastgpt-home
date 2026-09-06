---
title: 解决群晖部署FastGPT修改host网络后的启动报错问题
slug: /zh/troubleshoot/fastgpt-synology-host-network-error
page_type: 排错/错误码
source: https://github.com/labring/FastGPT/issues/844
source_type: GitHub issue
---

# 解决群晖部署FastGPT修改host网络后的启动报错问题

## 现象
用户在群晖Container Manager部署FastGPT，仅修改Docker Compose的网络模式为host。FastGPT启动失败，日志报错：
```
 ⨯ Failed to start server
Error: getaddrinfo ENOTFOUND SuuuperNAS
    at GetAddrInfoReqWrap.onlookup [as oncomplete] (node:dns:108:26) {
  errno: -3008,
  code: 'ENOTFOUND',
  syscall: 'getaddrinfo',
  hostname: 'SuuuperNAS'
}
```
MongoDB容器日志持续出现类似报错：
```
t={"$date":"2024-02-09T18:46:56.086+00:00"} s=I c=- id=4939300 ctx=monitoring-keys-for-HMAC msg=Failed to refresh key cache attr={"error":"NotYetInitialized: Cannot use non-local read concern until replica set is finished initializing.","nextWakeupMillis":10000}
...（日志截断）
```

## 可能原因
1. 容器使用host网络模式后，FastGPT服务无法解析配置中的自定义主机名SuuuperNAS。
2. MongoDB副本集未完成初始化，导致周期性的缓存刷新失败。

## 排查步骤
1. 查看FastGPT容器的启动日志，确认是否存在`getaddrinfo ENOTFOUND SuuuperNAS`报错内容。
2. 检查Docker Compose配置文件，确认网络模式是否设置为host。
3. 在宿主机中验证能否正常解析主机名SuuuperNAS，确认该主机名的配置是否正确。
4. 查看MongoDB容器的日志，确认是否存在副本集初始化相关的周期性报错。

## 解决与验证
针对DNS解析问题：若FastGPT的MongoDB连接地址使用了自定义主机名SuuuperNAS，需将该地址替换为宿主机的IP地址，或在容器的DNS配置中添加该主机名的解析记录。针对MongoDB副本集问题：需完成MongoDB副本集的初始化操作。完成配置修改后，重启FastGPT和MongoDB服务。验证标准为：FastGPT启动日志无`getaddrinfo ENOTFOUND`报错，MongoDB日志不再出现副本集初始化相关的周期性报错，FastGPT服务正常启动。

> 来源：[FastGPT GitHub issue](https://github.com/labring/FastGPT/issues/844)
