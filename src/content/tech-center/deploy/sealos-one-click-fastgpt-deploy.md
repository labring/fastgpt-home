---
title: 使用Sealos一键部署FastGPT的详细操作与配置指南
slug: /zh/deploy/sealos-one-click-fastgpt-deploy
page_type: 部署场景
source: https://doc.fastgpt.cn/zh-CN/self-host/deploy/sealos
source_type: 官方文档
---

# 使用Sealos一键部署FastGPT的详细操作与配置指南

## 部署基础说明
FastGPT 使用 Sealos 部署时，通过 OneAPI 管理模型池，可兼容多种类型模型。部署提供新加坡区和北京区两个选项：新加坡区服务器在国外，可直接访问境外模型服务，但国内用户需通过网络工具访问，价格稍高；北京区由国内服务商提供，国内用户可稳定访问，但无法访问境外服务，价格约为新加坡区的1/4。Sealos 采用按量计费，按申请的 CPU、内存、磁盘资源计费，具体标准可在 Sealos 控制面板的费用中心查看。

## 一键部署与登录操作
1.  选择对应区域点击部署按键，由于需部署数据库，部署完成后需等待2~4分钟才能正常访问，默认使用最低配置，首次访问速度较慢。部署过程中需根据提示设置 `root_password`，并填写 OneAPI 的地址和密钥。点击部署后跳转至应用管理页面，点击 fastgpt 主应用右侧的详情按键，进入部署管理页面后点击外网访问地址链接即可打开服务。
2.  登录时用户名为 `root`，密码为部署时设置的 `root_password`。
3.  必须先配置至少一组模型，否则系统无法正常使用，可点击查看模型配置教程。

## 配置与升级注意事项
在 Sealos 中可通过应用管理修改环境变量和配置文件，FastGPT 运行包含1个服务和2个数据库，暂停或删除服务时需同步操作数据库，可通过日间启动、夜间暂停节省成本。升级 FastGPT 时禁止跨版本升级，需先查看更新文档确认目标版本，进入应用管理页面点击对应应用的变更选项，修改镜像版本号后点击变更/重启拉取最新镜像更新，若目标版本有初始化脚本需执行对应操作。此外还可通过变更选项配置自定义域名，或挂载 `/app/projects/app/public/icon/logo.svg` 文件替换系统 logo（暂不支持替换浏览器 favicon，需等待后续可视化功能支持）。

> 来源：[FastGPT 官方文档](https://doc.fastgpt.cn/zh-CN/self-host/deploy/sealos)
