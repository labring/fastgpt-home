---
title: 排查并解决FastGPT分离部署MongoDB连接失败的问题
slug: /zh/troubleshoot/fastgpt-separate-mongo-connect-fix
page_type: 排错/错误码
source: https://github.com/labring/FastGPT/issues/1765
source_type: GitHub issue
---

# 排查并解决FastGPT分离部署MongoDB连接失败的问题

## 现象
用户使用FastGPT 4.8.3私有部署版本，将FastGPT与MongoDB分离部署后，修改docker-compose.yml中的MONGODB_URI环境变量为外部MongoDB地址`mongodb://myusername:mypassword@192.168.31.57:27017/fastgpt?authSource=admin`，移除`?authSource=admin`参数后仍无法连接。启动FastGPT容器后，日志显示`mongo start connect`，随后抛出错误`mongo connect error u [MongooseServerSelectionError]: getaddrinfo ENOTFOUND mongo`。

## 可能原因
1.  FastGPT容器无法解析外部MongoDB的主机地址192.168.31.57
2.  配置的MONGODB_URI连接字符串格式存在错误
3.  挂载的config.json文件中的MongoDB配置覆盖了环境变量的设置
4.  容器网络无法访问外部MongoDB的27017端口
5.  MongoDB的用户权限或访问配置未正确开放

## 排查步骤
1.  检查docker-compose.yml中配置的MONGODB_URI环境变量，确认字符串格式正确，包含正确的用户名、密码、主机地址、端口和数据库名，可尝试移除`?authSource=admin`参数再次测试。
2.  进入FastGPT容器内部，执行ping命令测试是否能连通外部MongoDB的主机地址192.168.31.57，确认网络可达性。
3.  查看挂载的config.json文件内容，确认其中的MongoDB配置是否与环境变量一致，避免配置文件覆盖环境变量设置。
4.  检查MongoDB的用户权限，确认指定用户拥有fastgpt数据库的访问权限，且MongoDB绑定的地址允许外部访问。
5.  检查FastGPT容器的网络配置，确认容器可以访问外部网络。

## 解决与验证
### 解决方法
根据排查结果针对性处理：
- 若MONGODB_URI格式错误，修正为正确的连接字符串格式。
- 若容器无法解析主机地址，检查本地DNS配置或直接使用IP地址确认连接。
- 若config.json覆盖了环境变量配置，修改config.json中的MongoDB连接配置使其与环境变量一致。
- 若网络无法访问，调整容器网络策略或主机防火墙规则开放27017端口。
- 若MongoDB权限不足，调整MongoDB用户权限或绑定地址以允许外部访问。
### 验证方法
重启FastGPT容器，查看启动日志，确认不再出现`mongo connect error u [MongooseServerSelectionError]: getaddrinfo ENOTFOUND mongo`的报错，且系统可以正常启动并完成数据库连接。

> 来源：[FastGPT GitHub issue](https://github.com/labring/FastGPT/issues/1765)
