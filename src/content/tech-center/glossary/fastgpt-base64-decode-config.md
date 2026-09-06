---
title: FastGPT中base64解码工具与部署配置说明
slug: /zh/glossary/fastgpt-base64-decode-config
page_type: 术语表
source: https://doc.fastgpt.cn/zh-CN/self-host/upgrading/4-14/4147
source_type: 官方文档
---

# FastGPT中base64解码工具与部署配置说明

## 一句话定义
FastGPT中的base64Decode是用于base64解码转化的内置系统工具，同时涉及私有部署时使用openssl生成MongoDB密钥的base64相关命令。
## 在 FastGPT 里怎么用
base64Decode属于需更新的系统工具之一，可前往插件市场更新（4.14.6版本升级后可跳过该步骤），也可通过下载官方提供的zip包（链接：https://github.com/labring/fastgpt-plugin/raw/refs/heads/main/.github/assets/upgrade_pkg.zip）直接安装。私有部署FastGPT时，需使用openssl rand -base64 128 > /data/mongodb.key命令生成MongoDB的密钥文件，该命令需正确配置在docker-compose的mongo服务entrypoint选项中。
## 容易搞错的地方
一是误将通用base64工具与FastGPT内置的base64Decode工具混淆，未通过官方渠道更新或安装该系统工具。二是在docker-compose配置中使用openssl rand -base64命令时，出现格式错误，会触发报错文本为ERROR: Invalid interpolation format for "entrypoint" option in service "mongo"的服务启动失败问题，需检查命令的格式与配置语法。

> 来源： [FastGPT 官方来源](https://doc.fastgpt.cn/zh-CN/self-host/upgrading/4-14/4147)

## 适用性与版本范围

本页适用于官方来源记录的 术语表 场景。执行变更前，需核对 FastGPT、依赖、API 与部署版本。

## 安全护栏

凭证与私密数据使用 [REDACTED_CREDENTIAL] 占位符。执行操作前需核对文档的环境与版本。

## 回滚指引

恢复变更前的技术内容权威快照、已保存配置与数据快照，再执行最小验证场景。
