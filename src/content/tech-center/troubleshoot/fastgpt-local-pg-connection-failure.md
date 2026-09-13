---
title: 解决FastGPT本地部署后PostgreSQL连接失败问题
slug: /zh/troubleshoot/fastgpt-local-pg-connection-failure
page_type: 排错/错误码
source: https://github.com/labring/FastGPT/issues/1564
source_type: GitHub issue
---

# 解决FastGPT本地部署后PostgreSQL连接失败问题

## 现象
用户使用FastGPT v4.8私有部署版本，先在Docker上成功部署，所有功能正常。之后按照本地部署文档操作改为本地部署，启动后无法连接PostgreSQL，PG相关功能无法使用。运行日志中未显示PostgreSQL相关异常报错，但页面出现连接失败的提示。

## 可能原因
结合用户的操作场景，可能的原因包括：本地部署时未同步更新PostgreSQL连接相关配置，仅修改了本地模型相关配置；本地环境的PostgreSQL服务配置与Docker部署时的容器内配置不一致；配置文件修改未正确加载生效。

## 排查步骤
1. 打开本地部署的config.json文件，检查PostgreSQL相关连接配置参数，对比Docker部署时的配置内容。
2. 确认本地PostgreSQL服务是否正常运行，检查服务的监听端口、访问权限是否与配置项匹配。
3. 重启FastGPT本地部署服务，确认配置文件的修改是否已生效。
4. 查看完整的FastGPT运行日志，排查是否存在未被捕获的PostgreSQL连接相关异常。

## 解决与验证
根据排查结果修正PostgreSQL连接配置，确保配置项与本地PostgreSQL服务的地址、端口、账号密码等参数一致。重启FastGPT服务后，访问PG相关功能，确认可以正常使用，页面不再显示连接失败提示。

> 来源：[FastGPT GitHub issue](https://github.com/labring/FastGPT/issues/1564)
