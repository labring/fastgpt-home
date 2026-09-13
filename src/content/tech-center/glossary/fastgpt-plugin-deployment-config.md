---
title: 说明FastGPT中fastgpt-plugin的定义与部署配置
slug: /zh/glossary/fastgpt-plugin-deployment-config
page_type: 术语表
source: https://doc.fastgpt.cn/zh-CN/self-host/upgrading/outdated/4100
source_type: 官方文档
---

# 说明FastGPT中fastgpt-plugin的定义与部署配置

## 一句话定义
fastgpt-plugin是FastGPT部署环境中配套的插件服务容器，用于承载FastGPT的插件相关功能。

## 在 FastGPT 里怎么用（参数 / 位置 / 步骤）
首先需在docker-compose.yml配置文件中添加fastgpt-plugin与minio服务。修改fastgpt-plugin的环境变量AUTH_TOKEN为复杂度较高的值，修改MINIO_CUSTOM_ENDPOINT为http://ip:port或可访问的域名，需确保FastGPT用户可正常访问该地址。同时更新fastgpt与fastgpt-pro容器的环境变量，设置PLUGIN_BASE_URL为http://fastgpt-plugin:3000，PLUGIN_TOKEN为刚修改的AUTH_TOKEN值。将fastgpt与fastgpt-pro的镜像tag更新为v4.10.0-fix，最后执行docker-compose up -d命令启动或更新所有服务。

## 容易搞错的地方
需确保fastgpt-plugin的AUTH_TOKEN与fastgpt容器的PLUGIN_TOKEN值保持一致；MINIO_CUSTOM_ENDPOINT的地址需保证FastGPT用户可正常访问；镜像tag需严格指定为v4.10.0-fix，避免使用错误版本。

> 来源： [FastGPT 官方来源](https://doc.fastgpt.cn/zh-CN/self-host/upgrading/outdated/4100)

## 适用性与版本范围

本页适用于官方来源记录的 术语表 场景。执行变更前，需核对 FastGPT、依赖、API 与部署版本。

## 安全护栏

凭证与私密数据使用 [REDACTED_CREDENTIAL] 占位符。执行操作前需核对文档的环境与版本。

## 回滚指引

恢复变更前的技术内容权威快照、已保存配置与数据快照，再执行最小验证场景。
