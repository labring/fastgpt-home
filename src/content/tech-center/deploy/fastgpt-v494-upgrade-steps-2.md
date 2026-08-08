---
title: FastGPT V4.9.4版本升级步骤与更新内容说明
slug: /zh/deploy/fastgpt-v494-upgrade-steps-2
page_type: 部署场景
source: https://doc.fastgpt.cn/zh-CN/self-host/upgrading/outdated/494
source_type: 官方文档
---

# FastGPT V4.9.4版本升级步骤与更新内容说明

### 版本升级概述
FastGPT V4.9.4版本包含环境变量变更，需执行专属升级脚本（仅商业版用户可执行）。本次更新新增多项功能，优化了后台模板渲染与配置项，修复了多个已知问题。新增功能包括集合数据训练状态展示、SMTP发送邮件插件、BullMQ消息队列、基于Redis的部分数据缓存、站点同步支持配置训练参数与增量同步、AI对话/工具调用返回finish_reason字段、移动端语音输入交互调整；优化项包含Admin模板渲染调整、支持通过环境变量配置对话文件过期时间、MongoDB log库可独立部署；修复了搜索应用/知识库时无法点击目录进入下一层、重新训练时参数未初始化、package/service部分请求在多应用中不一致的问题。

### 升级操作步骤
1. 做好数据备份，避免升级过程中出现数据丢失。
2. 配置Redis环境变量：
   - Docker部署用户：参考最新docker-compose.yml文件新增Redis容器，为fastgpt、fastgpt-pro配置REDIS_URL环境变量。
   - Sealos部署用户：在数据库中新建Redis数据库，复制内网地址的连接串作为Redis链接串，为fastgpt、fastgpt-pro配置REDIS_URL环境变量。
3. 更新镜像tag：将FastGPT官方镜像与商业版镜像的tag更新为v4.9.4，Sandbox与AIProxy无需更新。
4. 执行升级脚本（仅商业版用户执行）：通过任意终端发起HTTP POST请求，将`{{rootkey}}`替换为环境变量中的rootkey，`{{host}}`替换为FastGPT域名，执行命令：
   ```bash
   curl --location --request POST https://{{host}}/api/admin/initv494 \
   --header rootkey: {{rootkey}} \
   --header Content-Type: application/json
   ```

### 升级注意事项
本次升级需严格按照步骤执行，未配置Redis环境变量可能导致服务异常；升级脚本仅针对商业版用户，非商业版用户无需执行该脚本；更新镜像tag时需确保使用正确的v4.9.4版本，避免使用错误的镜像版本导致兼容性问题。

> 来源：https://doc.fastgpt.cn/zh-CN/self-host/upgrading/outdated/494
