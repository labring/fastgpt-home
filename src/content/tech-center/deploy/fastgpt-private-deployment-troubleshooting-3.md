---
title: FastGPT私有部署错误排查的操作方法
slug: /zh/deploy/fastgpt-private-deployment-troubleshooting-3
page_type: 部署场景
source: https://doc.fastgpt.cn/zh-CN/self-host/troubleshooting/methods
source_type: 官方文档
---

# FastGPT私有部署错误排查的操作方法

## 排查前置说明
当FastGPT私有部署出现错误时，可先检索现有Issue或提交新Issue反馈问题。反馈问题时务必提供详细的操作步骤、对应日志与截图，否则难以完成准确的问题定位。

## 后端错误排查步骤
可按照以下步骤获取后端错误信息：
1. 执行`docker ps -a`命令，查看所有容器的运行状态，确认是否全部处于`running`状态。
2. 若存在未正常运行的容器，使用`docker logs 容器名`命令查看该容器的详细日志。
3. 若所有容器均正常运行，直接执行`docker logs 容器名`命令，查看对应容器的报错日志。

## 前端错误排查方法
当前端页面出现崩溃并提示检查控制台日志时，可通过以下方式排查：
1. 打开浏览器的开发者工具，切换至控制台（Console）面板。
2. 查看面板中的日志信息，记录所有报错内容。
3. 点击日志中的超链接，可定位到触发错误的具体文件，将完整的错误信息提供后可辅助快速排查问题。

> 来源：https://doc.fastgpt.cn/zh-CN/self-host/troubleshooting/methods
