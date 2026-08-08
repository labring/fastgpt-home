---
title: 解决FastGPT OpenSandbox镜像硬编码与配置缺失问题
slug: /zh/troubleshoot/fastgpt-opensandbox-image-hardcode
page_type: 排错/错误码
source: https://github.com/labring/FastGPT/issues/6707
source_type: GitHub issue
---

# 解决FastGPT OpenSandbox镜像硬编码与配置缺失问题

## 现象
该问题出现在FastGPT私有部署版本v4.14.10中，主要表现为两点：一是`deploy/templates/docker-compose.dev.yml`和`deploy/templates/docker-compose.prod.yml`内的OpenSandbox相关镜像（opensandbox-server、execd_image、egress.image）被硬编码，未通过`deploy/args.json`注入镜像地址与标签；二是执行`pnpm run gen:deploy`命令生成部署文件后，global compose配置中出现`AGENT_SANDBOX_OPENSANDBOX_IMAGE_REPO: undefined`和`image: undefined:v0.1`的错误配置。

## 可能原因
问题根源有两处：第一，两个docker-compose模板文件未遵循统一的镜像配置逻辑，将OpenSandbox相关镜像硬编码，未使用`deploy/args.json`中的变量注入配置；第二，`deploy/args.json`配置文件存在两处遗漏：未配置opensandbox-server、opensandbox-execd、opensandbox-egress的镜像信息，同时缺少`images.global["agent-sandbox-image"]`项，导致生成部署文件时无法获取对应镜像的有效配置，出现未定义参数。

## 排查步骤
1. 查看`deploy/templates/docker-compose.dev.yml`与`deploy/templates/docker-compose.prod.yml`文件，检查OpenSandbox相关服务的镜像配置是否为硬编码值；
2. 打开`deploy/args.json`文件，确认是否存在`opensandbox-server`、`opensandbox-execd`、`opensandbox-egress`的镜像配置项，以及`images.global["agent-sandbox-image"]`是否存在；
3. 执行`pnpm run gen:deploy`命令，查看生成的部署文件中OpenSandbox相关镜像是否存在`undefined`相关报错。

## 解决与验证
1. 补充`deploy/args.json`配置：添加`opensandbox-server`、`opensandbox-execd`、`opensandbox-egress`的`tags`和`images.cn`/`images.global`配置，参考官方配置示例：CN环境分别为`sandbox-registry.cn-zhangjiakou.cr.aliyuncs.com/opensandbox/server`等，Global环境分别为`opensandbox/server`等；同时补齐`images.global["agent-sandbox-image"]`配置项；
2. 修改模板文件：将`deploy/templates/docker-compose.dev.yml`和`deploy/templates/docker-compose.prod.yml`内硬编码的opensandbox-server、execd_image、egress.image替换为模板变量，例如`${{opensandbox-server.image}}:${{opensandbox-server.tag}}`；
3. 重新生成部署文件：执行`pnpm run gen:deploy`命令，重新生成`deploy/dev/`、`deploy/docker/`和`document/public/deploy/docker/`目录下的部署文件；
4. 验证配置：检查生成的部署文件，确认OpenSandbox相关镜像已从`deploy/args.json`读取配置，无`undefined`相关报错。

> 来源：https://github.com/labring/FastGPT/issues/6707
