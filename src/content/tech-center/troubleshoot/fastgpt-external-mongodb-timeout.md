---
title: FastGPT连接外部MongoDB实例超时问题排查与解决
slug: /zh/troubleshoot/fastgpt-external-mongodb-timeout
page_type: 故障排查
source: https://github.com/labring/FastGPT/issues/2990
source_type: GitHub issue
---

# FastGPT连接外部MongoDB实例超时问题排查与解决

## 现象
使用私有部署v4.8.11-fix版本的FastGPT，连接非本机的MongoDB数据库时出现超时错误。使用相同的docker-compose.yaml在本机部署时，可正常连接MongoDB，通过启动日志发现程序持续尝试连接名为"mongo"的地址，未正确加载外部MongoDB的配置地址。

## 可能原因
推测FastGPT的MongoDB连接配置存在硬编码，默认连接地址被写死为"mongo"，导致在外部部署场景下无法自动适配外部MongoDB的实际地址，进而引发连接超时。

## 排查步骤
1. 查看FastGPT的MongoDB连接相关配置项，确认配置中的URL参数具体内容。
2. 导出FastGPT的启动日志，检查是否存在重复尝试连接"mongo"地址的记录。
3. 对比本机部署与外部部署的配置差异，验证配置是否存在将MongoDB地址硬编码为"mongo"的情况。

## 解决与验证
临时解决方法为修改本地hosts文件，将外部MongoDB的实际IP地址或域名映射为"mongo"，保存后重启FastGPT即可正常连接。长期调整需按实际环境修改FastGPT的MongoDB连接配置参数，具体调整方式需按实际环境确认。验证时，启动FastGPT后确认无MongoDB连接超时报错，即可正常使用知识库、对话等依赖MongoDB的功能。

> 来源： [FastGPT 官方来源](https://github.com/labring/FastGPT/issues/2990)

## 适用性与版本范围

本页适用于官方来源记录的 故障排查 场景。执行变更前，需核对 FastGPT、依赖、API 与部署版本。

## 安全护栏

凭证与私密数据使用 [REDACTED_CREDENTIAL] 占位符。执行操作前需核对文档的环境与版本。

## 回滚指引

恢复变更前的技术内容权威快照、已保存配置与数据快照，再执行最小验证场景。
