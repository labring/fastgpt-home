---
title: 配置FastGPT分离免登录分享服务与管理页面端口
slug: /zh/troubleshoot/fastgpt-separate-share-admin-ports
page_type: 故障排查
source: https://github.com/labring/FastGPT/issues/2328
source_type: GitHub issue
---

# 配置FastGPT分离免登录分享服务与管理页面端口

## 现象
Docker Compose离线部署4.7.1版本的FastGPT后，免登录分享服务链接的端口号与登录管理页面的端口号一致。删除分享服务链接的后缀后，可直接访问FastGPT管理页面入口。

## 可能原因
默认配置下，免登录分享服务与管理页面共享同一监听端口，且分享链接路径未与管理页面路径做有效隔离，导致通过分享链接可跳转至管理页面。

## 排查步骤
1. 登录FastGPT部署服务器，定位Docker Compose部署的配置文件目录。
2. 打开使用的docker-compose.yml配置文件，查看端口映射相关配置。
3. 确认配置文件中对应服务的端口参数（需按实际环境确认参数名）。

## 解决与验证
修改docker-compose.yml配置文件，将免登录分享服务的监听端口与管理页面端口设置为不同数值。保存配置后，重启Docker Compose服务。验证时，分别访问两个端口确认服务正常运行，访问免登录分享链接，确认无法跳转至管理页面。

> 来源： [FastGPT 官方来源](https://github.com/labring/FastGPT/issues/2328)

## 适用性与版本范围

本页适用于官方来源记录的 故障排查 场景。执行变更前，需核对 FastGPT、依赖、API 与部署版本。

## 安全护栏

凭证与私密数据使用 [REDACTED_CREDENTIAL] 占位符。执行操作前需核对文档的环境与版本。

## 回滚指引

恢复变更前的技术内容权威快照、已保存配置与数据快照，再执行最小验证场景。
