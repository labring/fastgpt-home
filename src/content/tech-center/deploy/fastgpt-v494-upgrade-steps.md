---
title: FastGPT V4.9.4版本升级步骤与配置说明
slug: /zh/deploy/fastgpt-v494-upgrade-steps
page_type: 部署场景
source: https://doc.fastgpt.cn/zh-CN/self-host/upgrading/outdated/494
source_type: 官方文档
---

# FastGPT V4.9.4版本升级步骤与配置说明

FastGPT V4.9.4版本升级涉及环境变量变更与升级脚本执行，升级前需完成业务数据备份，同时需新增Redis相关配置，适配版本新增的缓存与队列依赖。

## 升级操作步骤
1. 完成业务数据备份，避免升级过程中出现数据丢失。
2. 配置Redis依赖：Docker部署用户需参考最新docker-compose.yml文件新增Redis容器，并为fastgpt、fastgpt-pro服务配置REDIS_URL环境变量；Sealos部署用户需在数据库中新建Redis数据库，复制内网连接串作为Redis链接串，同样为两个服务配置REDIS_URL环境变量。
3. 更新镜像标签：将FastGPT官方镜像与商业版镜像的tag均更新为v4.9.4，Sandbox与AIProxy无需执行更新操作。
4. 执行升级脚本：仅商业版用户需执行该步骤，通过终端发起HTTP请求，替换{{rootkey}}为环境变量中的rootkey，{{host}}为FastGPT域名，执行命令：`curl --location --request POST https://{{host}}/api/admin/initv494 --header rootkey: {{rootkey}} --header Content-Type: application/json`。

## 版本更新详情
### 新增功能
包含集合数据训练状态展示、SMTP发送邮件插件、BullMQ消息队列，支持使用Redis缓存部分数据，站点同步可配置训练参数与增量同步，AI对话与工具调用新增finish_reason字段用于追踪输出中断原因，同时调整移动端语音输入交互。
### 优化内容
优化Admin模板渲染逻辑，支持通过环境变量配置对话文件过期时间，MongoDB log库支持独立部署。
### 修复问题
修复搜索应用与知识库时无法点击目录进入下一层的问题，解决重新训练时参数未成功初始化的问题，修复package/service部分请求在多应用中不一致的问题。

> 来源：[FastGPT 官方文档](https://doc.fastgpt.cn/zh-CN/self-host/upgrading/outdated/494)
