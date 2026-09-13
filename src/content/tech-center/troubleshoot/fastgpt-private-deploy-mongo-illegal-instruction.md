---
title: 解决FastGPT私有部署时MongoDB非法指令与登录超时问题
slug: /zh/troubleshoot/fastgpt-private-deploy-mongo-illegal-instruction
page_type: 排错/错误码
source: https://github.com/labring/FastGPT/issues/1171
source_type: GitHub issue
---

# 解决FastGPT私有部署时MongoDB非法指令与登录超时问题

## 现象
用户在macOS 14.4.1的MacBook Air M2 Chip环境下，通过Orbstack在路径~/fastgpt私有部署FastGPT latest版本，执行docker compose up启动后，终端出现报错：`mongod: line 19:   581 Illegal instruction     mongo -u myusername -p mypassword --authenticationDatabase admin --eval "print('waited for connection')" > /dev/null 2>&1`。同时可正常打开3000端口页面，但登录操作会显示超时。

## 可能原因
该非法指令报错由MongoDB初始化命令执行异常触发，结合部署环境为Apple Silicon架构的MacBook Air M2 Chip，可能存在所用数据库镜像与本地硬件架构不兼容的情况。数据库启动异常会进一步引发后续页面登录超时问题。

## 排查步骤
1.  确认当前部署目录为~/fastgpt，核对docker compose启动命令是否严格遵循官方教程。
2.  查看终端输出的完整日志，确认存在`mongod: line 19:   581 Illegal instruction`报错内容。
3.  验证可访问FastGPT的3000端口页面，但登录操作触发超时。
4.  核对本地硬件架构与所用数据库镜像的适配性。
5.  尝试重启相关容器或运行环境后，重新执行docker compose up命令。

## 解决与验证
若排查发现数据库镜像与本地硬件架构不兼容，更换适配当前芯片架构的MongoDB镜像，调整docker compose配置中的镜像参数。重新执行docker compose up命令，确认终端不再出现非法指令报错。登录3000端口页面，完成登录操作后无超时现象，即问题解决。

> 来源：[FastGPT GitHub issue](https://github.com/labring/FastGPT/issues/1171)
