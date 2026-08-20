---
title: FastGPT V4.10.0版本环境变量与服务升级操作说明
slug: /zh/deploy/fastgpt-v4-10-0-upgrade-config
page_type: 部署场景
source: https://doc.fastgpt.cn/zh-CN/self-host/upgrading/outdated/4100
source_type: 官方文档
---

# FastGPT V4.10.0版本环境变量与服务升级操作说明

## 版本升级概述
V4.10.0版本新增了独立系统工具服务，支持系统工具的独立开发与调试，同时需要对部署配置进行多项调整，包括新增服务、修改环境变量与镜像标签。本次升级适配Docker与Sealos两种部署场景，需根据自身部署方式执行对应配置操作，若未按要求调整可能导致服务鉴权失败或存储连接异常。

## Docker部署升级步骤
按照以下步骤完成Docker环境的升级：
1.  参考最新的`docker-compose.yml`文件，新增`fastgpt-plugin`和`minio`服务。
2.  修改`fastgpt-plugin`的环境变量`AUTH_TOKEN`为复杂度较高的随机值，避免鉴权漏洞。
3.  修改`fastgpt-plugin`的环境变量`MINIO_CUSTOM_ENDPOINT`为`http://ip:port`或对应域名，需确保`fastgpt`用户可正常访问该地址。
4.  更新`fastgpt`与`fastgpt-pro`（商业版）容器的环境变量：
    ```
    PLUGIN_BASE_URL=http://fastgpt-plugin:3000
    PLUGIN_TOKEN=刚修改的AUTH_TOKEN值
    ```
5.  将`fastgpt`和`fastgpt-pro`的镜像tag更新为`v4.10.0-fix`。
6.  执行`docker-compose up -d`启动或更新所有服务。

## Sealos部署升级步骤
按照以下步骤完成Sealos环境的升级：
1.  在Sealos桌面的对象存储中新建存储桶，设置`publicRead`权限，并获取对应的访问密钥（Access Key、Secret Key）与内部地址。
2.  部署`fastgpt-plugin`服务，使用镜像`registry.cn-hangzhou.aliyuncs.com/fastgpt/fastgpt-plugin:v0.1.0`，内网暴露端口3000，无需公网访问，需配置以下环境变量：
    ```
    AUTH_TOKEN=自定义鉴权token
    LOG_LEVEL=info # 可选值：debug,info,warn,error
    MINIO_CUSTOM_ENDPOINT=External
    MINIO_ENDPOINT=Internal地址
    MINIO_PORT=80
    MINIO_USE_SSL=false
    MINIO_ACCESS_KEY=获取的Access Key
    MINIO_SECRET_KEY=获取的Secret Key
    MINIO_BUCKET=新建的存储桶名
    ```
3.  更新`fastgpt`与`fastgpt-pro`（商业版）容器的环境变量：将`PLUGIN_BASE_URL`设为`fastgpt-plugin`服务的内网地址，`PLUGIN_TOKEN`设为刚配置的`AUTH_TOKEN`值。
4.  将`fastgpt`和`fastgpt-pro`的镜像tag更新为`v4.10.0-fix`。

> 来源：[FastGPT 官方文档](https://doc.fastgpt.cn/zh-CN/self-host/upgrading/outdated/4100)
