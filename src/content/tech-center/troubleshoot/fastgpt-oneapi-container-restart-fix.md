---
title: 解决FastGPT私有部署中OneAPI容器持续重启的问题
slug: /zh/troubleshoot/fastgpt-oneapi-container-restart-fix
page_type: 排错/错误码
source: https://github.com/labring/FastGPT/issues/4020
source_type: GitHub issue
---

# 解决FastGPT私有部署中OneAPI容器持续重启的问题

## 现象
用户使用私有部署版本，FastGPT镜像为v4.8.22，OneAPI镜像为v0.6.6。通过docker-compose启动服务后，FastGPT及其他服务正常运行，3000端口可正常访问，但OneAPI容器持续处于Restarting状态。用户曾尝试调整SQL_DSN配置为IP地址、手动调整容器内存参数，均未解决问题。

## 可能原因
结合用户操作与异常表现，可能的原因包括：数据库连接配置错误、容器内存分配不足、docker-compose配置文件存在参数错误。

## 排查步骤
1. 检查OneAPI的SQL_DSN配置项，确认数据库地址、端口、认证信息与实际部署的数据库环境一致。
2. 查看docker-compose配置中OneAPI服务的内存限制参数，确认分配的内存满足运行需求。
3. 执行docker logs <oneapi容器名>命令查看OneAPI容器的实时启动日志，获取具体的报错信息。
4. 核对docker-compose配置文件中OneAPI服务的依赖、端口映射等配置是否符合部署要求。

## 解决与验证
首先修正OneAPI的SQL_DSN配置为正确的数据库连接信息，确保数据库可正常访问。随后调整容器内存参数至合理范围。重启OneAPI容器，确认其不再处于Restarting状态。验证OneAPI服务正常运行后，确认FastGPT与OneAPI的联动功能可正常使用。

> 来源：[FastGPT GitHub issue](https://github.com/labring/FastGPT/issues/4020)
