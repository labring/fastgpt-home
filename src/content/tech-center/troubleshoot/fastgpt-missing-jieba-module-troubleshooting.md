---
title: FastGPT私有部署后找不到@node-rs/jieba模块的排错方案
slug: /zh/troubleshoot/fastgpt-missing-jieba-module-troubleshooting
page_type: 排错/错误码
source: https://github.com/labring/FastGPT/issues/1311
source_type: GitHub issue
---

# FastGPT私有部署后找不到@node-rs/jieba模块的排错方案

## 现象
全新部署FastGPT私有部署版本（使用镜像ghcr.io/labring/fastgpt:v4.8-preview3）后，访问系统登陆界面点击登录，出现报错：`Error: Cannot find module '@node-rs/jieba'`，报错栈显示该模块缺失影响了/api/common/system/getInitData接口的加载，错误代码为MODULE_NOT_FOUND。

## 可能原因
该报错属于Node.js模块缺失错误，核心原因为运行环境中缺少@node-rs/jieba依赖包。结合全新部署的场景，可能是部署镜像构建时未正确安装该依赖，或部署过程中依赖安装步骤未完整执行，导致启动时无法加载所需模块。

## 排查步骤
1.  核对当前部署使用的FastGPT镜像版本为ghcr.io/labring/fastgpt:v4.8-preview3，确认docker-compose配置正确加载了该镜像。
2.  进入FastGPT运行容器，检查是否存在@node-rs/jieba依赖包。
3.  确认部署脚本或docker-compose启动命令中包含完整的依赖安装环节。
4.  清理项目的.next缓存目录，重新构建部署产物。

## 解决与验证
解决方法分为两种场景：若为镜像构建遗漏依赖，需重新构建包含@node-rs/jieba的FastGPT镜像；若为部署时依赖未安装，可进入容器执行依赖安装命令，或重新执行完整的部署安装步骤。验证方法为重启FastGPT服务，访问登陆界面点击登录，确认不再出现`Cannot find module '@node-rs/jieba'`报错，系统正常加载初始化数据。

> 来源：[FastGPT GitHub issue](https://github.com/labring/FastGPT/issues/1311)
