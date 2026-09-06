---
title: FastGPT升级到4.8.4后数据库容器无法启动的排查方法
slug: /zh/troubleshoot/fastgpt-upgrade-db-start-troubleshooting
page_type: 排错/错误码
source: https://github.com/labring/FastGPT/issues/1768
source_type: GitHub issue
---

# FastGPT升级到4.8.4后数据库容器无法启动的排查方法

## 现象
用户从4.4.7版本升级到4.8.4版本，使用如下Docker启动命令部署FastGPT：
```
docker run -d --name fastgpt -p 3000:3000 -e DEFAULT_ROOT_PSW=1234 -e OPENAI_BASE_URL=http://192.168.33.8:5050/v1 -e CHAT_API_KEY=sk-fastgpt -e DB_MAX_LINK=30 -e TOKEN_KEY=any -e ROOT_KEY=root_key -e FILE_TOKEN_KEY=filetoken -e MONGODB_URI=mongodb://myusername:mypassword@mongo:27017/fastgpt?authSource=admin -e PG_URL=postgresql://username:password@pg:5432/postgres -e SANDBOX_URL=http://sandbox:3000 -e LOG_LEVEL=info -v /hsdata/docker-lv/fastgpt/tmp:/app/tmp --network fastgpt --restart always fastgpt:v4.8.4
```
部署过程中，MongoDB和PostgreSQL容器未正常重启。

## 可能原因
1. 宿主机未创建名为`fastgpt`的Docker网络，导致FastGPT容器无法与数据库容器互通。
2. 数据库容器未正常运行，或环境变量中配置的数据库连接参数（如用户名、密码、地址）与实际部署的数据库不匹配。
3. 本地挂载目录的权限配置需按实际环境确认，可能影响容器启动。

## 排查步骤
1. 执行`docker network ls`命令，检查是否存在名为`fastgpt`的Docker网络。若未找到，执行`docker network create fastgpt`创建该网络。
2. 执行`docker ps -a`命令，查看MongoDB和PostgreSQL容器的运行状态。若容器未启动，执行`docker start [容器名或ID]`启动对应数据库容器。
3. 执行`docker logs fastgpt`命令，查看FastGPT容器的启动日志，检索数据库连接相关的报错文本。
4. 核对Docker启动命令中的`MONGODB_URI`和`PG_URL`参数，确认其中的用户名、密码、数据库地址与实际部署的数据库配置一致。

## 解决与验证
根据排查结果修复对应问题：若Docker网络缺失则创建网络，若数据库容器未启动则启动容器，若数据库连接参数有误则修正参数。修复完成后，重新执行用户提供的Docker启动命令启动FastGPT容器，确认MongoDB和PostgreSQL容器正常运行，FastGPT容器启动无报错。

> 来源：[FastGPT GitHub issue](https://github.com/labring/FastGPT/issues/1768)
