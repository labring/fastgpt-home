---
title: FastGPT自部署版本升级操作与配置说明
slug: /zh/deploy/fastgpt-self-host-upgrade
page_type: 部署场景
source: https://doc.fastgpt.cn/zh-CN/self-host/upgrading/upgrade-intruction
source_type: 官方文档
---

# FastGPT自部署版本升级操作与配置说明

## 版本命名与升级步骤概述
从4.14.11版本开始，FastGPT区分稳定版与快速迭代版。稳定版命名无后缀，如4.14.11、4.15.0，修复问题时会同步更新至维护的稳定版本，不引入新功能。快速迭代版带beta后缀，如4.16.0-beta.1，每2个月发布一次稳定版并提供聚合升级脚本。FastGPT升级通常包含两个核心步骤：修改镜像名，执行升级初始化脚本。

## 镜像配置与修改方式
FastGPT的镜像分为主镜像、Plugin镜像、代码沙箱镜像、MCP SSE server镜像与商业版镜像，提供GitHub与阿里云两个镜像源。GitHub源主镜像为`ghcr.io/labring/fastgpt:latest`，阿里云源主镜像为`registry.cn-hangzhou.aliyuncs.com/fastgpt/fastgpt`，其余镜像可参照官方文档替换前缀。
### Sealos修改镜像步骤
打开Sealos Cloud，进入桌面的应用管理，找到对应应用，点击右侧三点菜单，选择变更修改镜像，确认变更即可。如需修改配置文件，可下拉至配置文件模块进行编辑。
### Docker Compose修改镜像步骤
直接修改docker-compose.yml文件中的`image:`字段，随后执行`docker-compose pull`拉取新镜像，再执行`docker-compose up -d`启动更新后的服务。

## 升级脚本与注意事项
镜像更新完成后，仅当版本说明中标注包含升级脚本时，需要执行初始化脚本，大部分场景需发送POST请求完成操作。执行脚本前需注意：{{host}}为服务器域名或IP，Sealos中可在对应页面获取域名；ROOT_KEY可从docker-compose.yml的environment字段中获取，Sealos环境可从左侧环境变量列表查看。跨版本升级前必须先进行数据备份，建议逐一版本升级，例如从4.4.7升级至4.6时，需依次修改镜像至4.5、4.5.1、4.6并分别执行升级脚本。数据表大幅变更且无法通过默认值设置或复杂度较高时，会通过升级脚本更新字段，严格遵循步骤不会导致旧数据丢失，但数据量较大时初始化期间服务可能暂时无法使用。

> 来源：[FastGPT 官方文档](https://doc.fastgpt.cn/zh-CN/self-host/upgrading/upgrade-intruction)
