---
title: 解决FastGPT私有部署中镜像版本与配置不一致的问题
slug: /zh/troubleshoot/fastgpt-docker-image-version-mismatch
page_type: 排错/错误码
source: https://github.com/labring/FastGPT/issues/6592
source_type: GitHub issue
---

# 解决FastGPT私有部署中镜像版本与配置不一致的问题

## 现象
用户在docker-compose.yaml配置文件中，将fastgpt镜像的标签指定为4.14.8.3，但FastGPT后台管理界面显示的版本号为4.14.8.1，与配置的镜像标签不一致。

## 可能原因
目前已知可能的原因包括：镜像未正确拉取指定版本、本地缓存了旧版本镜像、配置文件中的镜像标签参数未正确生效，具体需按实际环境确认。

## 排查步骤
1.  登录部署FastGPT的服务器，执行`docker images | grep fastgpt`命令，查看本地已拉取的fastgpt镜像的标签版本，确认是否存在4.14.8.3版本的镜像。
2.  检查docker-compose.yaml文件中fastgpt服务的image配置项，确认是否正确填写为`fastgpt:4.14.8.3`（镜像名称需按实际环境确认）。
3.  执行`docker-compose down`停止当前FastGPT容器，再执行`docker-compose pull`拉取最新的指定版本镜像，避免本地缓存旧镜像的影响。
4.  重新启动FastGPT服务：`docker-compose up -d`，等待服务启动完成后，登录后台查看版本号是否匹配。

## 解决与验证
当完成上述排查步骤后，若本地已正确拉取4.14.8.3版本的镜像且配置文件无误，重新启动服务后后台显示的版本号应与docker-compose.yaml中指定的镜像标签一致。若仍存在问题，需按实际环境进一步确认配置与镜像状态。

> 来源：[FastGPT GitHub Issue #6592](https://github.com/labring/FastGPT/issues/6592)
