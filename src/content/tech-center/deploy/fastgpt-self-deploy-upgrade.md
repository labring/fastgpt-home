---
title: FastGPT自部署版本升级操作与配置说明
slug: /zh/deploy/fastgpt-self-deploy-upgrade
page_type: 部署场景
source: https://doc.fastgpt.cn/zh-CN/self-host/upgrading/upgrade-intruction
source_type: 官方文档
---

# FastGPT自部署版本升级操作与配置说明

## 版本命名规则
从4.14.11开始，FastGPT调整了版本命名规则，将维护两个稳定版本，例如当前迭代功能处于4.16.x版本时，会同步维护4.14.x和4.15.x两个文档版本。稳定版本命名不带后缀，如4.14.11、4.15.0，若修复稳定版问题会发布新的补丁版本且不引入新功能；快速迭代版本命名带有beta后缀，如4.16.0-beta.1、4.16.0-beta.2。迭代版本约每2个月发布一次稳定版，官方会提供聚合升级脚本，用户可一次性完成多迭代版本升级，建议优先选择无beta后缀的稳定版本以保障系统稳定性。

## 升级核心步骤与镜像配置
FastGPT升级通常包含两个核心步骤：修改镜像名与执行升级初始化脚本。官方提供两种镜像源：Git版与阿里云版。Git版主镜像为`ghcr.io/labring/fastgpt:latest`，Plugin镜像为`ghcr.io/labring/fastgpt-plugin`，代码沙箱镜像为`ghcr.io/labring/fastgpt-code-sandbox`，MCP SSE服务器镜像为`ghcr.io/labring/fastgpt-mcp_server`，商业版镜像为`ghcr.io/c121914yu/fastgpt-pro:latest`。阿里云版镜像地址以`registry.cn-hangzhou.aliyuncs.com/fastgpt/`为前缀，各镜像名称与Git版对应一致。镜像由镜像名与Tag组成，例如`registry.cn-hangzhou.aliyuncs.com/fastgpt/fastgpt:v4.6.1`代表对应版本的镜像，具体版本可参考官方仓库。

## 可执行升级操作步骤
针对Docker Compose部署方式，直接修改`docker-compose.yml`文件中的`image`字段，随后执行以下命令完成镜像拉取与服务重启：
```bash
docker-compose pull
docker-compose up -d
```
针对Sealos部署方式，打开Sealos Cloud，进入桌面的应用管理页面，选择对应应用后点击右侧三点菜单，选择「变更-修改镜像」并确认变更，如需修改配置文件可在页面下方的配置文件模块进行调整。镜像更新完成后，需查看对应版本文档，若标注「包含升级脚本」，则按照说明执行升级脚本，大部分场景下需发送POST请求完成初始化。

## 常见问题说明
执行升级脚本的原因是当数据表出现大幅度变更、无法通过设置默认值完成更新或复杂度较高时，需通过升级脚本更新数据表字段。升级过程中严格按照步骤操作不会导致旧数据丢失，但数据量较大时初始化过程可能导致服务暂时不可用。`{{host}}`为变量，代表服务器的域名或IP；获取ROOT_KEY可从`docker-compose.yml`的`environment`字段中查找对应值，Sealos部署则可从左侧环境变量模块获取。跨版本升级前必须先进行数据备份，建议逐一版本升级而非直接跳级，例如从4.4.7升级到4.6时，需依次修改镜像到4.5、4.5.1、4.5.2、4.6并分别执行对应升级脚本。

> 来源：[FastGPT 官方文档](https://doc.fastgpt.cn/zh-CN/self-host/upgrading/upgrade-intruction)
