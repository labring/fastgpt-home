---
title: FastGPT私有部署常见错误的排查方法说明
slug: /zh/deploy/fastgpt-private-deployment-troubleshooting-4
page_type: 部署场景
source: https://doc.fastgpt.cn/zh-CN/self-host/troubleshooting/methods
source_type: 官方文档
---

# FastGPT私有部署常见错误的排查方法说明

在FastGPT私有部署过程中遇到各类错误时，首先可通过检索现有Issue获取对应解决方案；若未找到匹配问题，需新提交Issue时，务必提供详细的操作步骤、完整日志与相关截图，否则将难以开展有效排查。

## 后端错误排查流程
后端服务的错误排查需先通过`docker ps -a`命令查看所有容器的运行状态，确认所有容器是否均处于`running`正常运行状态。若存在状态异常的容器，可执行`docker logs 容器名`命令查看对应容器的运行日志，定位异常原因；若所有容器均正常运行，也可直接通过`docker logs 容器名`命令查看系统的报错日志，进一步排查问题。

## 前端错误排查流程
当前端页面出现报错崩溃时，通常会弹出提示要求检查控制台日志。此时可打开浏览器的开发者工具，切换至`console`标签页查看日志内容，点击对应日志条目中的超链接，可直接定位到触发错误的具体文件。将这些完整的错误信息与场景描述提供后，可大幅提升排查效率。

> 来源：https://doc.fastgpt.cn/zh-CN/self-host/troubleshooting/methods
