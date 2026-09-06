---
title: FastGPT V4.9.4版本升级内容与操作指南
slug: /zh/deploy/upgrade-v4-9-4
page_type: 部署与升级
source: https://doc.fastgpt.cn/zh-CN/self-host/upgrading/outdated/494
source_type: 官方文档
---

# FastGPT V4.9.4版本升级内容与操作指南

## 这个版本改了什么
新增内容包括：集合数据训练状态展示；SMTP 发送邮件插件；BullMQ 消息队列；利用 redis 进行部分数据缓存；站点同步支持配置训练参数和增量同步；AI 对话/工具调用增加返回模型 finish_reason 字段；移动端语音输入交互调整。
优化内容包括：Admin 模板渲染调整；支持环境变量配置对话文件过期时间；MongoDB log 库可独立部署。
修复内容包括：搜索应用/知识库时无法点击目录进入下一层；重新训练时参数未成功初始化；package/service 部分请求在多 app 中不一致。

## 升级前要确认的事
需完成两项核心准备：第一，做好数据备份。第二，配置Redis相关环境：docker部署用户需参考最新docker-compose.yml文件增加Redis容器，并为fastgpt、fastgpt-pro配置REDIS_URL环境变量；Sealos部署用户需在数据库中新建redis数据库，复制内网地址的connection作为redis链接串，再为fastgpt、fastgpt-pro配置REDIS_URL环境变量。

## 升级步骤（照做）
1. 完成数据备份与Redis配置。
2. 更新镜像tag：将FastGPT镜像tag设为v4.9.4，FastGPT商业版镜像tag设为v4.9.4。Sandbox与AIProxy无需更新。
3. 商业版用户执行升级脚本：在任意终端发起HTTP请求，替换{{rootkey}}为环境变量中的rootkey，{{host}}为FastGPT域名，执行以下命令：
```bash
curl --location --request POST 'https://{{host}}/api/admin/initv494' \
--header 'rootkey: {{rootkey}}' \
--header 'Content-Type: application/json'
```
该脚本用于更新站点同步定时器。

## 升级后怎么验证
可通过以下方式验证升级效果：检查集合数据训练状态展示功能是否正常；测试SMTP发送邮件插件是否可用；确认AI对话/工具调用返回结果包含finish_reason字段；验证移动端语音输入交互是否调整完成；确认搜索应用/知识库时可点击目录进入下一层；测试重新训练时参数是否正常初始化；检查多app场景下package/service请求是否一致。同时可确认Redis缓存与站点同步配置生效。

> 来源： [FastGPT 官方来源](https://doc.fastgpt.cn/zh-CN/self-host/upgrading/outdated/494)

## 适用性与版本范围

本页适用于官方来源记录的 部署与升级 场景。执行变更前，需核对 FastGPT、依赖、API 与部署版本。

## 安全护栏

凭证与私密数据使用 [REDACTED_CREDENTIAL] 占位符。执行操作前需核对文档的环境与版本。

## 回滚指引

恢复变更前的技术内容权威快照、已保存配置与数据快照，再执行最小验证场景。
