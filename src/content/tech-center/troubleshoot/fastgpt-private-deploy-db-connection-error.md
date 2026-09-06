---
title: 解决FastGPT私有部署知识库录入的数据库连接错误
slug: /zh/troubleshoot/fastgpt-private-deploy-db-connection-error
page_type: 故障排查
source: https://github.com/labring/FastGPT/issues/1279
source_type: GitHub issue
---

# 解决FastGPT私有部署知识库录入的数据库连接错误

## 现象
版本为4.7的私有部署FastGPT，在知识库录入提交时出现数据库连接错误。错误提示的IP为PostgreSQL容器的内部IP，部署环境为Docker，宿主机将5433端口映射至PostgreSQL容器的5432端口。使用数据库工具连接宿主机IP及5433端口可正常访问数据库。

## 可能原因
FastGPT的数据库连接配置未使用宿主机映射后的外部地址，仍指向PostgreSQL容器的内部IP与容器端口，导致无法通过宿主机端口正常连接数据库。

## 排查步骤
1. 查看FastGPT的数据库连接配置，提取其中填写的IP地址与端口号。
2. 登录Docker环境，确认PostgreSQL容器的端口映射规则，核对宿主机端口与容器端口的对应关系。
3. 使用数据库工具验证宿主机IP与映射端口的数据库连接是否正常。

## 解决与验证
修改FastGPT的数据库连接配置，将原配置中的IP地址替换为宿主机IP，端口号替换为映射的宿主机端口5433。保存配置后重新发起知识库录入提交请求，确认数据库连接错误消失，知识库录入流程正常完成。

> 来源： [FastGPT 官方来源](https://github.com/labring/FastGPT/issues/1279)

## 适用性与版本范围

本页适用于官方来源记录的 故障排查 场景。执行变更前，需核对 FastGPT、依赖、API 与部署版本。

## 安全护栏

凭证与私密数据使用 [REDACTED_CREDENTIAL] 占位符。执行操作前需核对文档的环境与版本。

## 回滚指引

恢复变更前的技术内容权威快照、已保存配置与数据快照，再执行最小验证场景。
