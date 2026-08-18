---
title: FastGPT自部署版本升级操作与版本管理说明
slug: /zh/deploy/fastgpt-self-deploy-upgrade-2
page_type: 部署场景
source: https://doc.fastgpt.cn/zh-CN/self-host/upgrading/upgrade-intruction
source_type: 官方文档
---

# FastGPT自部署版本升级操作与版本管理说明

## 版本命名规则与升级前提
从4.14.11版本开始，FastGPT调整了版本命名规范，将维护两个稳定版本。稳定版本命名不带后缀（如4.14.11、4.15.0），修复问题时会同步到两个维护的稳定版中，确保不引入新功能；快速迭代版本则带有beta后缀（如4.16.0-beta.1），约2个月发布一次稳定版，官方会提供聚合升级脚本。升级前需先完成数据备份，跨版本升级建议逐一执行每个中间版本的升级脚本，避免直接跳过大版本。

## 升级操作具体步骤
FastGPT自部署升级分为两个核心步骤：修改镜像与执行升级初始化脚本。
1.  **修改镜像**
    - Sealos部署：打开Sealos Cloud，进入桌面的「应用管理」，选中对应应用后点击右侧三点菜单，选择「变更」-「修改镜像」，确认变更即可；如需调整配置，可在页面下方的「配置文件」模块修改。
    - Docker Compose部署：直接修改docker-compose.yml文件中的image字段，随后执行`docker-compose pull`拉取新镜像，再执行`docker-compose up -d`启动更新后的服务。官方提供的镜像包括主镜像`ghcr.io/labring/fastgpt:latest`、Plugin镜像`ghcr.io/labring/fastgpt-plugin`、代码沙箱镜像`ghcr.io/labring/fastgpt-code-sandbox`、MCP SSE server镜像`ghcr.io/labring/fastgpt-mcp_server`，以及商业版镜像`ghcr.io/c121914yu/fastgpt-pro:latest`，阿里云镜像源可替换为对应地址。
2.  **执行升级初始化脚本**
    镜像更新完成后，查看对应版本文档中标注「包含升级脚本」的说明，按照文档执行升级操作，大部分场景需发送POST请求。若部署数据量较大，初始化过程可能导致服务短暂不可用，属于正常现象。

## 常见问题与注意事项
升级脚本用于处理数据表大幅变更、无法通过默认值设置完成的字段更新，严格按照流程操作不会导致旧数据丢失。模板中的`{{host}}`代表服务器的域名或IP变量，在Sealos中可通过对应页面获取域名，在docker-compose.yml的environment模块中可获取ROOT_KEY变量值，Sealos部署则可从左侧环境变量模块获取ROOT_KEY。

> 来源：[FastGPT 官方文档](https://doc.fastgpt.cn/zh-CN/self-host/upgrading/upgrade-intruction)
