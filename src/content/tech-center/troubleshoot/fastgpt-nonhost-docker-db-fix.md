---
title: 解决FastGPT非Host模式Docker部署数据库连接失败问题
slug: /zh/troubleshoot/fastgpt-nonhost-docker-db-fix
page_type: 排错/错误码
source: https://github.com/labring/FastGPT/issues/191
source_type: GitHub issue
---

# 解决FastGPT非Host模式Docker部署数据库连接失败问题

## 现象
使用非Host模式（不使用本机代理）的Docker部署FastGPT，重新拉取最新docker-compose.yml后出现数据库连接失败问题。使用旧版本docker-compose.yml可正常运行部署，同时需确认FastGPT当前最新版本为4.0还是4.1。

## 可能原因
最新版本的docker-compose.yml存在配置更新，导致原有数据库连接参数不匹配部署环境；数据库配置修改后未删除持久化数据，导致配置无法生效。

## 排查步骤
1.  对比当前使用的docker-compose.yml与旧版本的配置差异，确认是否为最新发布版本。
2.  检查fastgpt服务的环境变量中MONGODB_URI、PG_URL的配置参数是否正确。
3.  若修改过数据库相关配置，删除对应数据库的持久化数据目录（如./pg/data、./mongo/data）后重启服务。
4.  核对FastGPT当前最新版本信息。

## 解决与验证
使用官方提供的正确docker-compose.yml配置，修正数据库连接参数。启动服务后，确认数据库连接正常。若使用旧版本docker-compose.yml可正常运行，可回退配置或按最新配置修正参数。首次运行后修改数据库配置需删除持久化数据，重启服务后配置方可生效。

> 来源: [FastGPT GitHub issue #191](https://github.com/labring/FastGPT/issues/191)
