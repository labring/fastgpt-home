---
title: FastGPT连接本地数据库超时或连接失败的排错方案
slug: /zh/troubleshoot/fastgpt-local-database-connection-troubleshooting
page_type: 排错/错误码
source: https://github.com/labring/FastGPT/issues/3079
source_type: GitHub issue
---

# FastGPT连接本地数据库超时或连接失败的排错方案

## 现象
使用FastGPT数据源配置插件连接本地数据库时，出现以下异常：
1. 当host参数填写为localhost时，返回空数据，但实际数据库存在对应数据，执行语句为`SELECT * FROM test WHERE station_id = 10003`；
2. 当host参数填写为127.0.0.1时，返回连接拒绝错误；
3. 当host参数填写为局域网IP时，返回`"result": "connect ETIMEDOUT"`超时错误。

## 可能原因
1. 容器内部的localhost指向容器自身，无法直接访问宿主机上的数据库服务；
2. FastGPT容器所在网络与本地局域网网段存在冲突；
3. 宿主机防火墙限制了数据库服务的监听端口。

## 排查步骤
1. 验证本地数据库服务正常运行，在宿主机执行测试语句`SELECT * FROM test WHERE station_id = 10003`，确认可返回预期数据；
2. 检查FastGPT连接配置中的host参数，避免使用localhost或127.0.0.1；
3. 查看宿主机防火墙设置，确认未限制数据库服务的监听端口；
4. 确认容器网络网段与本地局域网网段无冲突。

## 解决与验证
1. 将FastGPT连接配置中的host参数替换为宿主机的局域网IP地址；
2. 若存在网络网段冲突，在docker-compose配置文件中单独指定局域网未使用的独立网段；
3. 重新启动FastGPT服务，再次执行数据库查询操作，确认不再出现连接超时、拒绝或空数据问题，且能返回预期的查询结果。

> 来源: [FastGPT GitHub issue #3079](https://github.com/labring/FastGPT/issues/3079)
