---
title: 解决FastGPT私有部署时sandbox镜像拉取失败的问题
slug: /zh/troubleshoot/fastgpt-sandbox-image-pull-failure
page_type: 排错/错误码
source: https://github.com/labring/FastGPT/issues/2855
source_type: GitHub issue
---

# 解决FastGPT私有部署时sandbox镜像拉取失败的问题

## 现象
用户在FastGPT 4.8.9私有部署时，执行以下操作后出现镜像拉取失败问题：
1.  拉取config.json文件
2.  通过curl命令拉取官方docker-compose配置文件：curl -o docker-compose.yml https://raw.githubusercontent.com/labring/FastGPT/main/files/docker/docker-compose-pgvector.yml
3.  执行docker-compose up -d
执行过程中，pg和mongo镜像拉取成功，但拉取sandbox镜像时出现报错，具体报错文本为：`ERROR: Error: image fastgpt/fastgpt-sandbox:latest not found`。

## 可能原因
根据报错信息和操作流程，可能的原因包括：
1.  目标镜像仓库中未上传fastgpt/fastgpt-sandbox:latest镜像
2.  当前服务器无法正常访问阿里云镜像仓库registry.cn-hangzhou.aliyuncs.com
3.  docker-compose配置文件中的sandbox镜像地址存在错误

## 排查步骤
1.  检查当前使用的docker-compose.yml文件，确认其中sandbox镜像的地址为`registry.cn-hangzhou.aliyuncs.com/fastgpt/fastgpt-sandbox:latest`
2.  在服务器上直接执行`docker pull registry.cn-hangzhou.aliyuncs.com/fastgpt/fastgpt-sandbox:latest`，测试是否可以拉取该镜像，排查网络访问问题
3.  执行`docker info`命令，确认本地Docker服务正常运行
4.  确认当前FastGPT版本对应的sandbox镜像标签是否与配置文件中一致，本次场景使用的版本为4.8.9

## 解决与验证
解决方法可根据排查结果调整：
- 若镜像未上传，可联系项目维护者确认镜像上传状态
- 若存在网络访问问题，可配置镜像加速器或切换可访问目标仓库的网络环境
- 若配置文件地址有误，修正镜像地址为正确的`registry.cn-hangzhou.aliyuncs.com/fastgpt/fastgpt-sandbox:latest`
验证方法：重新执行`docker-compose up -d`，确认sandbox镜像拉取成功，所有服务正常启动。

> 来源：[FastGPT GitHub issue](https://github.com/labring/FastGPT/issues/2855)
