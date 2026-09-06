---
title: 解决本地ChatGLM镜像启动与配置文件关联的问题
slug: /zh/troubleshoot/chatglm-docker-startup-config
page_type: 排错/错误码
source: https://github.com/labring/FastGPT/issues/604
source_type: GitHub issue
---

# 解决本地ChatGLM镜像启动与配置文件关联的问题

## 现象
本地下载ChatGLM镜像后，尝试直接映射6006端口启动服务失败，无法明确config.json配置文件与镜像内哪个目录的文件相关联，无法获取符合要求的Docker容器启动命令及详细配置说明。

## 可能原因
未掌握ChatGLM镜像的标准启动流程，不清楚配置文件config.json在镜像内的关联路径，缺乏容器启动命令的官方参考依据，无法确认端口映射的正确配置方式，导致无法正常启动镜像服务。

## 排查步骤
1. 确认本地已完成ChatGLM镜像的下载操作，检查镜像文件的完整性与可用性，确保镜像未损坏
2. 梳理镜像内配置文件的关联目录信息，明确config.json文件的挂载或引用路径
3. 核对启动命令中的端口映射参数，确认端口配置与服务要求匹配
4. 收集符合场景的Docker容器启动命令参考，验证命令参数的正确性

## 解决与验证
直接使用docker run命令启动镜像即可，该操作与FastGPT无直接关联。需按实际环境确认端口映射参数与config.json文件的关联目录。启动后可通过对应端口访问服务，验证启动是否成功。若启动失败，需重新核对配置文件路径与端口映射参数，确保所有配置符合实际运行环境要求。

> 来源: [FastGPT GitHub issue #604](https://github.com/labring/FastGPT/issues/604)
