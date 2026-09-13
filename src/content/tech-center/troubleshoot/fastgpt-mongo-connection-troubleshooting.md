---
title: FastGPT MongoDB连接失败问题排查与解决方法
slug: /zh/troubleshoot/fastgpt-mongo-connection-troubleshooting
page_type: 排错/错误码
source: https://github.com/labring/FastGPT/issues/1536
source_type: GitHub issue
---

# FastGPT MongoDB连接失败问题排查与解决方法

## 现象
部署FastGPT时，出现MongoDB连接失败提示，具体表现为提示找不到用户，服务无法正常启动。

## 可能原因
未正确配置MongoDB连接参数，未添加直连MongoDB副本集所需的directConnection字段，导致无法成功建立数据库连接。

## 排查步骤
1. 检查FastGPT配置文件中数据库连接的用户名、密码、访问地址等参数是否与实际数据库配置一致，确认数据库服务处于正常运行状态。
2. 确认MongoDB连接配置是否需要添加directConnection字段，以适配副本集直连场景。
3. 执行数据库连接测试，验证当前配置是否可正常连接到MongoDB。

## 解决与验证
1. 进入MongoDB容器：`docker exec -it mongo bash`
2. 使用管理员账号连接MongoDB：`mongo -u username -p password --authenticationDatabase admin`
3. 初始化MongoDB副本集：
```
rs.initiate({
_id: "rs0",
members: [
{ _id: 0, host: "mongo:27017" }
]
})
```
4. 修改FastGPT的config.json配置文件，添加directConnection字段以完成直连配置。
5. 重启FastGPT服务，确认无连接失败相关报错，服务可正常运行。

> 来源: [FastGPT GitHub issue #1536](https://github.com/labring/FastGPT/issues/1536)
